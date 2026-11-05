"use client";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { site } from "@/data/site";

type Project = {
  title: string; kind: string; description: string; note: string; video: string | null; thumbnail: string;
};

export default function VideoCard({ project }: { project: Project }) {
  const [playing, setPlaying] = useState(false);
  const [thumbOk, setThumbOk] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  // The image can fail before React attaches onError, so check once after mount too.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setThumbOk(false);
  }, [playing, project.video]);

  return (
    <article>
      <div className="relative overflow-hidden rounded-md bg-neutral-900" style={{ aspectRatio: site.videoAspect }}>
        {!project.video ? (
          <div className="absolute inset-0 grid place-items-center">
            {thumbOk && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                ref={imgRef}
                src={project.thumbnail}
                alt=""
                onError={() => setThumbOk(false)}
                className="absolute inset-0 h-full w-full object-cover opacity-60"
              />
            )}
            <span className="relative text-sm text-neutral-400">Video coming soon</span>
          </div>
        ) : playing ? (
          <video
            src={project.video}
            controls
            autoPlay
            playsInline
            preload="none"
            className="h-full w-full bg-black object-cover"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            aria-label={`Play ${project.title}`}
            className="group absolute inset-0 text-left"
          >
            {thumbOk ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                ref={imgRef}
                src={project.thumbnail}
                alt={`Thumbnail for ${project.title}`}
                loading="lazy"
                onError={() => setThumbOk(false)}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              // No thumbnail file: show a frame from the video itself
              <video
                src={`${project.video}#t=0.5`}
                preload="metadata"
                muted
                playsInline
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            )}
            <span className="absolute inset-0 grid place-items-center bg-black/20 transition-colors group-hover:bg-black/35">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-white/40 bg-black/40">
                <Play size={20} fill="currentColor" className="ml-0.5" />
              </span>
            </span>
          </button>
        )}
      </div>
      <p className="mt-5 text-sm text-accent">{project.kind}</p>
      <h3 className="mt-1 text-xl font-medium tracking-tight">{project.title}</h3>
      <p className="mt-2 text-neutral-400">{project.description}</p>
      <p className="mt-3 text-xs tracking-wider text-neutral-500">{project.note}</p>
    </article>
  );
}