"use client";
import Button from "@/ui/Button/button";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ThemeToggler() {
  const [isLight, setIsLight] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("theme") === null) {
      setIsLight(false);
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      return;
    }

    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setIsLight(false);
    } else {
      document.documentElement.classList.remove("dark");
      setIsLight(true);
    }
  }, []);
  return (
    <Button
      variant={{ variant: "icon" }}
      onClick={() => {
        setIsLight((light) => !light);
        document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", isLight ? "dark" : "light");
      }}
    >
      <Image
        src={isLight ? "/icons/theme/light.svg" : "/icons/theme/dark.svg"}
        alt={isLight ? "light" : "dark"}
        width={24}
        height={24}
      />
    </Button>
  );
}
