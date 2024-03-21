"use client";
import Button from "@/ui/Button/button";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";

export default function LinksList() {
  const pathname = usePathname();
  const isRoot = pathname === "/";
  if (!isRoot) {
    return <></>;
  }
  return (
    <>
      <li className={styles.navitem} key={"/projects"}>
        <a href="#projects">
          <Button variant={{ variant: "navigation" }}>Projects</Button>
        </a>
      </li>
      <li className={styles.navitem} key={"/blog"}>
        <a href="#blogs">
          <Button variant={{ variant: "navigation" }}>Blog</Button>
        </a>
      </li>
    </>
  );
}
