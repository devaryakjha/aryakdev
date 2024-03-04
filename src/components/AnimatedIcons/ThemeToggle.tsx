"use client";
import Button from "@/ui/Button/button";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setIsLight(false);
    } else {
      document.documentElement.classList.remove("dark");
      setIsLight(true);
    }
    setIsLight(
      document.documentElement.classList.contains("dark") ? false : true,
    );
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
