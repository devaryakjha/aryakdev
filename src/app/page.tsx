import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <iframe
        src="/Aryakumar-Jha.pdf#toolbar=0&view=Fit"
        className={styles.resume}
      />
    </main>
  );
}
