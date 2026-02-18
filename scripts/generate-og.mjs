import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import sharp from "sharp";

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "src", "content", "blog");
const PUBLIC_DIR = path.join(ROOT, "public");

const OG_SIZE = { width: 1200, height: 630 };
const TW_SIZE = { width: 1200, height: 800 };

function cleanLeadingSlash(p) {
  return p.startsWith("/") ? p.slice(1) : p;
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function generateOne({ slug, posterUrl, bgColor }) {
  const posterPath = path.join(PUBLIC_DIR, cleanLeadingSlash(posterUrl));
  if (!(await fileExists(posterPath))) {
    throw new Error(`Missing poster for ${slug}: ${posterPath}`);
  }

  async function render(size, outPath) {
    const img = sharp(posterPath).resize(size.width, size.height, {
      fit: "contain",
      background: bgColor || "#0b0d10",
    });

    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await img.png().toFile(outPath);
  }

  const outDir = path.join(PUBLIC_DIR, "blog", slug);
  await render(OG_SIZE, path.join(outDir, "og.png"));
  await render(TW_SIZE, path.join(outDir, "twitter.png"));
}

async function main() {
  const entries = await fs.readdir(POSTS_DIR);
  const mdFiles = entries.filter((f) => f.endsWith(".md"));

  for (const file of mdFiles) {
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(POSTS_DIR, file);
    const raw = await fs.readFile(fullPath, "utf8");
    const { data } = matter(raw);
    const posterUrl = data?.posterImage?.url;
    const bgColor = data?.posterImage?.bgColor;
    if (!posterUrl) continue;
    await generateOne({ slug, posterUrl, bgColor });
  }
}

await main();
