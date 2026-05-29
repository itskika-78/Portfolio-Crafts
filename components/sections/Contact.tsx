"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { profile } from "@/data/portfolio";
import { useCursor } from "@/providers/CursorProvider";

const HEX_CHARS = "0123456789ABCDEF!@#$%^&*<>/\\[]{}=+~";

function GlitchText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState(text);
  const [glitching, setGlitching] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const frameRef = useRef(0);

  const startGlitch = useCallback(() => {
    setGlitching(true);
    frameRef.current = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      frameRef.current++;

      if (frameRef.current > 12) {
        // Settle on real text
        setDisplayed(text);
        setGlitching(false);
        clearInterval(intervalRef.current);
        return;
      }

      // Progressively resolve chars from left
      const resolved = Math.floor((frameRef.current / 12) * text.length);
      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (char === " " || char === "@" || char === "." || i < resolved)
              return char;
            return HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
          })
          .join("")
      );
    }, 45);
  }, [text]);

  const stopGlitch = useCallback(() => {
    clearInterval(intervalRef.current);
    setDisplayed(text);
    setGlitching(false);
  }, [text]);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <span
      onMouseEnter={startGlitch}
      onMouseLeave={stopGlitch}
      style={{
        fontFamily: "var(--font-fira-code), monospace",
        letterSpacing: glitching ? "0.01em" : "0",
        transition: "letter-spacing 0.1s",
      }}
    >
      {displayed}
    </span>
  );
}

function SvgDrawLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const { setCursorMode, resetCursor } = useCursor();
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex h-12 w-12 items-center justify-center rounded-full"
      style={{
        border: "1px solid rgba(0,0,0,0.1)",
        color: "rgba(0,0,0,0.6)",
        cursor: "none",
      }}
      onMouseEnter={() => {
        setHovered(true);
        setCursorMode("link");
      }}
      onMouseLeave={() => {
        setHovered(false);
        resetCursor();
      }}
    >
      {/* SVG draw circle on hover */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        <motion.circle
          cx="50%"
          cy="50%"
          r="22"
          fill="none"
          stroke="#0a0a0f"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={hovered ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <motion.span
        animate={hovered ? { color: "#0a0a0f" } : { color: "rgba(0,0,0,0.6)" }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </a>
  );
}

export default function Contact() {
  const { setCursorMode, resetCursor } = useCursor();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "end end"],
  });

  const titleScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-32"
      style={{ background: "#f5f5f0" }}
    >


      <div className="container-app px-6 lg:px-8">
        {/* Big CTA */}
        <motion.div
          className="flex flex-col items-start gap-8"
          style={{ scale: titleScale, opacity: titleOpacity }}
        >
          <span className="font-mono text-xs font-semibold" style={{ color: "rgba(0,0,0,0.6)" }}>{"// initiate_contact()"}</span>

          <div className="overflow-hidden">
            <motion.h2
              className="font-sans font-semibold leading-none"
              style={{
                fontSize: "clamp(3rem, 9vw, 9rem)",
                letterSpacing: "-0.05em",
                color: "#0a0a0f",
              }}
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            >
              LET'S BUILD
            </motion.h2>
          </div>

          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            >
              <a
                href={`mailto:${profile.email}`}
                className="font-sans font-semibold"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
                  letterSpacing: "-0.03em",
                  color: "#0a0a0f",
                  textDecoration: "none",
                  cursor: "none",
                }}
                onMouseEnter={() => setCursorMode("link", "MAIL")}
                onMouseLeave={resetCursor}
              >
                <GlitchText text={profile.email} />
              </a>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            className="h-px w-full"
            style={{ background: "rgba(0,0,0,0.1)" }}
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Bottom row */}
          <div className="flex w-full flex-wrap items-center justify-between gap-6">
            <div className="flex flex-col gap-1">
              <p
                className="font-sans font-semibold"
                style={{ color: "#0a0a0f" }}
              >
                {profile.name}
              </p>
              <p
                className="font-mono text-sm"
                style={{ color: "rgba(0,0,0,0.8)" }}
              >
                {profile.ageRole}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Action buttons */}
              <a
                href={`mailto:${profile.email}`}
                className="btn-primary"
                style={{ cursor: "none", background: "#0a0a0f", color: "#f5f5f0", border: "none" }}
                onMouseEnter={() => setCursorMode("link", "SEND")}
                onMouseLeave={resetCursor}
              >
                Send Email
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M1 11L11 1M11 1H4M11 1v7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              {/* Social links with SVG draw */}
              <SvgDrawLink href={profile.github || "#"}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </SvgDrawLink>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
