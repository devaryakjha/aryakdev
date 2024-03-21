import styles from "./Hero.module.css";
import Typography from "@/ui/Typography";
import ThemedImage from "@/_components/ThemedImage";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <ThemedImage
        lightSrc="/images/map_light.svg"
        darkSrc="/images/map_dark.svg"
        fill
        alt="India map"
        className={styles.map}
        priority
      />
      <Typography.Heading className={styles.content} size="h1">
        Hello, I’m <b>Aryakumar Jha</b>, <b>Software Developer</b> based in{" "}
        <b>India</b>
      </Typography.Heading>
    </section>
  );
}
