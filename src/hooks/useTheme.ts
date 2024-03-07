"use client";
import { useEffect } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

type ThemeMode = "light" | "dark";

interface ThemeStore {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "dark" as ThemeMode,
      setTheme: (theme: ThemeMode) => set({ theme }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

/**
 * Custom hook to get and set the theme mode
 */
const useTheme = () => {
  const theme = useThemeStore(useShallow((state) => state.theme));
  const toggleTheme = useThemeStore((state) => () => {
    const newTheme = theme === "light" ? "dark" : "light";
    state.setTheme(newTheme);
  });
  useEffect(() => {
    const classes = document.documentElement.classList;
    if (theme === "dark") {
      classes.add("dark");
    } else {
      classes.remove("dark");
    }
  }, [theme]);
  return { theme, toggleTheme };
};

export { useTheme, type ThemeMode };
