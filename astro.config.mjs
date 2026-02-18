import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import astroExpressiveCode from "astro-expressive-code";

export default defineConfig({
  site: "https://aryak.dev",
  trailingSlash: "never",
  integrations: [
    sitemap(),
    astroExpressiveCode({
      themes: ["github-dark", "github-light"],
      frames: {
        showCopyToClipboardButton: true,
      },
    }),
  ],
});
