"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/*
 * Boot sequence: counter climbs to 100 with a thin load line,
 * then the screen splits open top/bottom like shutter doors.
 */
export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let value = 0;
    const tick = () => {
      // ease the counter — fast at first, settling at the end
      const remaining = 100 - value;
      value = Math.min(100, value + Math.max(1, remaining * 0.09));
      setProgress(Math.floor(value));
      if (value < 100) {
        timer = window.setTimeout(tick, 34 + Math.random() * 50);
      } else {
        window.setTimeout(() => setDone(true), 260);
      }
    };
    let timer = window.setTimeout(tick, 120);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(onComplete, 950);
    return () => window.clearTimeout(t);
  }, [done, onComplete]);

  const shutter = {
    open: (dir: number) => ({
      y: `${dir * 100}%`,
      transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] as const },
    }),
    closed: { y: "0%" },
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ zIndex: "var(--z-preloader)" }}
      aria-hidden="true"
    >
      {/* shutters */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-black"
        custom={-1}
        variants={shutter}
        initial="closed"
        animate={done ? "open" : "closed"}
        style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-black"
        custom={1}
        variants={shutter}
        initial="closed"
        animate={done ? "open" : "closed"}
        style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
      />

      {/* readout */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-5"
        animate={{ opacity: done ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="u-label" style={{ color: "var(--color-shade-tertiary)" }}>
          KIKA — PORTFOLIO {String(new Date().getFullYear())}
        </p>

        <div className="flex items-center gap-4">
          <span
            className="font-mono text-4xl font-light tabular-nums"
            style={{ color: "var(--color-shade-primary)" }}
          >
            {String(progress).padStart(3, "0")}
          </span>
          <span className="u-label" style={{ color: "var(--color-shade-mute)" }}>
            %
          </span>
        </div>

        {/* load line */}
        <div
          className="h-px w-[220px] overflow-hidden"
          style={{ background: "rgba(255,255,255,0.12)" }}
        >
          <div
            className="h-full"
            style={{
              width: `${progress}%`,
              background: "var(--color-brand-primary)",
              transition: "width 80ms linear",
            }}
          />
        </div>

        <p className="u-label-xs" style={{ color: "var(--color-shade-mute)" }}>
          INITIALIZING INTERFACE
        </p>
      </motion.div>
    </div>
  );
}
