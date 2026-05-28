"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 13 13 3M13 3H6M13 3v7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function Projects() {
  return (
    <section id="projects" className="relative w-full">
      <div className="container-app relative border-x border-border-light px-4 sm:px-6 lg:px-8">
        <div className="border-b border-border-light">
          <div className="mx-auto w-full max-w-5xl py-8 lg:py-12">
            <span className="bs-comment">{"// Projects"}</span>
            <h2 className="mt-1 text-2xl font-semibold tracking-normal text-shade-primary sm:text-3xl">
              Projects
            </h2>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 py-10 md:py-14">
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project, index) => {
              const projectSlug = generateSlug(project.title);
              return (
              <motion.article
                key={project.title}
                id={projectSlug}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.52,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bs-card pixel-corners scan-line group overflow-hidden"
              >
                <div className="relative aspect-[16/10] border-b border-border-light bg-card-foreground">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover opacity-75 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 font-mono text-[11px] text-brand-primary">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>Selected work</span>
                  </div>
                </div>

                <div className="flex min-h-[230px] flex-col justify-between gap-6 p-5">
                  <div>
                  <div className="flex items-start justify-between gap-4">
                      <a href={`#${projectSlug}`} className="group/link">
                        <h3 className="text-xl font-semibold text-shade-primary hover:text-brand-primary transition-colors">
                          {project.title}
                        </h3>
                      </a>
                      <span className="mt-1 text-shade-tertiary transition-colors group-hover:text-brand-primary">
                        <ArrowIcon />
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-shade-secondary">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-border-light px-2 py-1 font-mono text-[10px] text-shade-tertiary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 border border-border-light px-3 py-2 font-mono text-xs text-brand-primary transition-all hover:bg-brand-primary hover:text-background"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      View on GitHub
                    </a>
                  )}
                </div>
              </motion.article>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 bg-border-light" />
      </div>
    </section>
  );
}
