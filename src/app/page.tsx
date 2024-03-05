import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className={styles.intro}>
        <Image
          src="/images/map_light.svg"
          width={500}
          height={540}
          alt="India map"
          className={styles.map}
        />
      </section>
    </main>
  );
}
