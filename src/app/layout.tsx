import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";

const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aryakumar Jha",
  description:
    "Experienced Flutter Developer with a Track Record of Delivering Innovative Cross-Platform Mobile Solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
