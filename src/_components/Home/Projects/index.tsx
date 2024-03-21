import styles from "./Projects.module.css";
import { projects } from "@/utils/projects";
import ProjectCard from "@/_components/Home/ProjectCard";
import SectionTitle from "../SectionTitle";

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <SectionTitle
        title="Projects"
        subheading="Some of the projects I've worked on recently."
      />
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
