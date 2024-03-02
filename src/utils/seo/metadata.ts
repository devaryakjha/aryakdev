import type { Metadata } from "next";

const title = "Aryakumar Jha - Software Engineer Portfolio";
const description =
  "Welcome to the portfolio website of Aryakumar Jha, a skilled software engineer specializing in mobile and web application development. Explore Aryakumar's projects and expertise in Flutter, React.js, Node.js, and more.";
const keywords =
  "Software Engineer, Portfolio, Mobile App Development, Web Development, Flutter, React.js, Node.js, Golang, Python, UI/UX Design, Full-stack Development";
const applicationName = title;
const url =
  process.env.VERCEL_ENV === "production"
    ? "https://aryak.dev"
    : process.env.VERCEL_ENV === "preview"
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
const unsecuredUrl = url.replace("https://", "http://");

const metadata: Metadata = {
  title,
  description,
  keywords,
  applicationName,
  openGraph: {
    title,
    description,
    url,
    siteName: applicationName,
    countryName: "India",
    locale: "en_IN",
    images: {
      url: `${unsecuredUrl}/images/og-image.png`,
      secureUrl: `${url}/images/og-image.png`,
    },
  },
};

export default metadata;
