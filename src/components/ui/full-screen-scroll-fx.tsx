import React, {
  CSSProperties,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Section = {
  id?: string;
  background: string;
  leftLabel?: ReactNode;
  title: string | ReactNode;
  rightLabel?: ReactNode;
  renderBackground?: (active: boolean, previous: boolean) => ReactNode;
};

type Colors = Partial<{
  text: string;
  overlay: string;
  pageBg: string;
  stageBg: string;
}>;

type Durations = Partial<{
  change: number;
  snap: number;
}>;

export type FullScreenFXAPI = {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  getIndex: () => number;
  refresh: () => void;
};

export type FullScreenFXProps = {
  sections: Section[];
  className?: string;
  style?: CSSProperties;
  fontFamily?: string;
  header?: ReactNode;
  footer?: ReactNode;
  gap?: number;
  gridPaddingX?: number;
  showProgress?: boolean;
  debug?: boolean;
  durations?: Durations;
  reduceMotion?: boolean;
  smoothScroll?: boolean;
  bgTransition?: "fade" | "wipe";
  parallaxAmount?: number;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  initialIndex?: number;
  colors?: Colors;
  apiRef?: React.Ref<FullScreenFXAPI>;
  ariaLabel?: string;
  inactiveOpacity?: number;
};

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

export const FullScreenScrollFX = forwardRef<HTMLDivElement, FullScreenFXProps>(
  (
    {
      sections,
      className,
      style,
      fontFamily = '"Rubik Wide", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
      header,
      footer,
      gap = 1,
      gridPaddingX = 2,
      showProgress = true,
      debug = false,
      durations = { change: 1.0, snap: 1000 },
      reduceMotion,
      bgTransition = "fade",
      parallaxAmount = 4,
      currentIndex,
      onIndexChange,
      initialIndex = 0,
      colors = {
        text: "rgba(245,245,245,0.92)",
        overlay: "rgba(0,0,0,0.35)",
        pageBg: "#ffffff",
        stageBg: "#000000",
      },
      apiRef,
      ariaLabel = "Full screen scroll slideshow",
      inactiveOpacity = 0.35,
    },
    ref
  ) => {
    const total = sections.length;
    const [localIndex, setLocalIndex] = useState(clamp(initialIndex, 0, Math.max(0, total - 1)));
    const isControlled = typeof currentIndex === "number";
    const index = isControlled ? clamp(currentIndex!, 0, Math.max(0, total - 1)) : localIndex;

    const rootRef = useRef<HTMLDivElement>(null);
    const fixedRef = useRef<HTMLDivElement>(null);
    const fixedSectionRef = useRef<HTMLDivElement>(null);

    const bgRefs = useRef<HTMLImageElement[]>([]);
    

    const leftTrackRef = useRef<HTMLDivElement>(null);
    const rightTrackRef = useRef<HTMLDivElement>(null);
    const leftItemRefs = useRef<HTMLDivElement[]>([]);
    const rightItemRefs = useRef<HTMLDivElement[]>([]);

    const progressFillRef = useRef<HTMLDivElement>(null);
    const currentNumberRef = useRef<HTMLSpanElement>(null);

    const stRef = useRef<ScrollTrigger | null>(null);
    const lastIndexRef = useRef(index);
    const isAnimatingRef = useRef(false);
    const isSnappingRef = useRef(false);
    const sectionTopRef = useRef<number[]>([]);

    const prefersReduced = useMemo(() => {
      if (typeof window === "undefined") return false;
      return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    }, []);
    const motionOff = reduceMotion ?? prefersReduced;

    const centerTitleRef = useRef<HTMLDivElement>(null);

    const computePositions = () => {
      const el = fixedSectionRef.current;
      if (!el) return;
      const top = el.offsetTop;
      const h = el.offsetHeight;
      const arr: number[] = [];
      for (let i = 0; i < total; i++) arr.push(top + (h * i) / total);
      sectionTopRef.current = arr;
    };

    const measureRAF = (fn: () => void) => {
      if (typeof window === "undefined") return;
      requestAnimationFrame(() => requestAnimationFrame(fn));
    };

    const measureAndCenterLists = (toIndex = index, animate = true) => {
      const centerTrack = (
        container: HTMLDivElement | null,
        items: HTMLDivElement[],
        trackRef: React.RefObject<HTMLDivElement | null>
      ) => {
        if (!container || items.length === 0 || !trackRef.current) return;
        const first = items[0];
        const second = items[1];
        const contRect = container.getBoundingClientRect();
        let rowH = first.getBoundingClientRect().height;
        if (second) {
          rowH = second.getBoundingClientRect().top - first.getBoundingClientRect().top;
        }
        const targetY = contRect.height / 2 - rowH / 2 - toIndex * rowH;
        if (animate) {
          gsap.to(trackRef.current, {
            y: targetY,
            duration: (durations.change ?? 1.0) * 0.9,
            ease: "expo.out",
          });
        } else {
          gsap.set(trackRef.current, { y: targetY });
        }
      };

      measureRAF(() => {
        measureRAF(() => {
          centerTrack(leftTrackRef.current?.parentElement as HTMLDivElement, leftItemRefs.current, leftTrackRef);
          centerTrack(rightTrackRef.current?.parentElement as HTMLDivElement, rightItemRefs.current, rightTrackRef);
        });
      });
    };

    const changeSection = (to: number) => {
      if (to === lastIndexRef.current || isAnimatingRef.current) return;
      const from = lastIndexRef.current;
      const down = to > from;
      isAnimatingRef.current = true;

      if (!isControlled) setLocalIndex(to);
      onIndexChange?.(to);

      if (currentNumberRef.current) {
        currentNumberRef.current.textContent = String(to + 1).padStart(2, "0");
      }
      if (progressFillRef.current) {
        const p = (to / (total - 1 || 1)) * 100;
        progressFillRef.current.style.width = `${p}%`;
      }

      const D = durations.change ?? 1.0;

      // Center title animation handled by React key + CSS animation

      const prevBg = bgRefs.current[from];
      const newBg = bgRefs.current[to];
      if (bgTransition === "fade") {
        if (newBg) {
          gsap.set(newBg, { opacity: 0, scale: 1.04, yPercent: down ? 1 : -1 });
          gsap.to(newBg, { opacity: 1, scale: 1, yPercent: 0, duration: D, ease: "expo.out" });
        }
        if (prevBg) {
          gsap.to(prevBg, {
            opacity: 0,
            yPercent: down ? -parallaxAmount : parallaxAmount,
            duration: D,
            ease: "expo.out",
          });
        }
      } else {
        if (newBg) {
          gsap.set(newBg, {
            opacity: 1,
            clipPath: down ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)",
            scale: 1,
            yPercent: 0,
          });
          gsap.to(newBg, { clipPath: "inset(0 0 0 0)", duration: D, ease: "expo.out" });
        }
        if (prevBg) {
          gsap.to(prevBg, { opacity: 0, duration: D * 0.8, ease: "expo.out" });
        }
      }

      measureAndCenterLists(to, true);

      leftItemRefs.current.forEach((el, i) => {
        el.classList.toggle("active", i === to);
        gsap.to(el, {
          opacity: i === to ? 1 : inactiveOpacity,
          x: i === to ? 10 : 0,
          duration: D * 0.6,
          ease: "expo.out",
        });
      });
      rightItemRefs.current.forEach((el, i) => {
        el.classList.toggle("active", i === to);
        gsap.to(el, {
          opacity: i === to ? 1 : inactiveOpacity,
          x: i === to ? -10 : 0,
          duration: D * 0.6,
          ease: "expo.out",
        });
      });

      gsap.delayedCall(D, () => {
        lastIndexRef.current = to;
        isAnimatingRef.current = false;
      });
    };

    const goTo = (to: number, withScroll = true) => {
      const clamped = clamp(to, 0, total - 1);
      isSnappingRef.current = true;
      changeSection(clamped);

      const pos = sectionTopRef.current[clamped];
      const snapMs = durations.snap ?? 1000;

      if (withScroll && typeof window !== "undefined") {
        window.scrollTo({ top: pos, behavior: "smooth" });
        setTimeout(() => (isSnappingRef.current = false), snapMs);
      } else {
        setTimeout(() => (isSnappingRef.current = false), 10);
      }
    };

    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    useImperativeHandle(apiRef, () => ({
      next,
      prev,
      goTo,
      getIndex: () => index,
      refresh: () => ScrollTrigger.refresh(),
    }));

    const handleJump = (i: number) => goTo(i);

    const handleLoadedStagger = () => {
      leftItemRefs.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          { opacity: i === index ? 1 : inactiveOpacity, y: 0, duration: 0.5, delay: i * 0.06, ease: "power3.out" }
        );
      });
      rightItemRefs.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          { opacity: i === index ? 1 : inactiveOpacity, y: 0, duration: 0.5, delay: 0.2 + i * 0.06, ease: "power3.out" }
        );
      });
    };

    useLayoutEffect(() => {
      if (typeof window === "undefined") return;
      const fixed = fixedRef.current;
      const fs = fixedSectionRef.current;
      if (!fixed || !fs || total === 0) return;

      gsap.set(bgRefs.current, { opacity: 0, scale: 1.04, yPercent: 0 });
      if (bgRefs.current[0]) gsap.set(bgRefs.current[0], { opacity: 1, scale: 1 });

      computePositions();
      measureAndCenterLists(index, false);

      const st = ScrollTrigger.create({
        trigger: fs,
        start: "top top",
        end: "bottom bottom",
        pin: fixed,
        pinSpacing: true,
        onUpdate: (self) => {
          if (motionOff || isSnappingRef.current) return;
          const prog = self.progress;
          const target = Math.min(total - 1, Math.floor(prog * total));
          if (target !== lastIndexRef.current && !isAnimatingRef.current) {
            const nextIdx = lastIndexRef.current + (target > lastIndexRef.current ? 1 : -1);
            goTo(nextIdx, false);
          }
          if (progressFillRef.current) {
            const p = (lastIndexRef.current / (total - 1 || 1)) * 100;
            progressFillRef.current.style.width = `${p}%`;
          }
        },
      });

      stRef.current = st;

      if (initialIndex && initialIndex > 0 && initialIndex < total) {
        requestAnimationFrame(() => goTo(initialIndex, false));
      }

      const ro = new ResizeObserver(() => {
        computePositions();
        measureAndCenterLists(lastIndexRef.current, false);
        ScrollTrigger.refresh();
      });
      ro.observe(fs);

      return () => {
        ro.disconnect();
        st.kill();
        stRef.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [total, initialIndex, motionOff, bgTransition, parallaxAmount]);

    useEffect(() => {
      handleLoadedStagger();
      measureAndCenterLists(index, false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cssVars: CSSProperties = {
      ["--fx-font" as string]: fontFamily,
      ["--fx-text" as string]: colors.text ?? "rgba(245,245,245,0.92)",
      ["--fx-overlay" as string]: colors.overlay ?? "rgba(0,0,0,0.35)",
      ["--fx-page-bg" as string]: colors.pageBg ?? "#fff",
      ["--fx-stage-bg" as string]: colors.stageBg ?? "#000",
      ["--fx-gap" as string]: `${gap}rem`,
      ["--fx-grid-px" as string]: `${gridPaddingX}rem`,
      ["--fx-row-gap" as string]: "10px",
      ["--fx-inactive-opacity" as string]: String(inactiveOpacity),
    };

    return (
      <div
        ref={(node) => {
          (rootRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={["fx", className].filter(Boolean).join(" ")}
        style={{ ...cssVars, ...style }}
        aria-label={ariaLabel}
      >
        {debug && <p style={{ position: "fixed", top: 10, left: 10, zIndex: 999, color: "#fff" }}>Section: {index}</p>}

        <div ref={fixedSectionRef} className="fx-section">
          <div ref={fixedRef} className="fx-fixed">
            <div className="fx-stage">
              {/* Backgrounds */}
              <div className="fx-backgrounds">
                {sections.map((s, i) => (
                  <div key={s.id ?? i} className="fx-bg-layer">
                    {s.renderBackground ? (
                      s.renderBackground(index === i, lastIndexRef.current === i)
                    ) : (
                      <>
                        <img
                          ref={(el) => el && (bgRefs.current[i] = el)}
                          src={s.background}
                          alt=""
                          className="fx-bg-img"
                        />
                        <div className="fx-bg-overlay" />
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div className="fx-grid">
                {header && <div className="fx-header">{header}</div>}

                <div className="fx-content">
                  {/* Left list */}
                  <div className="fx-left">
                    <div ref={leftTrackRef} className="fx-track">
                      {sections.map((s, i) => (
                        <div
                          key={i}
                          ref={(el) => el && (leftItemRefs.current[i] = el)}
                          className={`fx-list-item${i === index ? " active" : ""}`}
                          onClick={() => handleJump(i)}
                          role="button"
                          tabIndex={0}
                          aria-pressed={i === index}
                        >
                          {s.leftLabel}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Center title */}
                  <div className="fx-center">
                    <div key={index} ref={centerTitleRef} className="fx-title-row fx-title-fade">
                      <div className="fx-title-inner">
                        {sections[index]?.title}
                      </div>
                    </div>
                  </div>

                  {/* Right list */}
                  <div className="fx-right">
                    <div ref={rightTrackRef} className="fx-track">
                      {sections.map((s, i) => (
                        <div
                          key={i}
                          ref={(el) => el && (rightItemRefs.current[i] = el)}
                          className={`fx-list-item fx-list-item-right${i === index ? " active" : ""}`}
                          onClick={() => handleJump(i)}
                          role="button"
                          tabIndex={0}
                          aria-pressed={i === index}
                        >
                          {s.rightLabel}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer + progress */}
                <div className="fx-footer-area">
                  {footer && <div className="fx-footer">{footer}</div>}
                  {showProgress && (
                    <div className="fx-progress">
                      <div className="fx-progress-nums">
                        <span ref={currentNumberRef}>{String(index + 1).padStart(2, "0")}</span>
                        <span>{String(total).padStart(2, "0")}</span>
                      </div>
                      <div className="fx-progress-bar">
                        <div ref={progressFillRef} className="fx-progress-fill" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* End spacer */}
          <div className="fx-end">
            <p>fin</p>
          </div>
        </div>

        <style>{`
          .fx {
            font-family: var(--fx-font);
            color: var(--fx-text);
            background: var(--fx-page-bg);
          }
          .fx-section {
            height: ${total * 100}vh;
            position: relative;
          }
          .fx-fixed {
            width: 100%;
            height: 100vh;
            overflow: hidden;
          }
          .fx-stage {
            position: relative;
            width: 100%;
            height: 100%;
            background: var(--fx-stage-bg);
          }
          .fx-backgrounds {
            position: absolute;
            inset: 0;
            z-index: 0;
          }
          .fx-bg-layer {
            position: absolute;
            inset: 0;
          }
          .fx-bg-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            will-change: transform, opacity;
          }
          .fx-bg-overlay {
            position: absolute;
            inset: 0;
            background: var(--fx-overlay);
          }
          .fx-grid {
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            height: 100%;
            padding: var(--fx-gap) var(--fx-grid-px);
          }
          .fx-header {
            flex-shrink: 0;
            padding-bottom: var(--fx-gap);
          }
          .fx-content {
            flex: 1;
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;
            align-items: center;
            gap: 2rem;
          }
          .fx-left, .fx-right {
            height: 50vh;
            overflow: hidden;
            position: relative;
          }
          .fx-track {
            display: flex;
            flex-direction: column;
            gap: var(--fx-row-gap);
            will-change: transform;
          }
          .fx-list-item {
            font-size: 0.75rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            cursor: pointer;
            padding: 0.5rem 0;
            opacity: var(--fx-inactive-opacity);
            transition: opacity 0.3s;
            white-space: normal;
            word-break: break-word;
          }
          .fx-list-item:hover {
            opacity: 0.8 !important;
          }
          .fx-list-item.active {
            opacity: 1;
          }
          .fx-list-item-right {
            text-align: right;
          }
          .fx-center {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            min-height: 20vh;
          }
          .fx-title-row {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .fx-title-inner {
            font-size: clamp(2rem, 5vw, 4.5rem);
            font-weight: 800;
            line-height: 1.1;
            text-transform: uppercase;
            letter-spacing: -0.02em;
          }
          .fx-title-fade {
            animation: fx-title-fade 0.45s ease;
          }
          @keyframes fx-title-fade {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .fx-footer-area {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: var(--fx-gap);
          }
          .fx-footer {
            flex: 1;
          }
          .fx-progress {
            display: flex;
            align-items: center;
            gap: 1rem;
            font-size: 0.75rem;
            letter-spacing: 0.1em;
            margin-left: auto;
          }
          .fx-progress-nums {
            display: flex;
            gap: 0.5rem;
          }
          .fx-progress-nums span:last-child {
            opacity: 0.4;
          }
          .fx-progress-bar {
            width: 80px;
            height: 2px;
            background: rgba(255,255,255,0.15);
            border-radius: 2px;
            overflow: hidden;
          }
          .fx-progress-fill {
            height: 100%;
            width: 0%;
            background: var(--fx-text);
            transition: width 0.5s ease;
          }
          .fx-end {
            height: 1px;
            overflow: hidden;
            opacity: 0;
          }
          @media (max-width: 900px) {
            .fx-content {
              grid-template-columns: 1fr;
              place-items: center;
              gap: 2rem;
            }
            /* Left list (01/02/03/04 or short labels) — hide; counter in footer replaces it */
            .fx-left { display: none; }
            /* Center title — full width, tighter vertical */
            .fx-center { height: auto; min-height: 30vh; padding: 0 1rem; }
            .fx-title-inner {
              font-size: clamp(1.9rem, 9vw, 3.25rem);
            }
            /* Right list → becomes the description block below the title */
            .fx-right {
              height: auto;
              overflow: visible;
              width: 100%;
              padding: 0 1.25rem;
            }
            .fx-right .fx-track {
              transform: none !important;
              gap: 0;
            }
            .fx-right .fx-list-item {
              display: none !important;
              text-align: center !important;
              padding: 0;
              opacity: 1 !important;
              transform: none !important;
            }
            .fx-right .fx-list-item.active {
              display: block !important;
            }
            .fx-right .fx-list-item > * {
              margin-left: auto !important;
              margin-right: auto !important;
              text-align: center !important;
              max-width: 100% !important;
            }
            /* Footer with progress counter */
            .fx-footer-area {
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              gap: 0.75rem;
              padding: 0 1rem 1rem;
            }
            .fx-footer {
              font-size: 0.7rem;
            }
            .fx-progress {
              margin-left: 0;
            }
            .fx-progress-bar {
              width: 48px;
            }
          }
        `}</style>
      </div>
    );
  }
);

FullScreenScrollFX.displayName = "FullScreenScrollFX";
