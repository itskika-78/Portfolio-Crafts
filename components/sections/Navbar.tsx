"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useCursor } from "@/providers/CursorProvider";
import { profile } from "@/data/portfolio";
import MenuOverlay from "@/components/MenuOverlay";

function GlitchLogo() {
  const chars = "@kika.skr";
  const [glitching, setGlitching] = useState(false);
  const glitchChars = "!<>-_\\/[]{}—=+*^?#";

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="font-mono text-sm font-medium"
      style={{
        color: "var(--color-brand-primary)",
        textShadow: "0 0 8px rgba(0,255,255,0.6)",
        letterSpacing: "0.02em",
      }}
    >
      {glitching
        ? chars
            .split("")
            .map((c, i) =>
              Math.random() > 0.6
                ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
                : c
            )
            .join("")
        : chars}
    </span>
  );
}

function MagneticMenuButton({ onClick }: { onClick: () => void }) {
  const { setCursorMode, resetCursor } = useCursor();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    x.set(dx * 0.28);
    y.set(dy * 0.28);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    resetCursor();
  };

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setCursorMode("link")}
      style={{
        x: springX,
        y: springY,
        cursor: "none",
      }}
      className="relative flex items-center gap-2 rounded-full px-4 py-2"
      aria-label="Open navigation menu"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Background pill */}
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
        whileHover={{ background: "rgba(0,255,255,0.06)", borderColor: "rgba(0,255,255,0.25)" }}
        transition={{ duration: 0.2 }}
      />

      {/* Hamburger lines */}
      <span className="relative flex flex-col gap-[5px]">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block rounded-full"
            style={{
              height: "1.5px",
              background: "var(--color-shade-primary)",
              width: i === 1 ? "16px" : "20px",
            }}
          />
        ))}
      </span>

      <span
        className="relative font-mono text-xs"
        style={{ color: "var(--color-shade-secondary)" }}
      >
        MENU
      </span>
    </motion.button>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setCursorMode, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // Lock body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    }
    return () => { 
      document.body.style.overflow = ""; 
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0"
        style={{ zIndex: "var(--z-nav)" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={{
            backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
            background: scrolled ? "rgba(5,5,8,0.75)" : "transparent",
            borderBottom: scrolled
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid transparent",
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between px-6 py-4 lg:px-8"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
            style={{ cursor: "none" }}
            onMouseEnter={() => setCursorMode("link")}
            onMouseLeave={resetCursor}
          >
            <GlitchLogo />
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <motion.a
              href={`mailto:${profile.email}`}
              className="hidden items-center gap-2 font-mono text-xs md:flex"
              style={{ color: "var(--color-shade-tertiary)", cursor: "none" }}
              whileHover={{ color: "var(--color-shade-primary)" }}
              transition={{ duration: 0.15 }}
              onMouseEnter={() => setCursorMode("link")}
              onMouseLeave={resetCursor}
            >
              <span
                className="h-[6px] w-[6px] rounded-full"
                style={{
                  background: "var(--color-brand-primary)",
                  boxShadow: "0 0 6px rgba(0,255,255,0.8)",
                }}
              />
              Available for work
            </motion.a>

            <MagneticMenuButton onClick={() => setMenuOpen(true)} />
          </div>
        </motion.div>
      </motion.header>

      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
