import Heading from "@/ui/Typography/Heading";
import styles from "./Projects.module.css";
import SubHeading from "@/ui/Typography/SubHeading";

export default function Projects() {
  return (
    <section className={styles.projects}>
      <div className={styles.body}>
        <Heading weight="medium" size="h1">
          Projects
        </Heading>
        <SubHeading className={styles.subheading}>
          I’ve worked with start-ups and small companies, also I’ve created some
          concepts for my personal side projects.
        </SubHeading>
      </div>
      <span />
    </section>
  );
}
