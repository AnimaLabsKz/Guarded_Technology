import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 121;
const FRAME_SPEED = 2.0;
const IMAGE_SCALE = 0.78;

export function HeroCameraScroll() {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stage0Ref = useRef<HTMLDivElement>(null);
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const currentFrameRef = useRef(0);
  const framesDarkRef = useRef<(HTMLImageElement | null)[]>(Array(FRAME_COUNT).fill(null));
  const framesLightRef = useRef<(HTMLImageElement | null)[]>(Array(FRAME_COUNT).fill(null));
  const themeRef = useRef<"dark" | "light">(resolvedTheme === "light" ? "light" : "dark");
  const drawFrameRef = useRef<(i: number) => void>(() => {});
  const currentStageRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Canvas resize ──────────────────────────────────────────────────
    function resizeCanvas() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        drawFrame(currentFrameRef.current);
      }
    }

    // ── Canvas draw ────────────────────────────────────────────────────
    function drawFrame(index: number) {
      if (!canvas) return;
      const frames = themeRef.current === "light" ? framesLightRef.current : framesDarkRef.current;
      const img = frames[index];
      if (!img) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      // Use logical (CSS) dimensions for drawing coordinates
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
            const isMobile = window.innerWidth < 768;
      const scale = Math.min(cw / iw, ch / ih) * (isMobile ? 1.05 : IMAGE_SCALE);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    drawFrameRef.current = drawFrame;

    // ── Frame loading (parallel: both dark + light sequences) ─────────
    function loadFrame(i: number) {
      const num = String(i + 1).padStart(4, "0");

      const imgD = new Image();
      imgD.src = `/frames/frame_${num}.jpg`;
      imgD.onload = () => {
        framesDarkRef.current[i] = imgD;
        if (i === 0 && themeRef.current === "dark") drawFrame(0);
      };

      const imgL = new Image();
      imgL.src = `/frames-light/frame_${num}.jpg`;
      imgL.onload = () => {
        framesLightRef.current[i] = imgL;
        if (i === 0 && themeRef.current === "light") drawFrame(0);
      };
    }
    for (let i = 0; i < FRAME_COUNT; i++) loadFrame(i);

    // ── Stage transitions ──────────────────────────────────────────────
    const stages = [stage0Ref.current, stage1Ref.current, stage2Ref.current, stage3Ref.current];
    stages.forEach((s, i) => {
      if (s) gsap.set(s, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 24 });
    });

    function updateTextStage(progress: number) {
      let target = 0;
      if (progress >= 0.8) target = 3;
      else if (progress >= 0.55) target = 2;
      else if (progress >= 0.3) target = 1;

      if (target === currentStageRef.current) return;

      const prev = currentStageRef.current;
      currentStageRef.current = target;

      // Kill all tweens first to prevent accumulation
      stages.forEach((s) => { if (s) gsap.killTweensOf(s); });

      // Instantly hide any intermediate stages (neither outgoing nor incoming)
      stages.forEach((s, i) => {
        if (i !== prev && i !== target && s) gsap.set(s, { opacity: 0, y: 24 });
      });

      // Smoothly animate outgoing stage out
      const outgoing = stages[prev];
      if (outgoing) gsap.to(outgoing, { opacity: 0, y: -18, duration: 0.35, ease: "power2.in" });

      // Smoothly animate incoming stage in (slight delay so outgoing finishes first)
      const incoming = stages[target];
      if (incoming) {
        gsap.fromTo(
          incoming,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.45, delay: 0.2, ease: "power2.out" }
        );
      }
    }

    // ── Lenis smooth scroll ────────────────────────────────────────────
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time: number) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // ── ScrollTrigger ──────────────────────────────────────────────────
    const trigger = ScrollTrigger.create({
      trigger: scrollContainerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const accelerated = Math.min(self.progress * FRAME_SPEED, 1);
        const index = Math.min(Math.floor(accelerated * FRAME_COUNT), FRAME_COUNT - 1);
        if (index !== currentFrameRef.current) {
          currentFrameRef.current = index;
          requestAnimationFrame(() => drawFrame(index));
        }
        updateTextStage(self.progress);
      },
    });

    return () => {
      trigger.kill();
      lenis.destroy();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Swap the frame sequence the moment theme flips, keeping scroll position.
  useEffect(() => {
    themeRef.current = resolvedTheme === "light" ? "light" : "dark";
    drawFrameRef.current?.(currentFrameRef.current);
  }, [resolvedTheme]);

  return (
    <div ref={scrollContainerRef} style={{ height: "350vh" }} className="relative">
      {/* Pinned viewport */}
      <div
        className="sticky top-0 h-screen overflow-hidden flex flex-col md:flex-row"
        style={{ background: resolvedTheme === "dark" ? "#000000" : "#FFFFFF" }}
      >

        {/* ── Left panel — text ──────────────────────────────────────── */}
        <div className="w-full md:w-[45%] flex items-center px-6 md:px-12 lg:px-16 py-6 md:py-0 relative z-10 order-2 md:order-1">
          <div className="relative w-full min-h-[15rem] md:min-h-[18rem]">

            {/* Stage 0 — Main headline */}
            <div ref={stage0Ref} className="absolute inset-0 flex flex-col justify-center">
              <span className="text-[0.65rem] uppercase tracking-[0.35em] text-primary font-semibold mb-5">
                Guarded Technology
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold leading-[1.1] text-foreground mb-5">
                {t("hero", "title1")}
                <br />
                {t("hero", "title2")}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xs">
                {t("hero", "subtitle")}
              </p>
            </div>

            {/* Stage 1 — Smart Security / Vision */}
            <div ref={stage1Ref} className="absolute inset-0 flex flex-col justify-center">
              <span className="text-[0.65rem] uppercase tracking-[0.35em] text-primary font-semibold mb-5">
                01 / Smart Security
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] text-foreground mb-5">
                {t("divisions", "vision_title")}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xs">
                {t("divisions", "vision_text")}
              </p>
            </div>

            {/* Stage 2 — Cyber Defense */}
            <div ref={stage2Ref} className="absolute inset-0 flex flex-col justify-center">
              <span className="text-[0.65rem] uppercase tracking-[0.35em] text-primary font-semibold mb-5">
                02 / Cyber Defense
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] text-foreground mb-5">
                {t("divisions", "cyber_title2")}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xs">
                {t("divisions", "cyber_text2")}
              </p>
            </div>

            {/* Stage 3 — CTA */}
            <div ref={stage3Ref} className="absolute inset-0 flex flex-col justify-center">
              <span className="text-[0.65rem] uppercase tracking-[0.35em] text-primary font-semibold mb-5">
                03 / Get Started
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] text-foreground mb-5">
                {t("hero", "ecosystem")}
              </h2>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-full px-7 h-11 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link to="/solutions" className="flex items-center gap-2">
                    {t("hero", "btn1")} <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-7 h-11 text-sm font-semibold border-foreground/20 text-foreground hover:bg-foreground/5"
                >
                  <Link to="/contact">{t("hero", "btn2")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right panel — canvas ───────────────────────────────────── */}
        <div className="w-full md:w-[55%] flex items-center justify-center order-1 md:order-2 p-2 md:p-8 lg:p-10 pt-16 md:pt-8">
          <div
            className="w-full h-full rounded-3xl overflow-hidden max-h-[70vh] md:max-h-[calc(100vh-5rem)]"
            style={{
              background: resolvedTheme === "dark" ? "#000000" : "#FFFFFF",
              aspectRatio: "4/3",
              maxWidth: "100%",
            }}
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ display: "block" }}
            />
          </div>
        </div>

        {/* ── Scroll indicator ──────────────────────────────────────────── */}
        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-muted-foreground/50 z-20">
          <span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
        </div>
      </div>
    </div>
  );
}
