import { BASE_URL } from "@/lib/constants";
import type { Metadata } from "next";

const title = "Aryakumar Jha - Software Engineer Portfolio";
const description =
  "Welcome to the portfolio website of Aryakumar Jha, a skilled software engineer specializing in mobile and web application development. Explore Aryakumar's projects and expertise in Flutter, React.js, Node.js, and more.";
const keywords =
  "Aryakumar Jha, aryakumar jha, arya jha, Software Engineer, Portfolio, Mobile App Development, Web Development, Flutter, React.js, Node.js, Golang, Python, UI/UX Design, Full-stack Development";
const applicationName = title;

const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: "/" },
  title,
  description,
  keywords,
  applicationName,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: applicationName,
    countryName: "India",
    locale: "en_IN",
    type: "website",
  },
};

export default metadata;
