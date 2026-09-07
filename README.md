# aryak.dev (Astro)

Ultra-light, static portfolio + blog built with Astro.

## Local dev

```bash
bun install
bun run dev
```

Astro runs on the default port it prints in the terminal.

## Build

```bash
bun run build
bun run preview
```

`bun run build` also generates matching 1200×630 social previews with the site's
monogram, portrait, and typography:

- `public/og.png` and `public/blog/og.png`
- `public/projects/<slug>/og.png`
- `public/blog/<slug>/og.png` (also served at the existing `twitter.png` URL)
- `public/apple-touch-icon.png`

Titles come from project data and blog frontmatter (`shortTitle` or `title`).
Run `bun scripts/check-site.mjs` after building to check routes, assets, and metadata.

## Content

- Blog posts: `src/content/blog/*.md`
- Static assets: `public/`

## Cloudflare Pages

Suggested settings:

- Build command: `bun install && bun run build`
- Output directory: `dist`
- Node version: `26.3.0` (Astro requires Node 22.12 or newer)

Redirects live in `public/_redirects`.

Deploy with Wrangler:

```bash
make deploy PROJECT=<pages-project-name>
# optional preview branch deploy
make deploy PROJECT=<pages-project-name> BRANCH=<branch-name>
```
