"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { experience, highlights } from "@/data/portfolio";
import { useCursor } from "@/providers/CursorProvider";

const bioParagraph =
  "I'm Kika, a 15-year-old full-stack developer who builds decentralized applications on Solana and immersive web experiences with Next.js and React. I've shipped production code for web3 gaming platforms, designed creative-coding animations that push the browser's limits, and participated in elite hacker residencies and fellowships. I believe the best software is both technically rigorous and visually extraordinary — and I'm here to prove that age is just a number.";

function ScrubWord({
  word,
  progress,
  index,
  total,
}: {
  word: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  // Each word activates as scrollYProgress crosses its threshold
  const start = (index / total) * 0.7;
  const end = start + 0.06;

  const color = useTransform(
    progress,
    [start, end],
    ["rgba(74,76,106,1)", "rgba(240,240,248,1)"]
  );

  const textShadow = useTransform(progress, [start, end], [
    "none",
    "0 0 8px rgba(0,255,255,0.3)",
  ]);

  return (
    <motion.span
      style={{ color, textShadow, display: "inline" }}
    >
      {word}{" "}
    </motion.span>
  );
}

function ScrollScrubParagraph({ progress }: { progress: MotionValue<number> }) {
  const words = bioParagraph.split(" ");
  return (
    <p
      className="font-sans leading-relaxed"
      style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)" }}
    >
      {words.map((word, i) => (
        <ScrubWord
          key={`${word}-${i}`}
          word={word}
          progress={progress}
          index={i}
          total={words.length}
        />
      ))}
    </p>
  );
}

function SelfDrawingTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.9", "end 0.4"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <div ref={timelineRef} className="relative flex flex-col gap-0">
      {/* Self-drawing spine */}
      <div
        className="pointer-events-none absolute left-[7px] top-0 bottom-0"
        style={{ width: "2px" }}
      >
        <svg
          className="absolute inset-0"
          width="2"
          height="100%"
          viewBox={`0 0 2 ${experience.length * 100}`}
          preserveAspectRatio="none"
        >
          <path
            d={`M1 0 L1 ${experience.length * 100}`}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="2"
            fill="none"
          />
          <motion.path
            d={`M1 0 L1 ${experience.length * 100}`}
            stroke="#00ffff"
            strokeWidth="2"
            fill="none"
            style={{ pathLength }}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {experience.map((item, index) => (
        <motion.article
          key={`${item.company}-${item.period}`}
          className="relative pl-10 pb-10"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Timeline dot */}
          <motion.div
            className="absolute left-0 top-1 h-4 w-4 rounded-full"
            style={{
              background: "var(--color-background)",
              border: "1.5px solid var(--color-brand-primary)",
              boxShadow: "0 0 8px rgba(0,255,255,0.5)",
            }}
            whileInView={{ scale: [0, 1.3, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          />

          <div>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h4
                className="font-sans font-semibold"
                style={{ color: "var(--color-shade-primary)" }}
              >
                {item.role}
              </h4>
              <span
                className="font-sans font-medium"
                style={{ color: "var(--color-brand-primary)" }}
              >
                @ {item.company}
              </span>
            </div>
            <p
              className="mt-1 font-mono text-xs"
              style={{ color: "var(--color-shade-mute)" }}
            >
              {item.period}
            </p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setCursorMode, resetCursor } = useCursor();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"],
  });


  // Watermark parallax
  const watermarkY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section ref={sectionRef} id="experience" className="relative w-full py-32">
      {/* Background watermark */}
      <motion.div
        className="pointer-events-none absolute left-0 right-0 top-[10%] select-none overflow-hidden"
        style={{ y: watermarkY }}
        aria-hidden="true"
      >
        <span
          className="block font-sans font-semibold leading-none"
          style={{
            fontSize: "clamp(8rem, 20vw, 28rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(0,255,255,0.03)",
            letterSpacing: "-0.06em",
            textAlign: "center",
          }}
        >
          INNOVATE
        </span>
      </motion.div>

      <div className="container-app relative px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="bs-comment">{"// about me"}</span>
          <h2
            className="mt-2 font-sans font-semibold leading-tight"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.04em",
              color: "var(--color-shade-primary)",
            }}
          >
            Who I Am
          </h2>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-[1fr_0.55fr] lg:gap-24">
          {/* Left — scroll-scrub biography */}
          <div className="flex flex-col gap-16">
            <div>
              <ScrollScrubParagraph progress={scrollYProgress} />
            </div>


          </div>

          {/* Right — timeline */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="section-label mb-8">Experience Timeline</h3>
              <SelfDrawingTimeline />
            </motion.div>

            {/* Residencies */}
            <div className="mt-4">
              <h3 className="section-label mb-6">Residencies & Fellowships</h3>
              <div className="flex flex-col gap-4">
                {highlights.map((item, index) => (
                  <motion.article
                    key={item.title}
                    className="bs-card pixel-corners overflow-hidden"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    onMouseEnter={() => setCursorMode("view", "VIEW")}
                    onMouseLeave={resetCursor}
                    style={{ cursor: "none" }}
                  >
                    <div className="flex gap-4 p-4">
                      <div
                        className="relative h-16 w-24 shrink-0 overflow-hidden rounded"
                        style={{
                          background: "var(--color-card-foreground)",
                        }}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="96px"
                          className="object-cover opacity-70"
                        />
                      </div>
                      <div>
                        <h4
                          className="font-sans text-sm font-medium"
                          style={{ color: "var(--color-shade-primary)" }}
                        >
                          {item.title}
                        </h4>
                        <p
                          className="mt-1 font-mono text-xs"
                          style={{ color: "var(--color-shade-mute)" }}
                        >
                          {item.period}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
