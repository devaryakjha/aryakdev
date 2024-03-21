import styles from "./Blogs.module.css";
import SectionTitle from "../SectionTitle";

export default function Blogs() {
  return (
    <section className={styles.blogs} id="blogs">
      <SectionTitle
        title="Blog"
        subheading="Articles about my experience and ideas of what I’ve learned so far."
        className={styles.title}
      />
    </section>
  );
}
