"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="relative w-full"
      style={{
        background: "var(--color-background)",
        borderTop: "1px solid var(--color-border-light)",
      }}
    >
      <div className="container-app px-6 py-10 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Left */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span
                className="font-mono text-sm"
                style={{ color: "var(--color-brand-primary)" }}
              >
                {profile.handle}
              </span>
            </div>
            <p
              className="font-mono text-xs"
              style={{ color: "var(--color-shade-mute)" }}
            >
              © {year} — Built with Next.js & Framer Motion
            </p>
          </div>

          {/* Status indicator */}
          <motion.div
            className="flex items-center gap-2"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span
              className="h-[6px] w-[6px] rounded-full"
              style={{
                background: "var(--color-brand-primary)",
                boxShadow: "0 0 6px rgba(0,255,255,0.8)",
              }}
            />
            <span
              className="font-mono text-xs"
              style={{ color: "var(--color-shade-mute)" }}
            >
              Available for opportunities
            </span>
          </motion.div>

          {/* Right links */}
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-xs"
              style={{ color: "var(--color-shade-tertiary)" }}
            >
              {profile.email}
            </a>
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs"
                style={{ color: "var(--color-shade-tertiary)" }}
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
