import { useTheme } from "next-themes";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowRight, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export type ProductItem = {
  model: string;
  image: string;
};

export type ProductCategory = {
  tag: string;
  title: string;
  desc: string;
  products: ProductItem[];
  pdf?: string; // URL to downloadable datasheet
};

type Props = {
  categories: ProductCategory[];
  header?: string;
  showScrollHint?: boolean;
};

/* ─── Per-category horizontal carousel ─── */
function ProductCarousel({
  products,
  active,
}: {
  products: ProductItem[];
  active: boolean;
}) {
  const { resolvedTheme } = useTheme();
  const [current, setCurrent] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const modelRef = useRef<HTMLSpanElement>(null);

  /* Reset to first product when category becomes active */
  useEffect(() => {
    if (!active) return;
    setCurrent(0);
    const img = imgRef.current;
    const model = modelRef.current;
    gsap.killTweensOf([img, model]);
    if (img) {
      img.src = products[0].image;
      gsap.set(img, { opacity: 1, x: 0 });
    }
    if (model) {
      model.textContent = products[0].model;
      gsap.set(model, { opacity: 1, y: 0 });
    }
  }, [active, products]);

  const goTo = useCallback(
    (next: number) => {
      if (next === current) return;
      const img = imgRef.current;
      const model = modelRef.current;
      if (!img) return;

      gsap.killTweensOf([img, model]);
      img.src = products[next].image;
      if (model) model.textContent = products[next].model;
      gsap.set(img, { opacity: 1, x: 0 });
      if (model) gsap.set(model, { opacity: 1, y: 0 });
      setCurrent(next);
    },
    [current, products]
  );

  const prev = () => goTo((current - 1 + products.length) % products.length);
  const next = () => goTo((current + 1) % products.length);

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full gap-3"
      style={{ maxHeight: "calc(100vh - 180px)" }}
    >
      {/* Image area */}
      <div className="relative flex items-center justify-center w-full">
        <img
          ref={imgRef}
          src={products[0].image}
          alt={products[0].model}
          className="object-contain select-none
            w-[min(78vw,280px)] h-[min(78vw,280px)] md:w-[400px] md:h-[400px] lg:w-[480px] lg:h-[480px]"
          style={{
            filter: resolvedTheme === "dark"
              ? "drop-shadow(0 0 48px hsl(43 72% 52.5% / 0.22))"
              : "drop-shadow(0 0 48px hsl(0 100% 34.5% / 0.28))",
          }}
          draggable={false}
        />
      </div>

      {/* Model name badge */}
      <div className="px-4 py-1.5 rounded-full bg-foreground/6 border border-foreground/10">
        <span
          ref={modelRef}
          className="text-[11px] font-semibold tracking-[0.22em] text-muted-foreground uppercase"
        >
          {products[0].model}
        </span>
      </div>

      {/* Controls — arrows + dots in one row, under the carousel */}
      {products.length > 1 && (
        <div className="flex items-center gap-4 mt-1">
          <button
            onClick={prev}
            aria-label="Previous product"
            className="w-9 h-9 rounded-full
              bg-foreground/6 border border-foreground/10
              flex items-center justify-center
              text-foreground/50 hover:text-primary hover:border-primary/40 hover:bg-foreground/10
              transition-all duration-200 shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to product ${i + 1}`}
                className="h-px rounded-full cursor-pointer border-0 p-0 transition-all duration-300"
                style={{
                  width: i === current ? "1.5rem" : "0.5rem",
                  backgroundColor:
                    i === current
                      ? (resolvedTheme === "dark" ? "hsl(43, 72%, 52.5%)" : "hsl(0, 100%, 34.5%)")
                      : resolvedTheme === "dark" ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.15)",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next product"
            className="w-9 h-9 rounded-full
              bg-foreground/6 border border-foreground/10
              flex items-center justify-center
              text-foreground/50 hover:text-primary hover:border-primary/40 hover:bg-foreground/10
              transition-all duration-200 shrink-0"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── Main component ─── */
export function ProductScrollHero({ categories, header, showScrollHint = true }: Props) {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const catDotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentStageRef = useRef(0);
  const [activeCategory, setActiveCategory] = useState(0);

  const changeStage = useCallback((from: number, to: number) => {
    if (from === to) return;
    const fromEl = stageRefs.current[from];
    const toEl = stageRefs.current[to];
    const dir = to > from ? 1 : -1;

    // Kill running tweens so animation never blocks
    if (fromEl) gsap.killTweensOf(fromEl);
    if (toEl) gsap.killTweensOf(toEl);

    currentStageRef.current = to;
    setActiveCategory(to);

    // Update progress dots
    catDotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      gsap.to(dot, {
        width: i === to ? "2rem" : "1rem",
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
      });
      dot.style.backgroundColor =
        i === to
          ? (resolvedTheme === "dark" ? "hsl(43, 72%, 52.5%)" : "hsl(0, 100%, 34.5%)")
          : resolvedTheme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
    });

    // Outgoing
    if (fromEl) {
      gsap.to(fromEl, {
        opacity: 0,
        y: dir * -22,
        duration: 0.35,
        ease: "power2.in",
        overwrite: true,
        onComplete: () => {
          gsap.set(fromEl, { pointerEvents: "none" });
        },
      });
    }

    // Incoming
    if (toEl) {
      gsap.set(toEl, { pointerEvents: "none" });
      gsap.fromTo(
        toEl,
        { opacity: 0, y: dir * 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          ease: "power2.out",
          delay: 0.08,
          overwrite: true,
          onComplete: () => {
            gsap.set(toEl, { pointerEvents: "auto" });
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    // Lenis — use gsap.ticker (no separate rAF loop)
    const lenis = new Lenis({ duration: 1.0, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const lenisTickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(lenisTickerCb);
    gsap.ticker.lagSmoothing(0);

    // Initial states
    stageRefs.current.forEach((stage, i) => {
      if (!stage) return;
      gsap.set(stage, {
        opacity: i === 0 ? 1 : 0,
        y: i === 0 ? 0 : 36,
        pointerEvents: i === 0 ? "auto" : "none",
        willChange: "transform, opacity",
      });
    });

    catDotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      dot.style.width = i === 0 ? "2rem" : "1rem";
      dot.style.backgroundColor =
        i === 0
          ? (resolvedTheme === "dark" ? "hsl(43, 72%, 52.5%)" : "hsl(0, 100%, 34.5%)")
          : resolvedTheme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
    });

    container.style.height = `${categories.length * 100}vh`;

    const n = categories.length;
    let lastStage = 0;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      pin: wrapper,
      pinSpacing: true,
      onUpdate: (self) => {
        // Use round against (n-1) for evenly spaced thresholds
        const newStage = Math.min(
          n - 1,
          Math.round(self.progress * (n - 1))
        );
        if (newStage !== lastStage) {
          changeStage(lastStage, newStage);
          lastStage = newStage;
        }
      },
    });

    return () => {
      st.kill();
      gsap.ticker.remove(lenisTickerCb);
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.length]);

  return (
    <div ref={containerRef} className="relative">
      <div
        ref={wrapperRef}
        className="relative h-screen w-full bg-background overflow-hidden"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_50%_60%_at_70%_50%,hsl(var(--primary)/0.04),transparent_70%)]" />

        {header && (
          <div className="hidden md:flex absolute top-24 inset-x-0 justify-center z-20 pointer-events-none px-6">
            <span className="text-[11px] md:text-sm uppercase tracking-[0.25em] text-foreground/40 font-medium text-center">
              {header}
            </span>
          </div>
        )}

        {/* Category slides */}
        {categories.map((cat, i) => (
          <div
            key={cat.tag}
            ref={(el) => { stageRefs.current[i] = el; }}
            className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-16"
          >
            {/* Left — info */}
            <div className="flex flex-col justify-center py-10 md:py-0 order-2 md:order-1">
              <p className="text-[11px] md:text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-3 md:mb-4">
                {cat.tag}
              </p>
              <h2 className="text-2xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.12] mb-4 md:mb-5">
                {cat.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-6 md:mb-8">
                {cat.desc}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground
                    font-semibold text-sm px-5 py-2.5 rounded-full
                    hover:bg-primary/90 transition-colors"
                >
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                {cat.pdf ? (
                  <a
                    href={cat.pdf}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-foreground/15 text-foreground
                      font-semibold text-sm px-5 py-2.5 rounded-full
                      hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    Datasheet <Download className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link
                    to="/downloads"
                    className="inline-flex items-center gap-2 border border-foreground/15 text-foreground
                      font-semibold text-sm px-5 py-2.5 rounded-full
                      hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    Specifications <Download className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
              <p className="mt-6 text-[11px] text-foreground/30 tracking-[0.2em] uppercase">
                {cat.products.length} {cat.products.length === 1 ? "model" : "models"} available
              </p>
            </div>

            {/* Right — carousel */}
            <div className="relative flex items-center justify-center h-full order-1 md:order-2 min-h-[44vh] md:min-h-0">
              <ProductCarousel products={cat.products} active={activeCategory === i} />
            </div>
          </div>
        ))}

        {/* Progress dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {categories.map((_, i) => (
            <div
              key={i}
              ref={(el) => { catDotRefs.current[i] = el; }}
              className="h-0.5 rounded-full"
            />
          ))}
        </div>

        {/* Scroll hint */}
        {showScrollHint && (
          <div className="absolute bottom-8 end-8 flex flex-col items-center gap-2 opacity-35">
            <span className="text-[10px] tracking-[0.25em] text-foreground/40 uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent" />
          </div>
        )}
      </div>
    </div>
  );
}
