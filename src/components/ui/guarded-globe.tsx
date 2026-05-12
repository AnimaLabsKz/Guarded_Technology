import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";
import { useTheme } from "next-themes";

/* ─── Координаты ─────────────────────────────────────────────── */

const HUB_MARKERS = [
  { location: [25.2048,  55.2708] as [number, number], size: 0.07 }, // Dubai
  { location: [43.222,   76.8512] as [number, number], size: 0.07 }, // Almaty
];

const MARKET_MARKERS = [
  { location: [24.6877,  46.7219] as [number, number], size: 0.04 }, // Riyadh
  { location: [25.2854,  51.531]  as [number, number], size: 0.04 }, // Doha
  { location: [29.3759,  47.9774] as [number, number], size: 0.04 }, // Kuwait City
  { location: [24.4539,  54.3773] as [number, number], size: 0.04 }, // Abu Dhabi
  { location: [41.2995,  69.2401] as [number, number], size: 0.04 }, // Tashkent
  { location: [42.8746,  74.5698] as [number, number], size: 0.04 }, // Bishkek
  { location: [6.5244,    3.3792] as [number, number], size: 0.04 }, // Lagos
  { location: [-26.2041, 28.0473] as [number, number], size: 0.04 }, // Johannesburg
  { location: [-1.2921,  36.8219] as [number, number], size: 0.03 }, // Mombasa
  { location: [9.0579,    7.4951] as [number, number], size: 0.03 }, // Abuja
];

const ALL_MARKERS = [...HUB_MARKERS, ...MARKET_MARKERS];

/* ─── Hub labels only (markets are dots, no text) ────────────── */

const HUB_LABELS = [
  { location: [25.2048,  55.2708] as [number, number], name: "Dubai"  },
  { location: [43.222,   76.8512] as [number, number], name: "Almaty" },
];

/* ─── Brand accents ─────────────────────────────────────────── */
const GOLD:     [number, number, number] = [0.87, 0.71, 0.27];
const GOLD_DIM: [number, number, number] = [0.55, 0.44, 0.15];
const RED:      [number, number, number] = [0.69, 0.00, 0.00];
const RED_DIM:  [number, number, number] = [0.43, 0.00, 0.00];

/* ─── 3D → 2D projection (mirrors cobe's internal O() + U()) ─── */

function projectPoint(
  lat: number, lng: number,
  phi: number, theta: number,
): { x: number; y: number; visible: boolean } {
  const PI = Math.PI, d = PI / 180;
  const latR = lat * d, lngR = lng * d - PI;
  const cosLat = Math.cos(latR);
  const px = -cosLat * Math.cos(lngR);
  const py =  Math.sin(latR);
  const pz =  cosLat * Math.sin(lngR);

  const cosPhi = Math.cos(phi), sinPhi = Math.sin(phi);
  const cosT   = Math.cos(theta), sinT = Math.sin(theta);
  const c = cosPhi * px + sinPhi * pz;
  const s = sinPhi * sinT * px + cosT * py - cosPhi * sinT * pz;
  const z = -sinPhi * cosT * px + sinT * py + cosPhi * cosT * pz;

  return { x: (c + 1) / 2, y: (-s + 1) / 2, visible: z >= 0 };
}

/* ─── Component ──────────────────────────────────────────────── */

interface GuardedGlobeProps {
  className?: string;
  speed?: number;
}

export function GuardedGlobe({ className = "", speed = 0.002 }: GuardedGlobeProps) {
  const { resolvedTheme } = useTheme();
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffset  = useRef(0);
  const thetaRef   = useRef(0);
  const isPaused   = useRef(false);
  const scrollPhi  = useRef(0);
  const labelRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const ringRefs   = useRef<(HTMLDivElement | null)[]>([]);

  /* Scroll-driven rotation */
  useEffect(() => {
    const onScroll = () => { scrollPhi.current = window.scrollY * 0.00055; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Drag handlers */
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerRef.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPaused.current = true;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerRef.current) {
      phiOffset.current += dragOffset.current.phi;
      thetaRef.current  += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerRef.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPaused.current = false;
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (pointerRef.current) {
        dragOffset.current = {
          phi:   (e.clientX - pointerRef.current.x) / 280,
          theta: (e.clientY - pointerRef.current.y) / 900,
        };
      }
    };
    window.addEventListener("pointermove", onMove,          { passive: true });
    window.addEventListener("pointerup",   handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup",   handlePointerUp);
    };
  }, [handlePointerUp]);

  /* Globe init */
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let animId: number;
    let phi = 0.6;

    const isDark = resolvedTheme !== "light";

    function init() {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi:   0.6,
        theta: 0.25,
        dark: isDark ? 1 : 0,
        diffuse: 1.2,
        mapSamples:    18000,
        mapBrightness: isDark ? 4.5 : 7,
        baseColor:   isDark ? [0.08, 0.08, 0.08] : [0.95, 0.95, 0.97],
        markerColor: isDark ? GOLD : RED,
        glowColor:   isDark ? GOLD_DIM : RED_DIM,
        markerElevation: 0.02,
        markers: ALL_MARKERS,
        ...(({ opacity: 0.75 }) as object),
      } as Parameters<typeof createGlobe>[1]);

      function animate() {
        if (!isPaused.current) phi += speed;

        const cPhi   = phi + phiOffset.current + dragOffset.current.phi + scrollPhi.current;
        const cTheta = 0.25 + thetaRef.current + dragOffset.current.theta;

        globe!.update({
          phi:   cPhi,
          theta: cTheta,
          markers: ALL_MARKERS.map((m, i) => ({
            location: m.location,
            size: i < 2
              ? 0.055 + 0.025 * Math.sin(Date.now() / 600 + i * 2.1)
              : m.size,
          })),
        // cobe's TypeScript types are incomplete; cast required to pass full config
        } as Parameters<typeof createGlobe>[1]);

        /* Update hub labels */
        HUB_LABELS.forEach((lbl, i) => {
          const el = labelRefs.current[i];
          if (!el) return;
          const p = projectPoint(lbl.location[0], lbl.location[1], cPhi, cTheta);
          el.style.left    = `${p.x * 100}%`;
          el.style.top     = `${p.y * 100}%`;
          el.style.opacity = p.visible ? "1" : "0";
        });

        /* Update pulse rings */
        HUB_MARKERS.forEach((hub, i) => {
          const el = ringRefs.current[i];
          if (!el) return;
          const p = projectPoint(hub.location[0], hub.location[1], cPhi, cTheta);
          el.style.left    = `${p.x * 100}%`;
          el.style.top     = `${p.y * 100}%`;
          el.style.opacity = p.visible ? "1" : "0";
        });

        animId = requestAnimationFrame(animate);
      }

      animate();
      setTimeout(() => canvas && (canvas.style.opacity = "1"));
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) { ro.disconnect(); init(); }
      });
      ro.observe(canvas);
    }

    return () => {
      if (animId!) cancelAnimationFrame(animId);
      if (globe) globe.destroy();
    };
  }, [speed, resolvedTheme]);

  const accent      = resolvedTheme === "dark" ? "43 72% 52.5%" : "0 100% 34.5%";
  const accentLight = resolvedTheme === "dark" ? "43 72% 60%"   : "0 100% 42%";
  const accentLabel = resolvedTheme === "dark" ? "43 72% 80%"   : "0 100% 38%";

  return (
    <div className={`relative aspect-square select-none ${className}`}>

      {/* Pulse ring keyframes */}
      <style>{`
        @keyframes cobe-pulse {
          0%   { transform: translate(-50%,-50%) scale(0.6); opacity: 0.7; }
          100% { transform: translate(-50%,-50%) scale(2.8); opacity: 0;   }
        }
        .cobe-ring-a { animation: cobe-pulse 2.4s ease-out infinite; }
        .cobe-ring-b { animation: cobe-pulse 2.4s ease-out infinite 1.2s; }
      `}</style>

      {/* Brand ambient glow */}
      <div className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 60% at 50% 50%, hsl(${accent} / 0.07), transparent 70%)` }} />

      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%", height: "100%",
          cursor: "grab", opacity: 0,
          transition: "opacity 1.4s ease",
          touchAction: "none",
        }}
      />

      {/* Overlay — clipped to globe circle */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ borderRadius: "50%" }}
      >
        {/* Pulse rings — one per hub */}
        {HUB_MARKERS.map((_, i) => (
          <div
            key={`ring-${i}`}
            ref={(el) => { ringRefs.current[i] = el; }}
            className="absolute"
            style={{ top: 0, left: 0, opacity: 0 }}
          >
            <div
              className="cobe-ring-a"
              style={{
                position: "absolute",
                width: "28px", height: "28px",
                borderRadius: "50%",
                border: `1.5px solid hsl(${accentLight})`,
                transform: "translate(-50%,-50%)",
              }}
            />
            <div
              className="cobe-ring-b"
              style={{
                position: "absolute",
                width: "28px", height: "28px",
                borderRadius: "50%",
                border: `1px solid hsl(${accent})`,
                transform: "translate(-50%,-50%)",
              }}
            />
          </div>
        ))}

        {/* Hub labels — pill style with dot prefix */}
        {HUB_LABELS.map((lbl, i) => (
          <span
            key={lbl.name}
            ref={(el) => { labelRefs.current[i] = el; }}
            className="absolute flex items-center gap-1 select-none"
            style={{
              top: 0, left: 0,
              opacity: 0,
              transform: "translate(-50%, 14px)",
              transition: "opacity 0.25s",
              background: resolvedTheme === "dark" ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.80)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              border: resolvedTheme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.10)",
              borderRadius: "4px",
              padding: "2px 7px 2px 5px",
              fontSize: "8px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: `hsl(${accentLabel})`,
              textShadow: "none",
              whiteSpace: "nowrap",
            }}
          >
            {/* Gold dot */}
            <span style={{
              display: "inline-block",
              width: "5px", height: "5px",
              borderRadius: "50%",
              background: `hsl(${accentLight})`,
              flexShrink: 0,
            }} />
            {lbl.name}
          </span>
        ))}
      </div>
    </div>
  );
}
