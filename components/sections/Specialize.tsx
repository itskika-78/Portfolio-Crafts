"use client";

import { motion } from "framer-motion";
import { profile, heroTags } from "@/data/portfolio";
import PlusButton from "@/components/ui/PlusButton";
import MotionText from "@/components/ui/MotionText";

function InlineIcon({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="mx-1 inline-flex h-[1.05em] w-[1.05em] translate-y-[0.12em] items-center justify-center rounded-[5px] align-baseline"
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.16)",
        color: "var(--color-brand-primary)",
        fontSize: "0.62em",
      }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

export default function Specialize() {
  return (
    <section
      id="spec"
      className="relative z-10 flex min-h-[85vh] flex-col items-center justify-center px-6 py-36 text-center"
    >
      {/* tag row */}
      <motion.ul
        className="tag-row mb-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {heroTags.map((tag, i) => (
          <li key={tag} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden="true" style={{ opacity: 0.4 }}>/</span>}
            {tag}
          </li>
        ))}
      </motion.ul>

      <MotionText
        as="h2"
        className="statement mx-auto max-w-[880px]"
        // eslint-disable-next-line react/no-children-prop
      >
        I specialize in
        <InlineIcon>◎</InlineIcon>
        full-stack web apps, onchain
        <InlineIcon>▣</InlineIcon>
        programs and tooling, and immersive
        <InlineIcon>▶</InlineIcon>
        creative-coded experiences
      </MotionText>

      <motion.p
        className="mx-auto mt-8 max-w-[480px] text-sm leading-relaxed"
        style={{ color: "var(--color-shade-secondary)" }}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        I&apos;ve shipped production code for web3 gaming platforms, designed
        creative-coding animations that push the browser&apos;s limits, and
        earned my place in hacker residencies and fellowships across the
        Solana ecosystem. Currently open to ambitious projects and teams.
      </motion.p>

      <motion.div
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <PlusButton href={`mailto:${profile.email}`} cursorLabel="SAY HI">
          WRITE TO MAIL
        </PlusButton>
        <PlusButton href={profile.twitter} external cursorLabel="FOLLOW">
          FOLLOW ON X
        </PlusButton>
      </motion.div>
    </section>
  );
}
