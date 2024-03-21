import styles from "./Blogs.module.css";
import SectionTitle from "@/_components/Home/SectionTitle";
import GradientBlur from "@/_components/Home/GradientBlur";
import { getAllPosts } from "@/lib/api";
import { formatDate } from "@/lib/date";
import clsx from "clsx";
import Typography from "@/ui/Typography";
import Link from "next/link";

export default async function Blogs() {
  const blogs = getAllPosts();
  return (
    <section className={styles.blogs} id="blogs">
      <SectionTitle
        title="Blog"
        subheading="Articles about my experience and ideas of what I’ve learned so far."
        className={styles.title}
      />
      <div className={styles.gridContainer}>
        <GradientBlur />
        <div className={styles.bloggrid}>
          {blogs.map((blog, index) => (
            <div key={blog.slug + index.toString()} className={styles.card}>
              <Typography.Special className={styles.index}>
                {"0" + (index + 1)}
              </Typography.Special>
              <Typography.Heading className={styles.cardTitle}>
                {blog.shortTitle}
              </Typography.Heading>
              <div className={styles.date}>
                <Typography.Caption>{formatDate(blog.date)}</Typography.Caption>
                <Link href={`/blog/${blog.slug}`}>Read More</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
