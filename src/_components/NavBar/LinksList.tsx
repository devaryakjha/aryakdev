"use client";
import Button from "@/ui/Button/button";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LinksList() {
  const pathname = usePathname();
  const isRoot = pathname === "/";
  if (!isRoot) {
    return <></>;
  }
  return (
    <>
      <li className={styles.navitem} key={"/projects"}>
        <Link href="#projects">
          <Button variant={{ variant: "navigation" }}>Projects</Button>
        </Link>
      </li>
      <li className={styles.navitem} key={"/blog"}>
        <Link href="#blogs">
          <Button variant={{ variant: "navigation" }}>Blog</Button>
        </Link>
      </li>
    </>
  );
}
