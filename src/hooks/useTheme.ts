"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => () => {
    const newTheme = theme === "light" ? "dark" : "light";
    state.setTheme(newTheme);
    const classes = document.documentElement.classList;
    if (newTheme === "dark") {
      classes.add("dark");
    } else {
      classes.remove("dark");
    }
  });
  return { theme, toggleTheme };
};

export { useTheme, type ThemeMode };
