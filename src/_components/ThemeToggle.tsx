"use client";
import Button from "@/ui/Button/button";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggler() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";
  return (
    <Button variant={{ variant: "icon" }} onClick={toggleTheme}>
      <Image
        src={isLight ? "/icons/theme/light.svg" : "/icons/theme/dark.svg"}
        alt={isLight ? "light" : "dark"}
        width={24}
        height={24}
      />
    </Button>
  );
}
