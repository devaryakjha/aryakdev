import Typography from "@/ui/Typography";
import styles from "./Footer.module.css";
import Email from "./Icons/email";
import Button from "@/ui/Button/button";
import Link from "next/link";
import Instagram from "./Icons/insta";
import LinkedIn from "./Icons/linkedin";

const links = [
  {
    name: "Email",
    url: "mailto:me@aryak.dev",
    icon: <Email />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/wizardlydev",
    icon: <Instagram />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/devaryakjha",
    icon: <LinkedIn />,
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Typography.Caption>{"Be nice :)"}</Typography.Caption>
      <ul className={styles.socials}>
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              prefetch={false}
            >
              {link.icon}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
