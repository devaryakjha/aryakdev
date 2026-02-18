import { defineConfig } from "astro/config";
import astroExpressiveCode from "astro-expressive-code";

export default defineConfig({
  site: "https://aryak.dev",
  trailingSlash: "never",
  integrations: [
    astroExpressiveCode({
      themes: ["github-dark", "github-light"],
      frames: {
        showCopyToClipboardButton: true,
      },
    }),
  ],
});
