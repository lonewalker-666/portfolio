import { existsSync } from "node:fs";
import { join } from "node:path";

const AI_DIR = join(process.cwd(), "public", "story", "ai");
const EXTENSIONS = ["webp", "png", "jpg", "jpeg"];

export function aiAsset(name: string): string | null {
  for (const ext of EXTENSIONS) {
    if (existsSync(join(AI_DIR, `${name}.${ext}`))) return `/story/ai/${name}.${ext}`;
  }
  return null;
}

export const CUTOUTS = {
  blazer: {
    src: aiAsset("cutout-blazer") ?? "/story/characters/kishore-blazer-cutout.webp",
    alt: "Illustrated Kishore in a beige blazer over a black shirt, smiling at the camera.",
  },
  navy: {
    src: aiAsset("cutout-navy") ?? "/story/characters/kishore-navy-cutout.webp",
    alt: "Illustrated Kishore in a navy shirt with rolled sleeves, relaxed and looking at the camera.",
  },
};
