"use client";

import { motion } from "framer-motion";
import { companies } from "@/data/portfolio";
import { useCursor } from "@/providers/CursorProvider";
import MotionText from "@/components/ui/MotionText";

/* Wordmark row of companies contributed to, with hover blurbs */
export default function Companies() {
  const { setCursorMode, resetCursor } = useCursor();

  return (
    <section className="relative z-10 px-6 pb-10 pt-24 text-center">
      <MotionText as="h2" className="statement mx-auto mb-4 max-w-[760px]">
        Teams and platforms I&apos;ve shipped for
      </MotionText>

      <motion.ul
        className="tag-row mb-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {["Web3 gaming", "Game engines", "Cloud gaming", "Ecosystem infra"].map(
          (tag, i) => (
            <li key={tag} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden="true" style={{ opacity: 0.4 }}>/</span>}
              {tag}
            </li>
          )
        )}
      </motion.ul>

      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {companies.map((c, i) => (
          <motion.div
            key={c.name}
            className="group relative"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.55,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            onMouseEnter={() => setCursorMode("view", "ABOUT")}
            onMouseLeave={resetCursor}
            style={{ cursor: "none" }}
          >
            <span
              className="font-sans text-xl font-semibold uppercase tracking-wide transition-colors duration-200 sm:text-2xl"
              style={{ color: "var(--color-shade-tertiary)" }}
            >
              <span className="transition-colors duration-200 group-hover:text-white">
                {c.name}
              </span>
            </span>

            {/* hover blurb */}
            <span
              className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-60 -translate-x-1/2 border p-3 text-left text-[11px] leading-snug opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{
                background: "rgba(0,0,0,0.92)",
                borderColor: "var(--color-border-light)",
                color: "var(--color-shade-secondary)",
              }}
            >
              {c.description}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
