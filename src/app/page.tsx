import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Coming Soon</h1>
      <Image
        src="/images/balls.png"
        alt="Balls"
        objectFit="contain"
        width={616}
        height={624}
        className={styles.balls}
        draggable={false}
      />
      <Image
        src={"/images/cubes.png"}
        alt="Cube"
        objectFit="contain"
        width={480}
        height={450}
        className={styles.cube}
        draggable={false}
      />
    </main>
  );
}
