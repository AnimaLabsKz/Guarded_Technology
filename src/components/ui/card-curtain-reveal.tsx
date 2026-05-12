"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardCurtainRevealContextValue {
  isMouseIn: boolean;
  mousePosition: { x: number; y: number };
}

const CardCurtainRevealContext = React.createContext<CardCurtainRevealContextValue | undefined>(undefined);

function useCardCurtainRevealContext() {
  const context = React.useContext(CardCurtainRevealContext);
  if (!context) throw new Error("useCardCurtainRevealContext must be used within CardCurtainReveal");
  return context;
}

const CardCurtainReveal = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    const [isMouseIn, setIsMouseIn] = React.useState(false);
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const cardRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const el = cardRef.current;
      if (!el) return;
      if (typeof window === "undefined" || !window.matchMedia) return;
      const mq = window.matchMedia("(hover: none)");
      if (!mq.matches) return;

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const rect = el.getBoundingClientRect();
            setMousePosition({ x: rect.width / 2, y: rect.height / 2 });
            setIsMouseIn(true);
          } else {
            setIsMouseIn(false);
          }
        },
        { threshold: 0.6, rootMargin: "-20% 0px -20% 0px" }
      );
      io.observe(el);
      return () => io.disconnect();
    }, []);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
      setIsMouseIn(true);
    };

    return (
      <CardCurtainRevealContext.Provider value={{ isMouseIn, mousePosition }}>
        <div
          ref={(node) => {
            (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsMouseIn(false)}
          className={cn("group relative overflow-hidden rounded-2xl bg-card", className)}
          {...props}
        >
          {children}
        </div>
      </CardCurtainRevealContext.Provider>
    );
  }
);
CardCurtainReveal.displayName = "CardCurtainReveal";

const CardCurtainRevealBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("relative z-10 p-8", className)} {...props} />
  )
);
CardCurtainRevealBody.displayName = "CardCurtainRevealBody";

const CardCurtainRevealTitle = React.forwardRef<HTMLHeadingElement, HTMLMotionProps<"h3">>(
  ({ className, ...props }, ref) => {
    const { isMouseIn } = useCardCurtainRevealContext();
    return (
      <motion.h3
        ref={ref}
        animate={{ y: isMouseIn ? -4 : 0 }}
        transition={{ duration: 0.3 }}
        className={cn("text-lg font-semibold text-foreground", className)}
        {...props}
      />
    );
  }
);
CardCurtainRevealTitle.displayName = "CardCurtainRevealTitle";

const CardCurtain = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { isMouseIn, mousePosition } = useCardCurtainRevealContext();
    return (
      <span
        ref={ref}
        className={cn(
          "absolute w-[200%] aspect-square rounded-full pointer-events-none bg-white dark:bg-zinc-800 z-20 transition-transform duration-700 ease-in-out -translate-x-1/2 -translate-y-1/2",
          isMouseIn ? "scale-100" : "scale-0",
          className
        )}
        style={{ left: mousePosition.x, top: mousePosition.y }}
        {...props}
      />
    );
  }
);
CardCurtain.displayName = "CardCurtain";

const CardCurtainRevealDescription = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => {
    const { isMouseIn } = useCardCurtainRevealContext();
    return (
      <motion.div
        ref={ref}
        animate={{ opacity: isMouseIn ? 1 : 0 }}
        transition={{ duration: 0.3, delay: isMouseIn ? 0.2 : 0 }}
        className={cn("absolute inset-0 z-30 p-8 text-zinc-800 dark:text-zinc-100", className)}
        {...props}
      />
    );
  }
);
CardCurtainRevealDescription.displayName = "CardCurtainRevealDescription";

export {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealTitle,
  CardCurtain,
  CardCurtainRevealDescription,
};
