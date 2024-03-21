import styles from "./BlogPage.module.css";
import GradientBlur from "./_components/gradient_blur";
import SideBar from "./_components/SideBar";
import { getPostBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next/types";
import clsx from "clsx";

export default function BlogPageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <main className={styles.main}>
      <GradientBlur />
      <div className={styles.blog}>
        <SideBar title={post.title} date={post.date} />
        {children}
      </div>
    </main>
  );
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const parentMetadata = await parent;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Aryakumar Jha`;

  return {
    title,
    alternates: { canonical: `/blog/${post.slug}` },
    description: post.excerpt,
    keywords: clsx(parentMetadata.keywords, post.tags),
    openGraph: {
      tags: post.tags,
      authors: post.author.name,
      title,
      type: "article",
      publishedTime: post.date,
      images: `/blog/${post.slug}/og.png`,
    },
    twitter: {
      images: `/blog/${post.slug}/twitter.png`,
    },
  };
}
