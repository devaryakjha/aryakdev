export const prerender = true;

import type { APIRoute } from "astro";
import { getAllPosts } from "../utils/blog";

function xmlEscape(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const GET: APIRoute = () => {
  const base = (import.meta.env.SITE ?? "https://aryak.dev").replace(/\/$/, "");
  const posts = getAllPosts();
  const now = new Date().toISOString();

  const urls = [
    { loc: `${base}/`, lastmod: now },
    { loc: `${base}/blog`, lastmod: now },
    ...posts.map((p) => ({
      loc: `${base}/blog/${p.slug}`,
      lastmod: new Date(p.frontmatter.date).toISOString(),
    })),
  ];

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls
      .map(
        (u) =>
          `<url><loc>${xmlEscape(u.loc)}</loc><lastmod>${xmlEscape(
            u.lastmod,
          )}</lastmod></url>`,
      )
      .join("") +
    `</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};

