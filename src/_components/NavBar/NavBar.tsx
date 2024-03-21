import styles from "./Navbar.module.css";

import ThemeToggler from "@/_components/ThemeToggle";
import clsx from "clsx";
import NavIcon from "./NavIcon";
import LinksList from "./LinksList";

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <NavIcon />
      <ul className={styles.navlist}>
        <LinksList />
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
