import styles from "./Navbar.module.css";
import Image from "next/image";
import Button from "@/ui/Button/button";
import ThemeToggler from "@/components/ThemeToggle";
import clsx from "clsx";

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <a href="/">
        <Image
          className={styles.logo}
          src="/images/logo.png"
          alt="logo"
          width={64}
          height={64}
          priority
          draggable={false}
        />
      </a>
      <ul className={styles.navlist}>
        <li className={styles.navitem} key={"/projects"}>
          <a href="/projects">
            <Button variant={{ variant: "navigation" }}>Projects</Button>
          </a>
        </li>
        <li className={styles.navitem} key={"/blog"}>
          <a href="/blog">
            <Button variant={{ variant: "navigation" }}>Blog</Button>
          </a>
        </li>
        <li
          className={clsx(styles.navitem, styles.themeToggle)}
          key={"theme-toggle"}
        >
          <ThemeToggler />
        </li>
      </ul>
    </nav>
  );
}
