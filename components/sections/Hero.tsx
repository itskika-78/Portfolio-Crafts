"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/portfolio";
import FloatingCoins from "@/components/canvas/FloatingCoins";
import PlusButton from "@/components/ui/PlusButton";

function HeroMark() {
  return (
    <svg width="34" height="24" viewBox="0 0 26 18" fill="none" aria-hidden="true">
      <path d="M0 18V6l7 3.5V18H0Z" fill="white" />
      <path d="M9.5 18V3l7 3.5V18h-7Z" fill="white" />
      <path d="M19 18V0l7 3.5V18h-7Z" fill="white" />
    </svg>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* hero shrinks, fades and blurs away as you scroll — like a
     camera pulling focus to the next scene */
  const scale = useTransform(scrollYProgress, [0, 0.9], [1, 0.86]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const blurPx = useTransform(scrollYProgress, [0, 0.9], [0, 10]);
  const filter = useTransform(blurPx, (b) => `blur(${b}px)`);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
  };

  const rise = {
    hidden: { opacity: 0, y: 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden"
    >
      <FloatingCoins />

      <motion.div
        style={{ scale, opacity, filter }}
        className="relative z-10 flex max-w-[560px] flex-col items-center gap-5 px-6 text-center"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-5"
        >
          <motion.div variants={rise} className="flex flex-col items-center gap-5">
            <HeroMark />
            <h1
              className="statement"
              style={{ fontSize: "clamp(1.7rem, 4.2vw, 2.6rem)" }}
            >
              <b>Next.js</b>{" "}
              <span style={{ color: "var(--color-brand-primary)" }}>×</span>{" "}
              <b>Solana</b>{" "}
              <span style={{ fontWeight: 300 }}>
                for games, tokens and interfaces
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={rise}
            className="max-w-[430px] text-sm leading-relaxed"
            style={{ color: "var(--color-shade-secondary)" }}
          >
            I&apos;m {profile.name} — a {profile.ageRole.toLowerCase()} building
            decentralized apps and immersive web experiences for platforms
            where every interaction settles on the chain.
          </motion.p>

          <motion.div variants={rise} className="flex flex-wrap items-center justify-center gap-4">
            <PlusButton
              href={`mailto:${profile.email}`}
              cursorLabel="SAY HI"
            >
              WRITE TO MAIL
            </PlusButton>
            <PlusButton
              href={profile.github}
              external
              cursorLabel="CODE"
            >
              GITHUB
            </PlusButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
