"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

const navLinks = [
  { label: "Profile", href: "#profile", symbol: "#" },
  { label: "Experience", href: "#experience", symbol: "//" },
  { label: "Projects", href: "#projects", symbol: "[]" },
  { label: "Showcase", href: "#showcase", symbol: "<>" },
  { label: "Companies", href: "#companies", symbol: "{}" },
];

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Home">
      <div className="grid h-[22px] w-[22px] grid-cols-2 gap-[2px]">
        {[0, 1, 2, 3].map((item) => (
          <motion.span
            key={item}
            className="bg-brand-primary"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: item * 0.06, duration: 0.24 }}
          />
        ))}
      </div>
      <span className="font-mono text-[15px] font-medium leading-none text-shade-primary">
        {profile.handle}
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className="bs-nav transition-shadow duration-200"
        style={{
          boxShadow: scrolled
            ? "0 1px 0 rgba(255,255,255,0.06), 0 8px 24px rgba(0,0,0,0.42)"
            : "none",
        }}
      >
        <div className="container-app flex items-center justify-between px-4 py-4 lg:px-5">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="hidden items-center lg:flex" aria-label="Main navigation">
              {navLinks.map((link) => {
                const id = link.href.slice(1);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link ${activeSection === id ? "active" : ""}`}
                  >
                    <span className="text-[10px] opacity-60">{link.symbol}</span>
                    {link.label}
                  </Link>
                );
              })}
              <button
                type="button"
                className="nav-link"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-craft-menu"))
                }
                aria-label="Open Craft menu"
              >
                <span className="text-[10px] opacity-60">◇</span>
                Craft
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <a href={`mailto:${profile.email}`} className="btn-primary hidden md:inline-flex">
              Email
            </a>
            <button
              type="button"
              className="btn-ghost p-2.5 lg:hidden"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <motion.svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                animate={mobileOpen ? "open" : "closed"}
              >
                <motion.path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  variants={{
                    closed: { d: "M2 4.5h14" },
                    open: { d: "M4 4.5l10 9" },
                  }}
                />
                <motion.path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  variants={{
                    closed: { d: "M2 9h14", opacity: 1 },
                    open: { d: "M9 9h0", opacity: 0 },
                  }}
                />
                <motion.path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  variants={{
                    closed: { d: "M2 13.5h14" },
                    open: { d: "M4 13.5l10-9" },
                  }}
                />
              </motion.svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-border-light bg-background/95 backdrop-blur-xl lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="container-app flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link w-full py-3"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-[10px] opacity-60">{link.symbol}</span>
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                className="nav-link w-full py-3 text-left"
                onClick={() => {
                  setMobileOpen(false);
                  window.dispatchEvent(new CustomEvent("open-craft-menu"));
                }}
              >
                <span className="text-[10px] opacity-60">◇</span>
                Craft
              </button>
              <a
                href={`mailto:${profile.email}`}
                className="btn-primary mt-3 w-full"
                onClick={() => setMobileOpen(false)}
              >
                Email
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
