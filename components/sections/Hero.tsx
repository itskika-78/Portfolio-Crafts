"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { profile } from "@/data/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard?.writeText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1300);
  };

  return (
    <button type="button" onClick={copyEmail} className="btn-ghost">
      <span>{copied ? "Copied" : profile.email}</span>
      <svg width="13" height="13" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="6" y="6" width="9" height="9" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3 12V3h9" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </button>
  );
}

export default function Hero() {
  return (
    <section id="profile" className="relative w-full pt-[72px]">
      <div className="container-app relative min-h-[calc(100dvh-72px)] border-x border-border-light px-4 sm:px-6 lg:px-8">
        <div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-brand-primary" />
        <div className="absolute right-0 top-0 h-2 w-2 border-r border-t border-brand-primary" />
        <div className="mx-auto flex min-h-[calc(100dvh-72px)] w-full max-w-5xl flex-col justify-center py-12 md:py-16">
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.1 }}
            className="flex flex-col gap-8"
          >
            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-4 border-b border-border-light pb-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-shade-tertiary">
                <span>Portfolio</span>
                <span>/</span>
                <span className="text-shade-secondary">{profile.handle}</span>
              </div>
              <CopyEmailButton />
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <p className="bs-comment">{"// builder profile loaded"}</p>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-normal text-shade-primary sm:text-6xl lg:text-7xl">
                # {profile.name}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-shade-secondary">
                {profile.bio}
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
              <article className="bs-card pixel-corners always-on scan-line p-5 md:p-6">
                <div className="flex flex-col gap-5">
                  <span className="bs-comment">{"// identity"}</span>
                  <div>
                    <p className="font-mono text-sm text-shade-tertiary">{profile.ageRole}</p>
                    <h2 className="mt-2 text-3xl font-semibold text-neon sm:text-4xl">
                      {profile.role}
                    </h2>
                  </div>
                  <a href={`mailto:${profile.email}`} className="btn-primary self-start">
                    {profile.email}
                  </a>
                  {profile.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost self-start"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  )}
                </div>
              </article>

              <aside className="grid grid-cols-2 gap-4 lg:grid-cols-1">
                {[
                  ["Role", profile.role],
                  ["Focus", profile.ageRole],
                  ["Contact", profile.email],
                ].map(([label, value]) => (
                  <div key={label} className="bs-card pixel-corners p-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-shade-mute">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-medium text-shade-primary">{value}</p>
                  </div>
                ))}
              </aside>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 bg-border-light" />
      </div>
    </section>
  );
}
