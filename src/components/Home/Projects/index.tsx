import Heading from "@/ui/Typography/Heading";
import styles from "./Projects.module.css";
import SubHeading from "@/ui/Typography/SubHeading";
import { projects } from "@/utils/projects";
import ProjectCard from "@/components/Home/ProjectCard";

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <div className={styles.body}>
        <Heading weight="medium" size="h1">
          Projects
        </Heading>
        <SubHeading className={styles.subheading}>
          {"Some of the projects I've worked on recently."}
        </SubHeading>
      </div>
      <ul className={styles.list}>
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard {...project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
