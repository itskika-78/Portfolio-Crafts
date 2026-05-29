"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/portfolio";
import { useCursor } from "@/providers/CursorProvider";

const titleWords = ["FULL-STACK", "DEVELOPER", "& BUILDER"];
const tagline = ["Next.js", "·", "Solana", "·", "Creative Coding", "·", "Web3"];

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const { setCursorMode, resetCursor } = useCursor();

  const copyEmail = async () => {
    await navigator.clipboard?.writeText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <motion.button
      type="button"
      onClick={copyEmail}
      className="btn-ghost flex items-center gap-2"
      style={{ cursor: "none" }}
      onMouseEnter={() => setCursorMode("link", "COPY")}
      onMouseLeave={resetCursor}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span
        key={copied ? "copied" : "email"}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2 }}
      >
        {copied ? "✓ Copied" : profile.email}
      </motion.span>
    </motion.button>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 18 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scrollIndicatorY = useTransform(scrollYProgress, [0, 0.15], [0, 24]);
  const titleParallaxY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set((e.clientX - cx) / cx);
      mouseY.set((e.clientY - cy) / cy);
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const parallaxLayerX = useTransform(springX, [-1, 1], [-18, 18]);
  const parallaxLayerY = useTransform(springY, [-1, 1], [-10, 10]);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const lineReveal = {
    hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
    show: {
      clipPath: "inset(0 0 0% 0)",
      opacity: 1,
      transition: {
        clipPath: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
        opacity: { duration: 0.1 },
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      id="profile"
      className="relative flex min-h-[100dvh] w-full flex-col items-start justify-end overflow-hidden pb-16 pl-[8vw]"
    >
      {/* Ambient radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 60%, rgba(0,255,255,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Watermark */}
      <motion.div
        className="pointer-events-none absolute right-[-5vw] top-[10%] select-none font-sans font-semibold leading-none"
        style={{
          fontSize: "clamp(8rem, 18vw, 22rem)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(0,255,255,0.04)",
          letterSpacing: "-0.06em",
          y: useTransform(scrollYProgress, [0, 1], [0, 160]),
        }}
        aria-hidden="true"
      >
        BUILD
      </motion.div>

      {/* Main content layer with mouse parallax */}
      <motion.div
        style={{
          x: parallaxLayerX,
          y: useTransform(
            [parallaxLayerY, titleParallaxY] as any,
            ([py, ty]: number[]) => py + ty
          ),
        }}
        className="relative z-10 flex flex-col gap-6"
      >
        {/* Tagline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4"
        >
          {/* Age badge */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span
              className="h-px w-12"
              style={{ background: "var(--color-brand-primary)" }}
            />
            <span
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: "var(--color-brand-primary)" }}
            >
              {profile.ageRole}
            </span>
          </motion.div>

          {/* Hero title lines */}
          <div className="flex flex-col gap-1">
            {titleWords.map((word, i) => (
              <div key={word} className="overflow-hidden">
                <motion.h1
                  variants={lineReveal}
                  className="font-sans font-semibold leading-[0.9] tracking-tight"
                  style={{
                    fontSize: "clamp(3.5rem, 10vw, 10rem)",
                    color:
                      i === 0
                        ? "var(--color-shade-primary)"
                        : i === 1
                        ? "var(--color-brand-primary)"
                        : "var(--color-shade-secondary)",
                    textShadow:
                      i === 1
                        ? "0 0 40px rgba(0,255,255,0.3)"
                        : "none",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-3"
            style={{ marginTop: "0.5rem" }}
          >
            {tagline.map((tag, i) => (
              <span
                key={i}
                className="font-mono text-sm"
                style={{
                  color:
                    tag === "·"
                      ? "var(--color-shade-mute)"
                      : "var(--color-shade-secondary)",
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA row */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="btn-primary"
            >
              Get in touch
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M1 11L11 1M11 1H4M11 1v7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <CopyEmailButton />
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ cursor: "none" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 right-[8vw] flex flex-col items-center gap-2"
        style={{ opacity: scrollIndicatorOpacity, y: scrollIndicatorY }}
      >
        <span
          className="font-mono text-[10px] tracking-[0.2em] uppercase"
          style={{ color: "var(--color-shade-mute)" }}
        >
          Scroll
        </span>
        <motion.div
          className="flex flex-col items-center gap-1"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="h-8 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--color-brand-primary))",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Corner decorators */}
      <div className="pointer-events-none absolute left-0 top-0">
        <svg width="60" height="60" fill="none">
          <path d="M1 60V1h59" stroke="rgba(0,255,255,0.15)" strokeWidth="0.75" />
        </svg>
      </div>
      <div className="pointer-events-none absolute right-0 top-0">
        <svg width="60" height="60" fill="none">
          <path d="M59 60V1H1" stroke="rgba(0,255,255,0.15)" strokeWidth="0.75" />
        </svg>
      </div>
    </section>
  );
}
