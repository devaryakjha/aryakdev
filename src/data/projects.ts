export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  href: string;
  color: string;
  active?: boolean;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "oore.build",
    description:
      "Self-hosted, Flutter-first mobile CI and internal app distribution platform focused on faster release pipelines.",
    image: "/images/projects/oore.build.webp",
    href: "https://demo.oore.build",
    color: "#3b82f6",
    active: true,
  },
  {
    id: 2,
    title: "Tagflow",
    description:
      "Popular Flutter package (20 stars) that parses HTML strings and maps them into configurable Flutter widgets.",
    image: "/images/projects/tagflow.webp",
    href: "https://github.com/devaryakjha/tagflow",
    color: "#f59e0b",
    active: true,
  },
  {
    id: 3,
    title: "jellyfin-dart",
    description:
      "Type-safe, auto-generated Dart client for Jellyfin API v10.11.0, designed for comprehensive Flutter and Dart integration.",
    image: "/images/projects/jellyfin-dart.webp",
    href: "https://github.com/devaryakjha/jellyfin-dart",
    color: "#14b8a6",
  },
  {
    id: 4,
    title: "anpec",
    description:
      "Android performance classification plugin for Flutter, useful for capability-aware feature flags and runtime tuning.",
    image: "/images/projects/anpec.webp",
    href: "https://github.com/devaryakjha/anpec",
    color: "#8b5cf6",
  },
];
