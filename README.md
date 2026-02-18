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

`bun run build` also generates per-post OpenGraph/Twitter images into:

- `public/blog/<slug>/og.png`
- `public/blog/<slug>/twitter.png`

## Content

- Blog posts: `src/content/blog/*.md`
- Static assets: `public/`

## Cloudflare Pages

Suggested settings:

- Build command: `bun install && bun run build`
- Output directory: `dist`
- Node version: `20`

Redirects live in `public/_redirects`.

Deploy with Wrangler:

```bash
make deploy PROJECT=<pages-project-name>
# optional preview branch deploy
make deploy PROJECT=<pages-project-name> BRANCH=<branch-name>
```
