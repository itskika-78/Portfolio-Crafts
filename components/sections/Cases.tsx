"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { cases } from "@/data/portfolio";
import { useCursor } from "@/providers/CursorProvider";
import ImageMask from "@/components/ui/ImageMask";
import PlusButton from "@/components/ui/PlusButton";

type CaseItem = (typeof cases)[number];

function CaseMedia({ item }: { item: CaseItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <ImageMask className="w-full overflow-hidden">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {item.media.type === "image" ? (
          <Image
            src={item.media.src}
            alt={item.title}
            fill
            sizes="(max-width: 1024px) 92vw, 56vw"
            className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
          />
        ) : (
          <video
            ref={videoRef}
            src={item.media.src}
            muted
            loop
            playsInline
            className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
          />
        )}
      </div>
    </ImageMask>
  );
}

function CaseRow({ item, index }: { item: CaseItem; index: number }) {
  const { setCursorMode, resetCursor } = useCursor();
  const flipped = index % 2 === 1;

  const openCraft = (e: React.MouseEvent) => {
    if (item.link === "#craft") {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("open-craft-menu"));
    }
  };

  return (
    <motion.article
      className={`flex flex-col items-center gap-10 lg:items-end lg:gap-14 ${
        flipped ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="w-full lg:w-[58%]"
        onMouseEnter={() => setCursorMode("view", "VIEW")}
        onMouseLeave={resetCursor}
        style={{ cursor: "none" }}
        onClick={(e) => {
          if (item.link === "#craft") {
            openCraft(e);
          } else {
            window.open(item.link, "_blank", "noopener,noreferrer");
          }
        }}
      >
        <CaseMedia item={item} />
      </div>

      <div className="flex w-full max-w-[420px] flex-col items-start gap-5 lg:w-[36%] lg:pb-4">
        <ul className="tag-row flex flex-wrap gap-x-2 gap-y-1 text-[11px]">
          {item.tags.map((tag, i) => (
            <li key={tag} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true" style={{ opacity: 0.4 }}>/</span>}
              {tag}
            </li>
          ))}
        </ul>

        <h3 className="statement text-xl sm:text-2xl">{item.title}</h3>

        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--color-shade-secondary)" }}
        >
          {item.description}
        </p>

        {item.link === "#craft" ? (
          <PlusButton
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-craft-menu"))
            }
            cursorLabel="OPEN"
          >
            {item.linkLabel}
          </PlusButton>
        ) : (
          <PlusButton href={item.link} external cursorLabel="OPEN">
            {item.linkLabel}
          </PlusButton>
        )}
      </div>
    </motion.article>
  );
}

export default function Cases() {
  return (
    <section id="cases" className="relative z-10 px-6 py-28 sm:px-10 lg:px-20">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-32 lg:gap-44">
        {cases.map((item, i) => (
          <CaseRow key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
