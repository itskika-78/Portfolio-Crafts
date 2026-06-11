"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { experience, skills, highlights } from "@/data/portfolio";
import { useCursor } from "@/providers/CursorProvider";

function ColumnHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="u-label mb-8"
      style={{ color: "var(--color-shade-tertiary)" }}
    >
      {children}
    </h3>
  );
}

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function ProfileMatrix() {
  const { setCursorMode, resetCursor } = useCursor();

  return (
    <section
      id="profile"
      className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 gap-16 px-6 py-32 sm:px-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12"
    >
      {/* ── experience ── */}
      <div>
        <ColumnHeader>Experience</ColumnHeader>
        <div className="flex flex-col gap-10">
          {experience.map((item, i) => (
            <motion.article key={`${item.company}-${item.period}`} {...fadeIn(i * 0.08)}>
              <p
                className="u-label-xs mb-2"
                style={{ color: "var(--color-brand-primary)" }}
              >
                {item.years} · {item.company}
              </p>
              <h4 className="statement mb-2 text-sm">{item.role}</h4>
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: "var(--color-shade-secondary)" }}
              >
                {item.blurb}
              </p>
            </motion.article>
          ))}
        </div>
      </div>

      {/* ── skills ── */}
      <div>
        <ColumnHeader>Skills</ColumnHeader>
        <div className="flex flex-col gap-7">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              {...fadeIn(i * 0.05)}
              className="border-b pb-6 last:border-b-0"
              style={{ borderColor: "var(--color-border-light)" }}
            >
              <h4 className="statement mb-1.5 text-sm">{skill.name}</h4>
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: "var(--color-shade-secondary)" }}
              >
                {skill.blurb}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── residencies & fellowships ── */}
      <div className="md:col-span-2 lg:col-span-1">
        <ColumnHeader>Residencies &amp; Fellowships</ColumnHeader>
        <div className="flex flex-col gap-6">
          {highlights.map((item, i) => (
            <motion.article
              key={item.title}
              {...fadeIn(i * 0.08)}
              className="group border"
              style={{ borderColor: "var(--color-border-light)" }}
              onMouseEnter={() => setCursorMode("view", "EVENT")}
              onMouseLeave={resetCursor}
            >
              <div className="relative h-36 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 92vw, 30vw"
                  className="object-cover opacity-60 grayscale transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-90 group-hover:grayscale-0"
                />
              </div>
              <div className="p-4">
                <h4 className="statement text-[13px]">{item.title}</h4>
                <p
                  className="u-label-xs mt-1.5"
                  style={{ color: "var(--color-shade-mute)" }}
                >
                  {item.period}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
