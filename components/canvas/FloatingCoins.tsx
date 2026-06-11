"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useEffect } from "react";

/*
 * 3D coin tokens drifting around the hero — each one a circular
 * badge with a tech glyph, lit from above, blurred by depth.
 */

function SolanaGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-2/5 w-2/5">
      <path d="M5.7 5h13.6l-3 3H2.7l3-3Z" fill="currentColor" />
      <path d="M5.7 10.5h13.6l-3 3H2.7l3-3Z" fill="currentColor" opacity="0.8" />
      <path d="M5.7 16h13.6l-3 3H2.7l3-3Z" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function ReactGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-1/2 w-1/2">
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.1" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.1" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.1" transform="rotate(120 12 12)" />
    </svg>
  );
}

function NextGlyph() {
  return <span className="font-mono text-[0.85em] font-bold">N</span>;
}

function TsGlyph() {
  return <span className="font-mono text-[0.7em] font-bold">TS</span>;
}

function GithubGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-1/2 w-1/2">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function GamepadGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-1/2 w-1/2">
      <rect x="2" y="8" width="20" height="9" rx="4.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 10.5v4M5 12.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="16" cy="11.5" r="0.9" fill="currentColor" />
      <circle cx="18.5" cy="13.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

function EthGlyph() {
  return <span className="text-[0.85em]">Ξ</span>;
}

function ShaderGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-1/2 w-1/2">
      <path d="M3 17c3-7 6-10 9-10s6 3 9 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

interface CoinDef {
  Glyph: () => JSX.Element;
  /* base position as % of hero area */
  x: number;
  y: number;
  size: number; // px
  depth: number; // 0 = front, 1 = far back
  floatDur: number;
  delay: number;
}

const COINS: CoinDef[] = [
  { Glyph: SolanaGlyph, x: 13, y: 24, size: 92, depth: 0.15, floatDur: 7.5, delay: 0 },
  { Glyph: ReactGlyph, x: 27, y: 64, size: 76, depth: 0.35, floatDur: 9, delay: 0.8 },
  { Glyph: NextGlyph, x: 20, y: 43, size: 58, depth: 0.65, floatDur: 8, delay: 1.6 },
  { Glyph: GithubGlyph, x: 38, y: 16, size: 64, depth: 0.5, floatDur: 8.6, delay: 0.4 },
  { Glyph: EthGlyph, x: 60, y: 12, size: 56, depth: 0.7, floatDur: 9.4, delay: 1.1 },
  { Glyph: GamepadGlyph, x: 80, y: 26, size: 88, depth: 0.25, floatDur: 7.8, delay: 0.2 },
  { Glyph: TsGlyph, x: 86, y: 58, size: 62, depth: 0.55, floatDur: 8.8, delay: 1.4 },
  { Glyph: ShaderGlyph, x: 71, y: 74, size: 72, depth: 0.4, floatDur: 9.6, delay: 0.6 },
];

function Coin({
  def,
  mx,
  my,
}: {
  def: CoinDef;
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const { Glyph } = def;
  const range = 34 * (1 - def.depth); // closer coins move more
  const px = useTransform(mx, [-1, 1], [-range, range]);
  const py = useTransform(my, [-1, 1], [-range * 0.6, range * 0.6]);

  const blur = def.depth * 3.2;
  const dim = 1 - def.depth * 0.55;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${def.x}%`,
        top: `${def.y}%`,
        x: px,
        y: py,
        filter: `blur(${blur}px)`,
        opacity: dim,
      }}
    >
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [-4, 4, -4] }}
        transition={{
          duration: def.floatDur,
          repeat: Infinity,
          ease: "easeInOut",
          delay: def.delay,
        }}
        className="flex items-center justify-center rounded-full"
        style={{
          width: def.size,
          height: def.size,
          fontSize: def.size * 0.5,
          color: "rgba(255,255,255,0.8)",
          background:
            "radial-gradient(circle at 32% 24%, #2e2e2e 0%, #161616 45%, #050505 100%)",
          border: "1px solid rgba(255,255,255,0.13)",
          boxShadow:
            "inset 0 1px 1px rgba(255,255,255,0.22), inset 0 -8px 16px rgba(0,0,0,0.7), 0 18px 36px rgba(0,0,0,0.65)",
        }}
      >
        <Glyph />
      </motion.div>
    </motion.div>
  );
}

export default function FloatingCoins() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mx = useSpring(mouseX, { stiffness: 50, damping: 18 });
  const my = useSpring(mouseY, { stiffness: 50, damping: 18 });

  const { scrollYProgress } = useScroll();
  // coins drift apart and fade as the hero scrolls away
  const fade = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const scatter = useTransform(scrollYProgress, [0, 0.12], [1, 1.18]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      style={{ opacity: fade, scale: scatter }}
      aria-hidden="true"
    >
      {COINS.map((def, i) => (
        <Coin key={i} def={def} mx={mx} my={my} />
      ))}
    </motion.div>
  );
}
