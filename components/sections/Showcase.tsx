import { existsSync, readdirSync } from "node:fs";
import { extname, join, parse } from "node:path";
import { eventDetails, designShowcaseLinks } from "@/data/portfolio";
import ShowcaseClient, { type MediaItem } from "./ShowcaseClient";

const videoExtensions = new Set([".mp4", ".webm", ".mov", ".m4v"]);
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const eventOrder = ["startupVillage", "superdevs", "athena", "athena2", "STIndia", "100xDevs"];

function labelFromFile(fileName: string) {
  return parse(fileName).name
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function readMedia(folder: string, allowed: Set<string>, type: "image" | "video") {
  const directory = join(process.cwd(), "public", "media", folder);
  if (!existsSync(directory)) return [];

  return readdirSync(directory)
    .filter((fileName) => allowed.has(extname(fileName).toLowerCase()))
    .map((fileName) => {
      const baseName = parse(fileName).name;
      const event = eventDetails[baseName];
      const github = type === "video" ? designShowcaseLinks[baseName] : undefined;
      return {
        title: event?.title ?? labelFromFile(fileName),
        period: event?.period,
        src: `/media/${folder}/${encodeURIComponent(fileName)}`,
        type,
        github,
        sortKey: eventOrder.includes(baseName) ? eventOrder.indexOf(baseName) : 99,
      };
    })
    .sort((first, second) => first.sortKey - second.sortKey || first.title.localeCompare(second.title))
    .map((item) => ({
      title: item.title,
      period: item.period,
      src: item.src,
      type: item.type,
      github: item.github,
    })) satisfies MediaItem[];
}

export default function Showcase() {
  const designVideos = readMedia("design-showcase", videoExtensions, "video");
  const eventMedia = readMedia("events-attended", imageExtensions, "image");

  return <ShowcaseClient designVideos={designVideos} eventMedia={eventMedia} />;
}
