"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/portfolio";
import { useCursor } from "@/providers/CursorProvider";

export default function FooterWordmark() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setCursorMode, resetCursor } = useCursor();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  /* the monument rises from below the fold as the page bottoms out */
  const y = useTransform(scrollYProgress, [0.1, 1], ["68%", "0%"]);
  const rotateX = useTransform(scrollYProgress, [0.1, 1], [28, 0]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.45], [0, 1]);

  const year = new Date().getFullYear();

  return (
    <section
      ref={sectionRef}
      id="footer"
      className="relative z-10 flex min-h-[90vh] flex-col items-center justify-end overflow-hidden pb-24"
    >
      {/* closing links */}
      <div className="relative z-10 mb-16 flex flex-col items-center gap-6 px-6 text-center">
        <p
          className="u-label"
          style={{ color: "var(--color-shade-tertiary)" }}
        >
          AVAILABLE FOR OPPORTUNITIES — {year}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {[
            { label: "MAIL", href: `mailto:${profile.email}` },
            { label: "GITHUB", href: profile.github },
            { label: "X / TWITTER", href: profile.twitter },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="frame-link"
              onMouseEnter={() => setCursorMode("link")}
              onMouseLeave={resetCursor}
              style={{ cursor: "none" }}
            >
              {link.label}
              <sup>↗</sup>
            </a>
          ))}
        </div>
        <p
          className="u-label-xs"
          style={{ color: "var(--color-shade-mute)" }}
        >
          DESIGNED &amp; BUILT BY {profile.name.toUpperCase()} — NEXT.JS · FRAMER MOTION
        </p>
      </div>

      {/* giant extruded monument */}
      <div
        className="pointer-events-none w-full overflow-hidden"
        style={{ perspective: "900px" }}
        aria-hidden="true"
      >
        <motion.div
          style={{ y, rotateX, opacity, transformOrigin: "center bottom" }}
          className="flex justify-center"
        >
          <span
            className="wordmark-3d block text-center"
            style={{ fontSize: "clamp(7rem, 24vw, 24rem)" }}
          >
            KIKA
          </span>
        </motion.div>
      </div>
    </section>
  );
}
