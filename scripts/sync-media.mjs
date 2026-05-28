import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";

const projectRoot = resolve(process.cwd());
const sourceRoot = resolve(projectRoot, "..");

const folders = [
  ["Design Showcase", "design-showcase"],
  ["Events Attended", "events-attended"],
];

const allowed = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".mp4",
  ".webm",
  ".mov",
  ".m4v",
]);

for (const [sourceName, publicName] of folders) {
  const sourceDir = join(sourceRoot, sourceName);
  const targetDir = join(projectRoot, "public", "media", publicName);
  mkdirSync(targetDir, { recursive: true });

  if (!existsSync(sourceDir)) continue;

  for (const entry of readdirSync(sourceDir)) {
    const sourcePath = join(sourceDir, entry);
    if (!statSync(sourcePath).isFile()) continue;
    if (!allowed.has(extname(entry).toLowerCase())) continue;
    copyFileSync(sourcePath, join(targetDir, basename(entry)));
  }
}
