import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DottedMap from "dotted-map";
import { RotateCcw, Plus, Minus } from "lucide-react";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

const BASE_VB = { x: 410, y: 50, w: 220, h: 210 };

export function WorldMap({
  dots = [],
  lineColor = "#D4AF37",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  // Pan & zoom state
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const translateStart = useRef({ x: 0, y: 0 });
  const lastTouchDist = useRef<number | null>(null);

  const map = useMemo(() => new DottedMap({ height: 100, grid: "diagonal" }), []);

  const svgMap = useMemo(
    () =>
      map.getSVG({
        radius: 0.22,
        color: "#333333",
        shape: "circle",
        backgroundColor: "#050505",
      }),
    [map]
  );

  // Dynamic viewBox
  const viewBox = useMemo(() => {
    const w = BASE_VB.w / scale;
    const h = BASE_VB.h / scale;
    const cx = BASE_VB.x + BASE_VB.w / 2;
    const cy = BASE_VB.y + BASE_VB.h / 2;
    const x = cx - w / 2 - translate.x;
    const y = cy - h / 2 - translate.y;
    return `${x} ${y} ${w} ${h}`;
  }, [scale, translate]);

  // Wheel zoom
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
setScale(prev => Math.min(4, Math.max(1, prev + delta)));
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // Mouse drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    translateStart.current = { ...translate };
  }, [translate]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const ratioX = (BASE_VB.w / scale) / rect.width;
    const ratioY = (BASE_VB.h / scale) / rect.height;
    const dx = (e.clientX - dragStart.current.x) * ratioX;
    const dy = (e.clientY - dragStart.current.y) * ratioY;
    setTranslate({ x: translateStart.current.x + dx, y: translateStart.current.y + dy });
  }, [scale]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      translateStart.current = { ...translate };
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      lastTouchDist.current = dist;
    }
  }, [translate]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const ratioX = (BASE_VB.w / scale) / rect.width;
      const ratioY = (BASE_VB.h / scale) / rect.height;
      const dx = (e.touches[0].clientX - dragStart.current.x) * ratioX;
      const dy = (e.touches[0].clientY - dragStart.current.y) * ratioY;
      setTranslate({ x: translateStart.current.x + dx, y: translateStart.current.y + dy });
    } else if (e.touches.length === 2 && lastTouchDist.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const delta = (dist - lastTouchDist.current) * 0.005;
setScale(prev => Math.min(4, Math.max(1, prev + delta)));
      lastTouchDist.current = dist;
    }
  }, [scale]);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
    lastTouchDist.current = null;
  }, []);

  const resetView = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 30;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const fullCycleDuration = dots.length * 0.3 + 2 + 2;

  return (
    <div
      ref={containerRef}
      className={`w-full aspect-[2/1] md:aspect-[2.5/1] bg-[#050505] rounded-xl relative font-sans overflow-hidden ${isDragging.current ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <svg
        ref={svgRef}
        viewBox={viewBox}
        className="w-full h-full pointer-events-none select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <image
          href={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          x="0"
          y="0"
          width="800"
          height="400"
        />
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feMorphology operator="dilate" radius="0.5" />
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          const startTime = (i * 0.3) / fullCycleDuration;
          const endTime = (i * 0.3 + 2) / fullCycleDuration;

          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 0, 1, 1, 0] }}
                transition={{
                  duration: fullCycleDuration,
                  times: [0, startTime, endTime, 0.8, 1],
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
              <motion.circle
                r="6"
                fill={lineColor}
                initial={{ offsetDistance: "0%", opacity: 0 }}
                animate={{
                  // framer-motion accepts null to mean "start from current value"; not reflected in its types
                  offsetDistance: [null, "0%", "100%", "100%", "100%"] as unknown as string[],
                  opacity: [0, 0, 1, 0, 0],
                }}
                transition={{
                  duration: fullCycleDuration,
                  times: [0, startTime, endTime, 0.8, 1],
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                style={{
                  offsetPath: `path('${createCurvedPath(startPoint, endPoint)}')`,
                }}
                filter="url(#glow)"
              />
            </g>
          );
        })}

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);

          return (
            <g key={`points-group-${i}`}>
              <g
                onMouseEnter={() => setHoveredLocation(dot.start.label || null)}
                onMouseLeave={() => setHoveredLocation(null)}
                className="pointer-events-auto"
              >
                <circle cx={startPoint.x} cy={startPoint.y} r="5" fill={lineColor} filter="url(#glow)" />
              </g>
              <g
                onMouseEnter={() => setHoveredLocation(dot.end.label || null)}
                onMouseLeave={() => setHoveredLocation(null)}
                className="pointer-events-auto"
              >
                <circle cx={endPoint.x} cy={endPoint.y} r="5" fill={lineColor} filter="url(#glow)" />
              </g>
            </g>
          );
        })}
      </svg>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
        <button
          onClick={() => setScale(prev => Math.min(4, prev + 0.3))}
          className="bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#D4AF37]/30 text-[#D4AF37] w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#D4AF37]/20 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => setScale(prev => Math.max(1, prev - 0.3))}
          className="bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#D4AF37]/30 text-[#D4AF37] w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#D4AF37]/20 transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={resetView}
          className="bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#D4AF37]/30 text-[#D4AF37] w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#D4AF37]/20 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <AnimatePresence>
        {hoveredLocation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 bg-[#121212] text-foreground px-4 py-2 rounded-lg text-sm font-medium border border-[#D4AF37]/50 shadow-lg"
          >
            {hoveredLocation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
