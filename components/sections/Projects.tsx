"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "@/data/portfolio";
import { useCursor } from "@/providers/CursorProvider";

const allProjects = [...projects];

function SvgBorderTrace({ hovered }: { hovered: boolean }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ overflow: "visible" }}
    >
      <motion.rect
        x="1"
        y="1"
        width="calc(100% - 2)"
        height="calc(100% - 2)"
        rx="0"
        fill="none"
        stroke="#00ffff"
        strokeWidth="1.5"
        style={{
          width: "calc(100% - 2px)",
          height: "calc(100% - 2px)",
        }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          hovered
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

function ProjectCard({
  project,
  index,
  skewY,
}: {
  project: (typeof allProjects)[0];
  index: number;
  skewY: any;
}) {
  const { setCursorMode, resetCursor } = useCursor();
  const cardRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);

  // Magnetic cursor bubble
  const bubbleX = useMotionValue(-200);
  const bubbleY = useMotionValue(-200);
  const springBubbleX = useSpring(bubbleX, { stiffness: 300, damping: 20, mass: 0.1 });
  const springBubbleY = useSpring(bubbleY, { stiffness: 300, damping: 20, mass: 0.1 });

  // 3D Tilt effect
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 150, damping: 20 });
  const springTiltY = useSpring(tiltY, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springTiltY, [-0.5, 0.5], ["3deg", "-3deg"]); // Subtle tilt for massive cards
  const rotateY = useTransform(springTiltX, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    // Bubble
    bubbleX.set(e.clientX - rect.left);
    bubbleY.set(e.clientY - rect.top);
    
    // Tilt
    const width = rect.width;
    const height = rect.height;
    tiltX.set((e.clientX - rect.left) / width - 0.5);
    tiltY.set((e.clientY - rect.top) / height - 0.5);
  };

  const handleMouseEnter = () => {
    setHovered(true);
    setCursorMode("view", "VIEW");
  };

  const handleMouseLeave = () => {
    setHovered(false);
    resetCursor();
    bubbleX.set(-200);
    bubbleY.set(-200);
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, scale: 1.08, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        type: "spring",
        damping: 25,
        stiffness: 120,
        mass: 1.2,
      }}
      style={{
        skewY,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 2000,
        cursor: "none",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden"
    >
      {/* SVG border trace */}
      <SvgBorderTrace hovered={hovered} />

      {/* Card content */}
      <div
        className="relative flex min-h-[65vh] flex-col overflow-hidden"
        style={{
          background: "var(--color-card-solid)",
          border: "1px solid var(--color-border-light)",
        }}
      >
        {/* Image area — upper 55% */}
        <div className="relative flex-1 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={hovered ? { scale: 1.06 } : { scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ opacity: hovered ? 0.85 : 0.65 }}
            />
          </motion.div>

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(5,5,8,0.2) 0%, rgba(5,5,8,0.85) 100%)",
            }}
          />

          {/* Index badge */}
          <div className="absolute left-6 top-6 flex items-center gap-2">
            <span
              className="font-mono text-xs"
              style={{ color: "var(--color-brand-primary)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="font-mono text-xs"
              style={{ color: "var(--color-shade-mute)" }}
            >
              / Selected Work
            </span>
          </div>

          {/* Hover neon glow */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="pointer-events-none absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  background:
                    "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,255,255,0.08) 0%, transparent 70%)",
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Content area */}
        <div className="relative p-8">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <h3
                className="font-sans font-semibold leading-tight"
                style={{
                  fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
                  letterSpacing: "-0.03em",
                  color: "var(--color-shade-primary)",
                }}
              >
                {project.title}
              </h3>
              <p
                className="mt-3 max-w-2xl font-sans leading-relaxed"
                style={{
                  color: "var(--color-shade-secondary)",
                  fontSize: "0.95rem",
                }}
              >
                {project.description}
              </p>
            </div>

            {/* Arrow */}
            <motion.div
              className="shrink-0"
              animate={hovered ? { x: 4, y: -4 } : { x: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 19L19 5M19 5H9M19 5v10"
                  stroke={hovered ? "#00ffff" : "rgba(255,255,255,0.3)"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>

          {/* Tags + Links */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-3 py-1"
                  style={{
                    color: "var(--color-shade-tertiary)",
                    border: "1px solid var(--color-border-light)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ fontSize: "0.75rem", cursor: "none" }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Magnetic "VIEW PROJECT" bubble */}
      <motion.div
        className="pointer-events-none absolute flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-center"
        style={{
          x: springBubbleX,
          y: springBubbleY,
          background: "var(--color-brand-primary)",
          color: "var(--color-background)",
          zIndex: 20,
          opacity: hovered ? 1 : 0,
        }}
        animate={{ scale: hovered ? 1 : 0.3, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-mono text-[9px] font-semibold uppercase leading-tight tracking-widest">
          VIEW
          <br />
          PROJECT
        </span>
      </motion.div>
    </motion.article>
  );
}

export default function Projects() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const rawVelocity = useVelocity(scrollY);

  // Heavily damped spring to prevent oscillation
  const smoothVelocity = useSpring(rawVelocity, {
    damping: 50,
    stiffness: 400,
    restDelta: 0.001,
  });

  // Clamp [-2000, +2000] velocity → [-5deg, +5deg]
  const skewY = useTransform(smoothVelocity, [-2000, 2000], [-4, 4]);

  return (
    <section id="projects" className="relative w-full py-24">
      <div className="container-app px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="bs-comment">{"// selected_work[]"}</span>
          <h2
            className="mt-2 font-sans font-semibold leading-tight"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.04em",
              color: "var(--color-shade-primary)",
            }}
          >
            Projects
          </h2>
        </motion.div>

        {/* Cards list */}
        <div ref={wrapperRef} className="flex flex-col gap-6">
          {allProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              skewY={skewY}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
