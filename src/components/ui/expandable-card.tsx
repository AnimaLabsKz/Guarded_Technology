"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ExpandableCardProps {
  title: string;
  src: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
  classNameExpanded?: string;
}

export function ExpandableCard({
  title,
  src,
  description,
  children,
  className,
  classNameExpanded,
  ...props
}: ExpandableCardProps) {
  const [active, setActive] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const id = React.useId();

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(false);
    };
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setActive(false);
      }
    };

    if (active) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [active]);

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50"
          />
        )}
      </AnimatePresence>

      {/* Expanded Card */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              layoutId={`card-${id}`}
              ref={cardRef}
              className={cn(
                "w-full max-w-2xl max-h-[90vh] overflow-auto rounded-2xl bg-[hsl(var(--surface-card))] border border-[#1A1A1A]",
                classNameExpanded
              )}
            >
              <motion.div layoutId={`image-${id}`} className="relative">
                <img
                  src={src}
                  alt={title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
              </motion.div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <motion.p
                      layoutId={`description-${id}`}
                      className="text-muted-foreground text-sm mb-1"
                    >
                      {description}
                    </motion.p>
                    <motion.h3
                      layoutId={`title-${id}`}
                      className="text-foreground font-bold text-xl"
                    >
                      {title}
                    </motion.h3>
                  </div>
                  <button
                    onClick={() => setActive(false)}
                    className="p-2 rounded-full bg-[hsl(var(--surface-card))] hover:bg-[hsl(var(--surface-card-hover))] transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                <div className="text-muted-foreground text-sm leading-relaxed">
                  {children}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Card Trigger */}
      <motion.div
        layoutId={`card-${id}`}
        onClick={() => setActive(true)}
        className={cn(
          "group cursor-pointer rounded-2xl border border-[#1A1A1A] bg-[hsl(var(--surface-card))]/80 backdrop-blur-xl overflow-hidden hover:border-[#D4AF37]/30 transition-all duration-300 hover:-translate-y-1",
          className
        )}
      >
        <motion.div layoutId={`image-${id}`} className="relative h-48 overflow-hidden">
          <img
            src={src}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
        </motion.div>

        <div className="p-5">
          <motion.p layoutId={`description-${id}`} className="text-muted-foreground text-xs mb-3">
            {description}
          </motion.p>
          <motion.h3
            layoutId={`title-${id}`}
            className="text-foreground font-semibold text-lg mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2"
          >
            {title}
          </motion.h3>
        </div>
      </motion.div>
    </>
  );
}
