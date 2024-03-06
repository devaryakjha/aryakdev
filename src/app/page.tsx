import ThemedImage from "@/components/ThemedImage";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <section className={styles.intro}>
        <ThemedImage
          lightSrc="/images/map_light.svg"
          darkSrc="/images/map_dark.svg"
          fill
          alt="India map"
          className={styles.map}
        />
      </section>
    </main>
  );
}
