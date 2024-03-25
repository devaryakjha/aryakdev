import Heading from "@/ui/Typography/Heading";
import styles from "./Project.module.css";
import { Project } from "@/utils/projects";
import Body from "@/ui/Typography/Body";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

export default function ProjectCard(project: Project) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <Heading size="h2">{project.title}</Heading>
        <Body className={styles.description}>{project.description}</Body>
      </div>
      <Link href={project.github} target="_blank" rel="noopener noreferrer">
        <div
          className={clsx(styles.base, "group")}
          style={{ backgroundColor: project.color }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="group-hover:scale-110"
          />
        </div>
      </Link>
    </div>
  );
}
