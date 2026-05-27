import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

type Story = {
  title: string;
  handle: string;
  src: string;
};

const STORIES: Story[] = [
  { title: "CAMPAIGN FILM", handle: "@cool_lookin_bug", src: "/v3/story_01.jpg" },
  { title: "BRAND IDENTITY", handle: "@Tapewarp.ai", src: "/v3/story_02.jpg" },
  { title: "MUSIC VIDEO", handle: "@JosephMartin", src: "/v3/story_03.jpg" },
  { title: "PRODUCT LAUNCH", handle: "@Rourke", src: "/v3/story_04.jpg" },
  { title: "SHORT FILM", handle: "@JamieFenn", src: "/v3/story_05.jpg" },
];

export function RealWork() {
  return (
    <section className="bg-[var(--hero)] text-white py-20 lg:py-28 border-t border-white/5">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-12">
          <div>
            <h2 className="font-display tracking-display font-medium leading-[1.0] text-[36px] lg:text-[44px]">
              Made with Envato.
              <br />
              <em className="italic text-gradient-brand">Real work.</em>
              <br />
              Real people.
            </h2>
            <Link
              href="#"
              className="group inline-flex items-center gap-2 mt-7 text-[13px] font-medium text-[var(--envato)] hover:text-white transition-colors"
            >
              <span className="group-hover:underline underline-offset-4">See more stories</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {STORIES.map((s) => (
              <StoryCard key={s.title} story={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryCard({ story }: { story: Story }) {
  return (
    <a
      href="#"
      aria-label={`${story.title} by ${story.handle}`}
      className="group relative block aspect-[4/5] overflow-hidden bg-[#111] shadow-sm hover:shadow-xl transition-shadow"
    >
      <Image
        src={story.src}
        alt={story.title}
        fill
        sizes="(min-width:1024px) 20vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid place-items-center size-11 rounded-full bg-black/65 backdrop-blur-sm border border-white/15 shadow-[0_4px_18px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110 group-hover:bg-black/85">
          <Play className="size-4 text-white fill-white translate-x-[1px]" strokeWidth={0} />
        </span>
      </div>

      <div className="absolute bottom-3 left-3 right-3">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/95 mb-1">
          {story.title}
        </div>
        <div className="text-[11.5px] text-white/65">by {story.handle}</div>
      </div>
    </a>
  );
}
