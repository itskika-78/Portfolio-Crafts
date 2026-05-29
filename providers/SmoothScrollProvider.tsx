"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { useMotionValue } from "framer-motion";

interface ScrollContextValue {
  scrollY: ReturnType<typeof useMotionValue<number>>;
  velocity: ReturnType<typeof useMotionValue<number>>;
  lenisRef: React.MutableRefObject<Lenis | null>;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function useSmoothScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useSmoothScroll must be used inside SmoothScrollProvider");
  return ctx;
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const scrollY = useMotionValue(0);
  const velocity = useMotionValue(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ({ scroll, velocity: vel }: { scroll: number; velocity: number }) => {
      scrollY.set(scroll);
      velocity.set(vel);
    });

    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
    };
  }, [scrollY, velocity]);

  return (
    <ScrollContext.Provider value={{ scrollY, velocity, lenisRef }}>
      {children}
    </ScrollContext.Provider>
  );
}
