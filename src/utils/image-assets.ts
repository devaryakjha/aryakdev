import type { ImageMetadata } from "astro";

import logo from "../assets/images/logo.png";

const projectImageAssets = import.meta.glob("../assets/images/projects/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, ImageMetadata>;

const projectImageAssetsByName = new Map(
  Object.entries(projectImageAssets).map(([path, asset]) => [path.split("/").pop() ?? "", asset]),
);

const blogPosterAssets = import.meta.glob("../assets/blogs/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, ImageMetadata>;

const blogPosterAssetsByName = new Map(
  Object.entries(blogPosterAssets).map(([path, asset]) => [path.split("/").pop() ?? "", asset]),
);

function getFileName(path: string) {
  return path.split("/").pop() ?? "";
}

export { logo };

export function getProjectImageAsset(imagePath: string) {
  const asset = projectImageAssetsByName.get(getFileName(imagePath));

  if (!asset) {
    throw new Error(`Missing optimized project image for: ${imagePath}`);
  }

  return asset;
}

export function getBlogPosterAsset(imagePath: string) {
  const asset = blogPosterAssetsByName.get(getFileName(imagePath));

  if (!asset) {
    throw new Error(`Missing optimized blog poster image for: ${imagePath}`);
  }

  return asset;
}
