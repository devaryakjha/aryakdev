import type { Author } from "./author";

export type Post = {
  slug: string;
  title: string;
  shortTitle: string;
  excerpt: string;
  date: string;
  posterImage: {
    url: string;
    bgColor: string;
  };
  content: string;
  ogImage: {
    url: string;
  };
  author: Author;
  tags: string;
};
