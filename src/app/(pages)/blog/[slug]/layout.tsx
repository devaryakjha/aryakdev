import styles from "./BlogPage.module.css";
import GradientBlur from "./_components/gradient_blur";
import SideBar from "./_components/side_bar";

export default function BlogPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.main}>
      <GradientBlur />
      <SideBar />
      {children}
    </main>
  );
}
