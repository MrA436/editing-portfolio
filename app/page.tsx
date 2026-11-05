import { site, projects, services } from "@/data/site";
import Nav from "@/components/Nav";
import VideoCard from "@/components/VideoCard";
import Footer from "@/components/Footer";

const btnPrimary =
  "inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200";
const btnSecondary =
  "inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium transition-colors hover:border-white/50";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <section className="mx-auto max-w-6xl px-6 pb-24 pt-40 md:pb-32 md:pt-52">
          <p className="mb-5 text-sm tracking-wide text-accent">SIGILITH · INDEPENDENT CREATIVE STUDIO</p>
          <p className="mb-8 max-w-xl text-xl text-neutral-300">
            Short-form video editing that makes every second count.
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tighter sm:text-6xl md:text-8xl">
            Stories worth watching.
            <span className="block text-neutral-500">Edits worth remembering.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-400">
            I turn raw footage and ideas into engaging short-form videos through thoughtful storytelling, clean
            captions, purposeful pacing, and sound design.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#work" className={btnPrimary}>View My Work</a>
            <a href="#contact" className={btnSecondary}>Contact Me</a>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-3xl font-semibold tracking-tight">Selected work</h2>
          <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
            {projects.map((p) => (
              <VideoCard key={p.title} project={p} />
            ))}
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
            <h2 className="text-3xl font-semibold tracking-tight">A little about my work</h2>
            <div className="max-w-xl space-y-5 text-lg leading-relaxed text-neutral-400">
              <p>
                I&rsquo;m a short-form video editor who enjoys turning raw footage and ideas into engaging,
                well-crafted videos.
              </p>
              <p>
                My approach combines visual storytelling, clean captions, purposeful pacing, and thoughtful sound
                design to make content more compelling and enjoyable to watch.
              </p>
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-xl font-medium tracking-tight text-white">AI-assisted visual production</h3>
                <p className="mt-3">
                  I use AI-assisted tools to create and enhance visual assets when a project calls for custom
                  scenes, animations, or illustrative footage. I combine these assets with editing, visual
                  direction, pacing, captions, and sound design to bring the final video together.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-3xl font-semibold tracking-tight">Services</h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-md bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <li key={s.title} className="bg-neutral-950 p-8">
                <h3 className="text-lg font-medium tracking-tight">{s.title}</h3>
                <p className="mt-3 text-neutral-400">{s.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <h2 className="text-4xl font-semibold tracking-tighter md:text-6xl">Have a video in mind?</h2>
          <p className="mt-5 text-lg text-neutral-400">Let&rsquo;s turn it into something worth watching.</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href={`mailto:${site.email}`} className={btnPrimary}>Email me</a>
            <a href={`mailto:${site.email}`} className="text-neutral-300 underline-offset-4 hover:underline">{site.email}</a>
            <a href={site.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-300 underline-offset-4 hover:underline">
              YouTube channel
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}