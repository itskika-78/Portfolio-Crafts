"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/* Vertical scroll progress instrument on the left edge */
const SEGMENTS = [
  { id: "hero", major: true },
  { id: "spec", major: false },
  { id: "cases-1", major: true },
  { id: "cases-2", major: false },
  { id: "cases-3", major: false },
  { id: "cases-4", major: false },
  { id: "profile", major: true },
  { id: "footer", major: true },
];

export default function ProgressRail() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const fillHeight = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="fixed left-5 top-1/2 hidden -translate-y-1/2 lg:flex"
      style={{ zIndex: "var(--z-rail)" }}
      aria-hidden="true"
    >
      <div className="relative flex h-[250px] flex-col items-center">
        {/* track */}
        <div
          className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
          style={{ background: "rgba(255,255,255,0.12)" }}
        />
        {/* active fill */}
        <motion.div
          className="absolute left-1/2 top-0 w-px -translate-x-1/2"
          style={{ height: fillHeight, background: "var(--color-brand-primary)" }}
        />
        {/* segment ticks */}
        <div className="relative flex h-full flex-col justify-between py-0.5">
          {SEGMENTS.map((s) => (
            <span
              key={s.id}
              className="block"
              style={{
                width: s.major ? 10 : 6,
                height: 1,
                background: s.major
                  ? "rgba(255,255,255,0.45)"
                  : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
