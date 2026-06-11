import { existsSync, readdirSync } from "node:fs";
import { extname, join, parse } from "node:path";
import { designShowcaseLinks } from "@/data/portfolio";
import CraftMenuClient, { type MediaItem } from "./CraftMenuClient";

const videoExtensions = new Set([".mp4", ".webm", ".mov", ".m4v"]);
const videoOrder = [
  "dynamicIsland",
  "Ringer",
  "Gooey",
  "gooey",
  "smoothness",
  "interfaceCraft",
  "NavBar",
];

function readDesignVideos(): MediaItem[] {
  const directory = join(process.cwd(), "public", "media", "design-showcase");
  if (!existsSync(directory)) return [];

  return readdirSync(directory)
    .filter((f) => videoExtensions.has(extname(f).toLowerCase()))
    .map((fileName) => {
      const baseName = parse(fileName).name;
      // Check both exact case and lowercase for github link
      const github =
        designShowcaseLinks[baseName] ??
        designShowcaseLinks[baseName.toLowerCase()] ??
        designShowcaseLinks[baseName.charAt(0).toUpperCase() + baseName.slice(1)];

      const title = baseName
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .replace(/[-_]+/g, " ");

      const sortKey =
        videoOrder.indexOf(baseName) >= 0
          ? videoOrder.indexOf(baseName)
          : 99;

      return { title, src: `/media/design-showcase/${encodeURIComponent(fileName)}`, type: "video" as const, github, sortKey };
    })
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ title, src, type, github }) => ({ title, src, type, github }));
}

export default function CraftMenuServer() {
  const videos = readDesignVideos();
  return <CraftMenuClient videos={videos} />;
}
