"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

export type MediaItem = {
  title: string;
  period?: string;
  src: string;
  type: "image" | "video";
  github?: string;
};

function MediaCard({ item, index }: { item: MediaItem; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (item.type === "video" && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (item.type === "video" && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleClick = () => {
    if (item.type === "video" && item.github) {
      window.open(item.github, "_blank");
    }
  };

  return (
    <motion.article
      className="bs-card pixel-corners scan-line group relative shrink-0 cursor-pointer overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={item.type === "video" ? { scale: 1.12 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border-light bg-card-foreground w-[320px] sm:w-[360px]">
        {item.type === "video" ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={item.src}
            muted
            playsInline
          />
        ) : (
          <Image
            src={item.src}
            alt={item.title}
            fill
            sizes="360px"
            className="object-cover opacity-80 grayscale transition duration-500 group-hover:scale-[1.025] group-hover:opacity-100 group-hover:grayscale-0"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <span className="absolute left-3 top-3 font-mono text-[10px] text-brand-primary">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="p-4">
        <h3 className="truncate text-sm font-medium text-shade-primary">{item.title}</h3>
        {item.period ? (
          <p className="mt-2 font-mono text-xs text-shade-tertiary">{item.period}</p>
        ) : null}
      </div>
    </motion.article>
  );
}

export default function ShowcaseClient({
  designVideos,
  eventMedia,
}: {
  designVideos: MediaItem[];
  eventMedia: MediaItem[];
}) {
  const [activeTab, setActiveTab] = useState<"showcase" | "events">("showcase");
  const activeItems = activeTab === "showcase" ? designVideos : eventMedia;

  return (
    <section id="showcase" className="relative w-full">
      <div className="container-app relative border-x border-border-light px-4 sm:px-6 lg:px-8">
        <div className="border-b border-border-light">
          <div className="mx-auto w-full max-w-5xl py-8 lg:py-12">
            <span className="bs-comment">{"// media archive"}</span>
            <h2 className="mt-1 text-2xl font-semibold tracking-normal text-shade-primary sm:text-3xl">
              Showcase
            </h2>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 py-10 md:py-14">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("showcase")}
              className={`filter-tab ${activeTab === "showcase" ? "active" : ""}`}
            >
              Design Showcase
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("events")}
              className={`filter-tab ${activeTab === "events" ? "active" : ""}`}
            >
              Events Attended
            </button>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="-mx-4 overflow-x-auto px-4 pb-3"
          >
            <div className="flex min-w-max gap-3 pt-5">
              {activeItems.map((item, index) => (
                <MediaCard key={`${item.src}-${item.title}`} item={item} index={index} />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 bg-border-light" />
      </div>
    </section>
  );
}
