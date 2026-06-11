"use client";

import { ReactNode } from "react";
import { useCursor } from "@/providers/CursorProvider";

function PlusCorner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  return (
    <svg
      width="7"
      height="7"
      viewBox="0 0 7 7"
      fill="none"
      className={`plus-corner plus-${pos}`}
      aria-hidden="true"
    >
      <path d="M4 3h3v1H4v3H3V4H0V3h3V0h1v3Z" fill="rgba(255,255,255,0.55)" />
    </svg>
  );
}

export default function PlusButton({
  children,
  href,
  onClick,
  solid = false,
  cursorLabel,
  external = false,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  solid?: boolean;
  cursorLabel?: string;
  external?: boolean;
  className?: string;
}) {
  const { setCursorMode, resetCursor } = useCursor();

  const corners = (
    <>
      <PlusCorner pos="tl" />
      <PlusCorner pos="tr" />
      <PlusCorner pos="bl" />
      <PlusCorner pos="br" />
    </>
  );

  const cls = `btn-plus ${solid ? "btn-plus--solid" : ""} ${className}`;
  const hoverProps = {
    onMouseEnter: () => setCursorMode("link", cursorLabel ?? ""),
    onMouseLeave: resetCursor,
    style: { cursor: "none" as const },
  };

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...hoverProps}
      >
        {corners}
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cls} {...hoverProps}>
      {corners}
      {children}
    </button>
  );
}
