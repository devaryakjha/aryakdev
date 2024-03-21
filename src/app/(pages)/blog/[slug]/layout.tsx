import styles from "./BlogPage.module.css";
import GradientBlur from "./_components/gradient_blur";
import SideBar from "./_components/SideBar";
import { getPostBySlug } from "@/lib/api";
import { notFound } from "next/navigation";

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
