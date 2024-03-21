import NavBar from "@/_components/NavBar/NavBar";
import "./globals.css";
import font from "@/utils/font";
import seoMetadata from "@/utils/seo/metadata";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/_components/Footer";

export const metadata = seoMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={font.className}>
        <NavBar />
        {children}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
