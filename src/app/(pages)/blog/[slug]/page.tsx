import { getAllPosts, getPostBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import styles from "./BlogPage.module.css";
import markdownToHtml from "@/lib/markdownToHtml";
import { PostBody } from "./_components/PostBody";
import type { Metadata, ResolvingMetadata } from "next/types";

type Params = {
  params: {
    slug: string;
  };
};

export default async function BlogPage({ params }: Params) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <article
      className={clsx("prose dark:prose-invert no-scrollbar", styles.article)}
    >
      <div className={clsx(styles.poster, "group")}>
        <Image
          src={post.posterImage.url}
          alt={post.title}
          fill
          priority
          loading="eager"
          className="group-hover:scale-105"
        />
      </div>
      <PostBody content={content} />
    </article>
  );
}

export function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
