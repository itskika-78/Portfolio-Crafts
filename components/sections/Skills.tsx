"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { companies } from "@/data/portfolio";
import { useCursor } from "@/providers/CursorProvider";

// Skill nodes definition
const skillNodes = [
  { id: "nextjs", label: "Next.js", level: 95, color: "#00ffff", x: 0.45, y: 0.15 },
  { id: "react", label: "React", level: 92, color: "#00ffff", x: 0.25, y: 0.35 },
  { id: "solana", label: "Solana", level: 88, color: "#9945ff", x: 0.7, y: 0.35 },
  { id: "rust", label: "Rust", level: 75, color: "#dea584", x: 0.9, y: 0.5 },
  { id: "framer", label: "Framer", level: 90, color: "#00ffff", x: 0.35, y: 0.65 },
  { id: "webgl", label: "WebGL/GLSL", level: 72, color: "#00ffff", x: 0.6, y: 0.7 },
  { id: "typescript", label: "TypeScript", level: 88, color: "#3178c6", x: 0.1, y: 0.6 },
  { id: "nodejs", label: "Node.js", level: 82, color: "#8cc84b", x: 0.8, y: 0.15 },
  { id: "prisma", label: "Prisma", level: 85, color: "#5a67d8", x: 0.85, y: 0.75 },
  { id: "tailwind", label: "Tailwind CSS", level: 95, color: "#38bdf8", x: 0.15, y: 0.15 },
  { id: "creative", label: "Creative Code", level: 85, color: "#ff6b6b", x: 0.45, y: 0.85 },
];

// Connections between nodes
const connections = [
  ["nextjs", "react"],
  ["nextjs", "typescript"],
  ["nextjs", "nodejs"],
  ["nextjs", "tailwind"],
  ["react", "framer"],
  ["react", "typescript"],
  ["react", "tailwind"],
  ["solana", "nodejs"],
  ["solana", "rust"],
  ["nodejs", "prisma"],
  ["framer", "creative"],
  ["framer", "webgl"],
  ["webgl", "creative"],
];

function DraggableNode({
  node,
  containerWidth,
  containerHeight,
  nodePositions,
  onPositionChange,
}: {
  node: (typeof skillNodes)[0];
  containerWidth: number;
  containerHeight: number;
  nodePositions: React.MutableRefObject<Record<string, { x: ReturnType<typeof useMotionValue<number>>; y: ReturnType<typeof useMotionValue<number>> }>>;
  onPositionChange: (id: string) => void;
}) {
  const { setCursorMode, resetCursor } = useCursor();
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const initialX = node.x * containerWidth - 48;
  const initialY = node.y * containerHeight - 48;

  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);

  // Store in ref for SVG line access
  nodePositions.current[node.id] = { x, y };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={{
        left: 0,
        right: containerWidth - 96,
        top: 0,
        bottom: containerHeight - 96,
      }}
      style={{
        x,
        y,
        position: "absolute",
        width: 96,
        height: 96,
        cursor: "none",
        zIndex: isDragging ? 20 : 10,
        willChange: "transform",
      }}
      onDragStart={() => {
        setIsDragging(true);
        setCursorMode("drag", "DRAG");
      }}
      onDrag={() => onPositionChange(node.id)}
      onDragEnd={() => {
        setIsDragging(false);
        resetCursor();
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        if (!isDragging) setCursorMode("drag", "DRAG");
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!isDragging) resetCursor();
      }}
      whileDrag={{ scale: 1.1, zIndex: 20 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Node circle */}
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        {/* Glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: `1px solid ${node.color}`,
            boxShadow: `0 0 ${isHovered || isDragging ? 24 : 8}px ${node.color}40`,
          }}
          animate={{
            scale: isDragging ? 1 : [1, 1.04, 1],
            opacity: isHovered || isDragging ? 1 : 0.7,
          }}
          transition={
            isDragging
              ? { duration: 0.1 }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }
        />

        {/* Dark fill */}
        <div
          className="absolute inset-[3px] rounded-full"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${node.color}15, #0a0a14)`,
            border: `1px solid ${node.color}30`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-1">
          <span
            className="font-mono text-[8px] font-semibold leading-tight text-center"
            style={{ color: node.color, maxWidth: "70px" }}
          >
            {node.label}
          </span>
          <span
            className="font-mono text-[9px]"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {node.level}%
          </span>
        </div>

        {/* Proficiency arc */}
        <svg
          className="absolute inset-0"
          width="96"
          height="96"
          viewBox="0 0 96 96"
        >
          <circle cx="48" cy="48" r="44" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
          <circle
            cx="48"
            cy="48"
            r="44"
            fill="none"
            stroke={node.color}
            strokeWidth="2"
            strokeDasharray={`${(node.level / 100) * 276.46} 276.46`}
            strokeDashoffset="69.1" // rotate start to top
            strokeLinecap="round"
            style={{ opacity: 0.4 }}
          />
        </svg>
      </div>
    </motion.div>
  );
}

function ConnectingLines({
  nodePositions,
  tick,
}: {
  nodePositions: React.MutableRefObject<Record<string, { x: ReturnType<typeof useMotionValue<number>>; y: ReturnType<typeof useMotionValue<number>> }>>;
  tick: number;
}) {
  // Force re-read positions on tick update
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ zIndex: 1 }}
    >
      {connections.map(([from, to]) => {
        const fromPos = nodePositions.current[from];
        const toPos = nodePositions.current[to];
        if (!fromPos || !toPos) return null;

        const x1 = fromPos.x.get() + 48;
        const y1 = fromPos.y.get() + 48;
        const x2 = toPos.x.get() + 48;
        const y2 = toPos.y.get() + 48;

        return (
          <line
            key={`${from}-${to}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(0,255,255,0.12)"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}

function SkillGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodePositions = useRef<Record<string, { x: ReturnType<typeof useMotionValue<number>>; y: ReturnType<typeof useMotionValue<number>> }>>({});
  const [tick, setTick] = useState(0);

  const handlePositionChange = useCallback(() => {
    setTick((t) => t + 1);
  }, []);

  const containerWidth = 600;
  const containerHeight = 420;

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-lg"
      style={{
        width: "100%",
        height: `${containerHeight}px`,
        background: "var(--color-card-solid)",
        border: "1px solid var(--color-border-light)",
      }}
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,255,255,0.2) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Connecting lines */}
      <ConnectingLines nodePositions={nodePositions} tick={tick} />

      {/* Draggable nodes */}
      <div
        className="absolute inset-0"
        style={{
          width: containerWidth,
          maxWidth: "100%",
        }}
      >
        {skillNodes.map((node) => (
          <DraggableNode
            key={node.id}
            node={node}
            containerWidth={Math.min(containerWidth, 600)}
            containerHeight={containerHeight}
            nodePositions={nodePositions}
            onPositionChange={handlePositionChange}
          />
        ))}
      </div>

      {/* Label */}
      <div className="absolute bottom-3 right-4">
        <span
          className="font-mono text-[9px] tracking-widest uppercase"
          style={{ color: "var(--color-shade-mute)" }}
        >
          drag nodes to explore
        </span>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="companies" className="relative w-full py-24">
      <div className="container-app px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="bs-comment">{"// skills.map(skill => proficiency)"}</span>
          <h2
            className="mt-2 font-sans font-semibold leading-tight"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.04em",
              color: "var(--color-shade-primary)",
            }}
          >
            Skills & Companies
          </h2>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-[1fr_0.6fr]">
          {/* Skill Graph */}
          <div>
            <h3 className="section-label mb-6">Interactive Skill Graph</h3>
            <p
              className="mb-6 font-sans text-sm"
              style={{ color: "var(--color-shade-tertiary)" }}
            >
              Drag the nodes to explore my tech ecosystem
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <SkillGraph />
            </motion.div>
          </div>

          {/* Companies */}
          <div>
            <h3 className="section-label mb-6">Companies I've Contributed To</h3>
            <div className="flex flex-col gap-3">
              {companies.map((company, index) => (
                <motion.article
                  key={company.name}
                  className="bs-card pixel-corners scan-line p-5"
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span
                        className="font-mono text-xs"
                        style={{ color: "var(--color-brand-primary)" }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h4
                        className="mt-2 font-sans font-semibold"
                        style={{ color: "var(--color-shade-primary)" }}
                      >
                        {company.name}
                      </h4>
                    </div>
                    <span
                      className="font-mono text-[10px]"
                      style={{ color: "var(--color-shade-mute)" }}
                    >
                      contrib.
                    </span>
                  </div>
                  <p
                    className="mt-3 font-sans text-sm leading-relaxed"
                    style={{ color: "var(--color-shade-tertiary)" }}
                  >
                    {company.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
