export type Project = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  status: string;
  stack: string[];
  problem: string;
  solution: string;
  highlights: string[];
  links: {
    details: string;
    github?: string;
    live?: string;
    docs?: string;
    package?: string;
  };
  image: string;
  color: string;
  active?: boolean;
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "oore-build",
    title: "oore.build",
    summary:
      "Self-hosted mobile CI and internal app distribution for Flutter teams running on their own macOS infrastructure.",
    description:
      "Self-hosted, Flutter-first mobile CI and internal app distribution platform focused on faster release pipelines.",
    status: "Public alpha",
    stack: ["Rust", "Flutter", "TypeScript", "CI/CD", "macOS"],
    problem:
      "Mobile release pipelines often become fragmented: build logic in one place, signing in another, and distribution as a separate workflow.",
    solution:
      "Oore CI centralizes build orchestration, signing workflows, and internal artifact delivery into one self-hosted system designed for Flutter mobile teams.",
    highlights: [
      "Daemon + CLI + Web UI workflow (`oored`, `oore`, and hosted/self-hosted UI)",
      "Android, iOS, and macOS Flutter build support on macOS hosts",
      "OIDC-based auth, role-based access, and signed artifact links",
      "GitHub/GitLab webhook-triggered builds and file-first pipeline config",
    ],
    links: {
      details: "/projects/oore-build",
      github: "https://github.com/devaryakjha/oore.build",
      live: "https://oore.build",
      docs: "https://docs.oore.build",
    },
    image: "/images/projects/oore.build.webp",
    color: "#3b82f6",
    active: true,
  },
  {
    id: 2,
    slug: "tagflow",
    title: "Tagflow",
    summary:
      "A Flutter package that turns HTML input into configurable Flutter widgets for product teams building rich content surfaces.",
    description:
      "Popular Flutter package (20 stars) that parses HTML strings and maps them into configurable Flutter widgets.",
    status: "Maintained",
    stack: ["Dart", "Flutter", "HTML parsing", "Package tooling"],
    problem:
      "Teams often need to render dynamic HTML content in Flutter without shipping fragile one-off parsers for each use case.",
    solution:
      "Tagflow provides a configurable parsing and rendering pipeline that maps HTML tags to Flutter widget builders with predictable behavior.",
    highlights: [
      "Config-driven HTML to widget mapping",
      "Designed for dynamic content use cases in Flutter apps",
      "Published package with practical integration workflow",
      "Clean extension points for custom tag behavior",
    ],
    links: {
      details: "/projects/tagflow",
      github: "https://github.com/devaryakjha/tagflow",
      package: "https://pub.dev/packages/tagflow",
    },
    image: "/images/projects/tagflow.webp",
    color: "#f59e0b",
    active: true,
  },
  {
    id: 3,
    slug: "jellyfin-dart",
    title: "jellyfin-dart",
    summary:
      "Type-safe, auto-generated Dart client for Jellyfin API that helps Flutter teams integrate media workflows safely.",
    description:
      "Type-safe, auto-generated Dart client for Jellyfin API v10.11.0, designed for comprehensive Flutter and Dart integration.",
    status: "Maintained",
    stack: ["Dart", "OpenAPI", "Code generation", "Jellyfin"],
    problem:
      "Manual API clients drift quickly and create fragile integration code when upstream APIs evolve.",
    solution:
      "jellyfin-dart generates strongly typed API models and endpoints from Jellyfin schema so application code stays predictable and easier to maintain.",
    highlights: [
      "Comprehensive typed coverage for Jellyfin API v10.11.0",
      "Auto-generated interfaces reduce integration regressions",
      "Dart/Flutter-first usage patterns",
      "Useful as a base for custom Jellyfin app experiences",
    ],
    links: {
      details: "/projects/jellyfin-dart",
      github: "https://github.com/devaryakjha/jellyfin-dart",
      package: "https://pub.dev/packages/jellyfin_dart",
    },
    image: "/images/projects/jellyfin-dart.webp",
    color: "#14b8a6",
  },
  {
    id: 4,
    slug: "anpec",
    title: "anpec",
    summary:
      "Android performance classification plugin for Flutter apps to drive capability-aware features and runtime tuning.",
    description:
      "Android performance classification plugin for Flutter, useful for capability-aware feature flags and runtime tuning.",
    status: "Maintained",
    stack: ["Flutter", "Android", "Kotlin", "Performance"],
    problem:
      "A single experience for all Android devices can break UX quality on lower-tier hardware and waste resources on higher-tier devices.",
    solution:
      "anpec classifies device performance at runtime so apps can apply feature flags and behavior tuning based on actual capability.",
    highlights: [
      "Runtime performance classification for Android in Flutter apps",
      "Supports capability-aware feature flags and fallback paths",
      "Helps optimize animations, effects, and expensive processing",
      "Simple integration as a focused plugin",
    ],
    links: {
      details: "/projects/anpec",
      github: "https://github.com/devaryakjha/anpec",
      package: "https://pub.dev/packages/anpec",
    },
    image: "/images/projects/anpec.webp",
    color: "#8b5cf6",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug) ?? null;
}
