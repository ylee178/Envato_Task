import Image from "next/image";
import { Play, Heart, Eye } from "lucide-react";
import {
  MiamiDolphinsLogo,
  KpmgLogo,
  AudibleLogo,
  WarnerMediaLogo,
  PepsicoLogo,
  UnicefLogo,
  TikTokLogo,
  InstagramLogo,
  YouTubeLogo,
} from "@/components/icons/brand-logos";

const PLATFORM_LOGOS = {
  TT: TikTokLogo,
  IG: InstagramLogo,
  YT: YouTubeLogo,
} as const;

type Reel = {
  src: string;
  creator: string;
  views: string;
  likes: string;
  platform: "TT" | "IG" | "YT";
};

const REELS: Reel[] = [
  { src: "/reel_creator_1.png", creator: "@maxkolo",          views: "2.1M", likes: "184K", platform: "TT" },
  { src: "/reel_creator_2.png", creator: "@studiomarais",     views: "890K", likes: "62K",  platform: "IG" },
  { src: "/reel_creator_3.png", creator: "@studiotokyo",      views: "1.4M", likes: "98K",  platform: "YT" },
  { src: "/reel_creator_4.png", creator: "@sonic.collective", views: "3.4M", likes: "270K", platform: "TT" },
  { src: "/reel_creator_5.png", creator: "@type.co",          views: "612K", likes: "48K",  platform: "IG" },
  { src: "/reel_creator_6.png", creator: "@brand.solo",       views: "1.8M", likes: "132K", platform: "TT" },
  { src: "/reel_creator_7.png", creator: "@petrawolf",        views: "920K", likes: "71K",  platform: "YT" },
];

export function SocialProof() {
  return (
    <section className="bg-[var(--bg)] py-20 lg:py-24 border-t border-[var(--line)]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="mb-3">
          <h2 className="font-display text-[28px] lg:text-[34px] tracking-display font-medium leading-tight">
            Made with Envato, by real creators
          </h2>
          <p className="mt-2 text-[14px] text-[var(--muted-ink)]">
            See how creators are using Envato assets and AI to do their best work on TikTok,
            Instagram, YouTube, and beyond.
          </p>
        </div>

        {/* Vertical video reels */}
        <div className="mt-8 relative -mx-6 lg:-mx-10 overflow-hidden">
          <div className="flex gap-3 px-6 lg:px-10 overflow-x-auto snap-x snap-mandatory pb-3 scrollbar-hide">
            {REELS.map((r, i) => (
              <ReelCard key={i} reel={r} />
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--bg)] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--bg)] to-transparent pointer-events-none" />
        </div>

        {/* Trusted by top brands, monochrome wordmarks */}
        <div className="mt-14 pt-10 border-t border-[var(--line)]">
          <div className="text-center text-[10.5px] font-mono uppercase tracking-[0.24em] text-[var(--muted-ink)] mb-7">
            Trusted by top brands
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 lg:gap-x-8 gap-y-8 items-center">
            {[MiamiDolphinsLogo, KpmgLogo, AudibleLogo, WarnerMediaLogo, PepsicoLogo, UnicefLogo].map((Logo, i) => (
              <div key={i} className="flex items-center justify-center h-8 w-full overflow-visible">
                <Logo />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReelCard({ reel }: { reel: Reel }) {
  return (
    <a
      href="#"
      className="group relative shrink-0 w-[180px] lg:w-[200px] aspect-[9/16] overflow-hidden bg-[var(--ink)] snap-start"
    >
      <Image
        src={reel.src}
        alt={reel.creator}
        fill
        sizes="200px"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Soft top/bottom scrim, mostly transparent so baked-in titles read */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20" />

      <div className="absolute inset-0 grid place-items-center">
        <span className="size-12 grid place-items-center rounded-full bg-white/90 backdrop-blur group-hover:bg-white transition-colors shadow-xl">
          <Play className="size-4 fill-[#0a0a0a] text-[#0a0a0a] translate-x-0.5" strokeWidth={0} />
        </span>
      </div>

      <div className="absolute top-2 left-2 grid place-items-center size-6 rounded-full text-white bg-black/55 backdrop-blur">
        <PlatformLogo platform={reel.platform} />
      </div>

      <div className="absolute top-2 right-2 inline-flex items-center gap-2 text-[9.5px] font-mono text-white bg-black/55 backdrop-blur px-2 py-0.5 rounded-full">
        <span className="inline-flex items-center gap-1">
          <Eye className="size-2.5" strokeWidth={2} /> {reel.views}
        </span>
        <span className="inline-flex items-center gap-1">
          <Heart className="size-2.5" strokeWidth={2} /> {reel.likes}
        </span>
      </div>

      <div className="absolute bottom-2 left-2 text-[11px] font-semibold text-white drop-shadow-sm">
        {reel.creator}
      </div>
    </a>
  );
}

function PlatformLogo({ platform }: { platform: Reel["platform"] }) {
  const Logo = PLATFORM_LOGOS[platform];
  return <Logo className="size-3.5" />;
}
