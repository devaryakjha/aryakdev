import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// Run after bun run build.
const root = path.resolve('dist');
const pages = fs.readdirSync(root, { recursive: true }).filter(p => p.endsWith('.html'));
assert.equal(pages.length, 11, 'Home, six projects, writing, two posts, and 404');
assert.ok(!fs.existsSync(path.join(root, 'explore')), 'No preview routes');
const socialImages = new Set();
for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${page}: one heading`);
  assert.ok(html.includes('rel="canonical"'), `${page}: canonical URL`);
  const og = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  const twitter = html.match(/name="twitter:image" content="([^"]+)"/)?.[1];
  assert.ok(og?.startsWith('https://aryak.dev/'), `${page}: absolute social image URL`);
  assert.equal(twitter, og, `${page}: consistent Twitter preview`);
  assert.ok(html.includes('property="og:image:alt"') && html.includes('name="twitter:image:alt"'), `${page}: image descriptions`);
  socialImages.add(path.join(root, new URL(og).pathname));
  assert.ok(!/noindex|\/explore\/|Compare designs|theme\.js/.test(html), `${page}: final presentation`);
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const target = path.join(root, url);
    assert.ok(fs.existsSync(target) || fs.existsSync(path.join(target, 'index.html')), `${page}: missing ${url}`);
  }
}
for (const image of socialImages) {
  const { width, height, format } = await sharp(image).metadata();
  assert.deepEqual([width, height, format], [1200, 630, 'png'], `${image}: social image dimensions`);
}
const icon = await sharp(path.join(root, 'apple-touch-icon.png')).metadata();
assert.deepEqual([icon.width, icon.height], [180, 180], 'Home-screen icon dimensions');
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.ok(!home.includes('<script'), 'No homepage JavaScript');
assert.equal(new Set([...home.matchAll(/data-artwork="([^"]+)"/g)].map(m => m[1])).size, 6, 'Six distinct project artworks');
const sitemap = fs.readFileSync(path.join(root, 'sitemap-0.xml'), 'utf8');
assert.ok(!sitemap.includes('/explore/'), 'No preview URLs in sitemap');
console.log(`Checked ${pages.length} pages, local links/assets, canonical URLs, sitemap, social previews, and six project artworks.`);
