"use client";

import { ReactNode } from "react";

function Bracket({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  // L-shaped corner bracket, rotated per corner
  const rotation = { tl: 0, tr: 90, br: 180, bl: 270 }[pos];
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={`bracket bracket-${pos}`}
      style={{ transform: undefined }}
      aria-hidden="true"
    >
      <path
        d={`M1 14V1h13`}
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
        fill="none"
        transform={`rotate(${rotation} 7 7)`}
      />
    </svg>
  );
}

export default function ImageMask({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`image-mask ${className}`}>
      <Bracket pos="tl" />
      <Bracket pos="tr" />
      <Bracket pos="bl" />
      <Bracket pos="br" />
      {children}
    </div>
  );
}
