"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Simulate loading progress with acceleration curve
    const steps = [
      { target: 30, duration: 400 },
      { target: 65, duration: 500 },
      { target: 85, duration: 400 },
      { target: 100, duration: 300 },
    ];

    let currentStep = 0;
    let currentProgress = 0;

    function animateStep() {
      if (currentStep >= steps.length) {
        // Begin exit sequence
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            setShow(false);
            onComplete();
          }, 900);
        }, 200);
        return;
      }

      const step = steps[currentStep];
      const startProgress = currentProgress;
      const targetProgress = step.target;
      const stepDuration = step.duration;
      const startTime = performance.now();

      function updateProgress(now: number) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / stepDuration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        currentProgress = startProgress + (targetProgress - startProgress) * eased;
        setProgress(Math.round(currentProgress));

        if (t < 1) {
          requestAnimationFrame(updateProgress);
        } else {
          currentStep++;
          animateStep();
        }
      }

      requestAnimationFrame(updateProgress);
    }

    animateStep();
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{
            background: "var(--color-background)",
            zIndex: "var(--z-preloader)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Iris wipe — top panel */}
          <motion.div
            className="absolute inset-x-0 top-0"
            style={{ background: "var(--color-background)" }}
            animate={exiting ? { scaleY: 0, originY: 0 } : { scaleY: 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Iris wipe — bottom panel */}
          <motion.div
            className="absolute inset-x-0 bottom-0"
            style={{ background: "var(--color-background)", height: "50vh" }}
            animate={exiting ? { scaleY: 0, originY: 1 } : { scaleY: 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-10"
            animate={exiting ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Geometric logo */}
            <motion.div
              className="relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <rect
                  x="2"
                  y="2"
                  width="60"
                  height="60"
                  stroke="rgba(0,255,255,0.15)"
                  strokeWidth="1"
                />
                <motion.rect
                  x="2"
                  y="2"
                  width="60"
                  height="60"
                  stroke="#00ffff"
                  strokeWidth="1.5"
                  strokeDasharray="240"
                  initial={{ strokeDashoffset: 240 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
                <motion.line
                  x1="32"
                  y1="2"
                  x2="32"
                  y2="62"
                  stroke="rgba(0,255,255,0.4)"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
                <motion.line
                  x1="2"
                  y1="32"
                  x2="62"
                  y2="32"
                  stroke="rgba(0,255,255,0.4)"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="8"
                  fill="none"
                  stroke="#00ffff"
                  strokeWidth="1.5"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  style={{ transformOrigin: "32px 32px" }}
                />
              </svg>
            </motion.div>

            {/* Name */}
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                className="font-sans text-2xl font-semibold tracking-[0.3em] uppercase"
                style={{ color: "var(--color-shade-primary)" }}
              >
                KIKA
              </h1>
              <p className="bs-comment tracking-[0.2em]">// portfolio loading</p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  width: "180px",
                  height: "1px",
                  background: "rgba(255,255,255,0.08)",
                }}
              >
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{
                    background: "var(--color-brand-primary)",
                    boxShadow: "0 0 8px rgba(0,255,255,0.8)",
                    width: `${progress}%`,
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <span
                className="font-mono text-xs tabular-nums"
                style={{ color: "var(--color-shade-tertiary)" }}
              >
                {String(progress).padStart(3, "0")}%
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
