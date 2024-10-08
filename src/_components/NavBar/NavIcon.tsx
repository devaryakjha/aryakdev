"use client";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/ui/Button/button";

export default function NavIcon() {
  const pathname = usePathname();
  const { back } = useRouter();
  return pathname === "/" ? (
    <Link href="/" aria-label="Go to home">
      <Image
        className={styles.logo}
        src="/images/logo.png"
        alt="logo"
        width={64}
        height={64}
        priority
        draggable={false}
      />
    </Link>
  ) : (
    <Button
      variant={{ variant: "icon" }}
      aria-label="Go to home"
      onClick={back}
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M29 22L15 22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 29L15 22L22 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  );
}
