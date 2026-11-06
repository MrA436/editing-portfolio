"use client";
import { Youtube, Mail } from "lucide-react";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 text-sm text-muted/70 sm:flex-row sm:items-center">
        <p suppressHydrationWarning>© {new Date().getFullYear()} {site.name}</p>
        <div className="flex gap-5">
          <a href={site.youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-ivory">
            <Youtube size={18} />
          </a>
          <a href={`mailto:${site.email}`} aria-label="Email" className="hover:text-ivory">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}