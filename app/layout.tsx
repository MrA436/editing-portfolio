import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: `${site.name} | ${site.role}`,
  description:
    "Freelance short-form video editor for educational and documentary-style content: visual storytelling, clean captions, sound design, and purposeful pacing.",
  openGraph: {
    title: `${site.name} | ${site.role}`,
    description: "Educational and documentary-style short-form video editing.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}