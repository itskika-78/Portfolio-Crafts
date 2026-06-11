"use client";

import { motion } from "framer-motion";
import { nav, profile } from "@/data/portfolio";
import { useCursor } from "@/providers/CursorProvider";
import Tickers from "./Tickers";
import HUD from "./HUD";
import ProgressRail from "./ProgressRail";
import EdgeBlur from "./EdgeBlur";

function LogoMark() {
  /* three rising slanted bars — an abstract "K" climbing */
  return (
    <svg width="26" height="18" viewBox="0 0 26 18" fill="none" aria-hidden="true">
      <path d="M0 18V6l7 3.5V18H0Z" fill="white" />
      <path d="M9.5 18V3l7 3.5V18h-7Z" fill="white" />
      <path d="M19 18V0l7 3.5V18h-7Z" fill="white" />
    </svg>
  );
}

function NavLink({ label, href, external }: { label: string; href: string; external: boolean }) {
  const { setCursorMode, resetCursor } = useCursor();

  const openCraft = (e: React.MouseEvent) => {
    if (href === "#craft") {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("open-craft-menu"));
    }
  };

  return (
    <a
      href={href}
      className="frame-link"
      onClick={openCraft}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onMouseEnter={() => setCursorMode("link")}
      onMouseLeave={resetCursor}
      style={{ cursor: "none" }}
    >
      {label}
      <sup>↗</sup>
    </a>
  );
}

function ScrollDown() {
  return (
    <div
      className="u-label absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex"
      style={{ color: "var(--color-shade-secondary)" }}
    >
      <motion.span
        animate={{ y: [0, 3, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        ↓
      </motion.span>
      SCROLL DOWN
      <motion.span
        animate={{ y: [0, 3, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        aria-hidden="true"
      >
        ↓
      </motion.span>
    </div>
  );
}

export default function Frame() {
  const { setCursorMode, resetCursor } = useCursor();

  return (
    <>
      <ProgressRail />
      <EdgeBlur />

      {/* instrument frame around the viewport */}
      <div
        className="pointer-events-none fixed flex flex-col justify-between"
        style={{
          inset: "var(--frame-gap)",
          zIndex: "var(--z-frame)",
          border: "1px solid var(--color-border-light)",
        }}
      >
        {/* ── header ── */}
        <header
          className="pointer-events-auto relative flex flex-col items-center justify-between gap-2 px-3 py-2 sm:flex-row sm:px-5"
          style={{
            borderBottom: "1px solid var(--color-border-light)",
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(10px)",
          }}
        >
          <a
            href="#hero"
            className="flex items-center gap-3"
            onMouseEnter={() => setCursorMode("link")}
            onMouseLeave={resetCursor}
            style={{ cursor: "none" }}
          >
            <LogoMark />
            <span className="u-label" style={{ color: "var(--color-shade-primary)" }}>
              {profile.name} {profile.handle}
            </span>
            <span className="eq ml-2" aria-hidden="true">
              <span /><span /><span /><span /><span />
            </span>
          </a>

          <nav className="flex flex-wrap items-center justify-center">
            {nav.map((item) => (
              <NavLink key={item.label} {...item} />
            ))}
          </nav>
        </header>

        {/* ── bottom bar ── */}
        <footer
          className="pointer-events-auto relative flex items-end justify-between"
          style={{
            borderTop: "1px solid var(--color-border-light)",
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* quote */}
          <div className="hidden max-w-[330px] items-center gap-3 p-3 lg:flex">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-xs"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.06)",
              }}
              aria-hidden="true"
            >
              K
            </span>
            <p
              className="text-[11px] leading-snug"
              style={{ color: "var(--color-shade-secondary)" }}
            >
              {profile.quote}
            </p>
          </div>

          {/* tickers */}
          <div
            className="flex flex-1 justify-center px-3 py-2 sm:py-3 lg:flex-none lg:justify-start lg:border-l lg:border-r lg:px-5"
            style={{ borderColor: "var(--color-border-light)" }}
          >
            <Tickers />
          </div>

          <ScrollDown />

          {/* HUD readouts */}
          <div className="hidden p-3 xl:block">
            <HUD />
          </div>
        </footer>
      </div>
    </>
  );
}
