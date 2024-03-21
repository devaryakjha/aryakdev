import styles from "./SectionTitle.module.css";
import Heading from "@/ui/Typography/Heading";
import SubHeading from "@/ui/Typography/SubHeading";
import clsx from "clsx";

interface SectionTitleProps {
  title: string;
  subheading: string;
  className?: string;
}

export default function SectionTitle({
  title,
  subheading,
  className,
}: SectionTitleProps) {
  return (
    <div className={clsx(styles.body, className)}>
      <Heading weight="medium" size="h1">
        {title}
      </Heading>
      <SubHeading className={styles.subheading}>{subheading}</SubHeading>
    </div>
  );
}
