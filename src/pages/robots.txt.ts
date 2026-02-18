export const prerender = true;

import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const base = import.meta.env.SITE ?? "https://aryak.dev";
  const body = `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

