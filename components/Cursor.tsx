"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useCursor } from "@/providers/CursorProvider";

export default function Cursor() {
  const { mode, label } = useCursor();
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Primary dot — zero latency
  const dotX = useSpring(mouseX, { stiffness: 2000, damping: 80, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 2000, damping: 80, mass: 0.1 });

  // Ring — heavily spring-damped follower
  const ringX = useSpring(mouseX, { stiffness: 200, damping: 28, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 200, damping: 28, mass: 0.5 });

  const lastVisible = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      lastVisible.current = true;
    };

    const handleMouseLeave = () => {
      mouseX.set(-200);
      mouseY.set(-200);
      lastVisible.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  const isExpanded = mode === "view" || mode === "drag" || mode === "link";
  const ringSize = isExpanded ? 72 : 40;
  const dotSize = isExpanded ? 6 : 8;

  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: "var(--z-cursor)" }}
      aria-hidden="true"
    >
      {/* Primary dot */}
      <motion.div
        className="absolute left-0 top-0 pointer-events-none"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="absolute rounded-full bg-brand-primary"

          animate={{
            width: dotSize,
            height: dotSize,
            x: "-50%",
            y: "-50%",
            opacity: mode === "hidden" ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Spring ring */}
      <motion.div
        className="absolute left-0 top-0 pointer-events-none"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="absolute rounded-full border border-brand-primary flex items-center justify-center"

          animate={{
            width: ringSize,
            height: ringSize,
            x: "-50%",
            y: "-50%",
            opacity: mode === "hidden" ? 0 : isExpanded ? 0.85 : 0.45,
            borderColor: isExpanded ? "rgba(0, 255, 255, 0.9)" : "rgba(0, 255, 255, 0.45)",
            backgroundColor: isExpanded ? "rgba(0, 255, 255, 0.08)" : "transparent",
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Context label inside ring */}
          <AnimatePresence>
            {isExpanded && label && (
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-[9px] font-medium tracking-widest uppercase text-center absolute"
                style={{ color: "var(--color-background)" }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
