export type BlogFrontmatter = {
  ogTitle?: string;
  excerpt?: string;
  title: string;
  shortTitle?: string;
  date: string;
  posterImage?: { url: string; bgColor?: string };
  tags?: string;
  author?: { name?: string; bio?: string; picture?: string };
  ogImage?: { url: string };
};

type MarkdownModule = {
  frontmatter: BlogFrontmatter;
  Content: any;
};

const modules = import.meta.glob("../content/blog/*.md", {
  eager: true,
}) as Record<string, MarkdownModule>;

export type BlogPost = {
  slug: string;
  frontmatter: BlogFrontmatter;
  Content: MarkdownModule["Content"];
};

function toSlug(path: string) {
  const last = path.split("/").pop() ?? "";
  return last.replace(/\.md$/, "");
}

const ALL_POSTS: BlogPost[] = Object.entries(modules)
  .map(([path, mod]) => ({
    slug: toSlug(path),
    frontmatter: mod.frontmatter,
    Content: mod.Content,
  }))
  .filter((p) => Boolean(p.slug))
  .sort((a, b) => {
    const ad = +new Date(a.frontmatter.date);
    const bd = +new Date(b.frontmatter.date);
    return bd - ad;
  });

export function getAllPosts() {
  return ALL_POSTS;
}

export function getPostBySlug(slug: string) {
  return ALL_POSTS.find((p) => p.slug === slug) ?? null;
}

export function splitTags(tags?: string) {
  if (!tags) return [];
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

