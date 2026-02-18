export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  href: string;
  color: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Cipher Forge",
    description:
      "Generate secure and strong passwords effortlessly with CipherForge. A free password generator to keep your accounts protected.",
    image: "/images/projects/cipher_forge.webp",
    href: "https://cipher-forge.aryak.dev",
    color: "#666597",
  },
  {
    id: 2,
    title: "Project Varanasi",
    description:
      "A work-in-progress music streaming app built with Flutter for iOS, Android, and macOS (Beta). UI inspired by Spotify mobile.",
    image: "/images/projects/varanasi.webp",
    href: "https://github.com/devaryakjha/varanasi",
    color: "#C38D4F",
  },
  {
    id: 3,
    title: "Dictionary",
    description:
      "Cross-platform dictionary app with pronunciation audio, part-of-speech support, and offline audio caching for faster learning.",
    image: "/images/projects/dictionary.webp",
    href: "https://github.com/devaryakjha/dictionary",
    color: "#999AC6",
  },
  {
    id: 4,
    title: "BMI Calculator",
    description:
      "Flutter BMI calculator with a visual chart for ranges (underweight → obese) and an explanation of the formula and method.",
    image: "/images/projects/bmi_calculator.webp",
    href: "https://github.com/devaryakjha/bmi_calculator",
    color: "#78A1BB",
  },
];

