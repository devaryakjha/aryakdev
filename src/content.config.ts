import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    ogTitle: z.string().optional(),
    excerpt: z.string().optional(),
    title: z.string(),
    shortTitle: z.string().optional(),
    date: z.string(),
    posterImage: z
      .object({
        url: z.string(),
        bgColor: z.string().optional(),
      })
      .optional(),
    tags: z.string().optional(),
    author: z
      .object({
        name: z.string().optional(),
        bio: z.string().optional(),
        picture: z.string().optional(),
      })
      .optional(),
    ogImage: z
      .object({
        url: z.string(),
      })
      .optional(),
  }),
});

export const collections = { blog };

