import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/*
 * Stock asset breadth — Envato's structural differentiator vs Higgsfield
 * (which has zero human library). Sits AFTER the AI sections so the reader
 * has already understood the AI thesis, then meets the catalog scale.
 */

type Category = {
  name: string;
  count: string;
  src: string;
};

const CATEGORIES: Category[] = [
  { name: "Stock Videos",         count: "9M+",   src: "/v4/cat_01_video.jpg" },
  { name: "Stock Photos",         count: "15.8M+", src: "/v4/cat_02_photos.jpg" },
  { name: "Royalty-Free Music",   count: "340K+", src: "/v4/cat_03_music.jpg" },
  { name: "Sound Effects",        count: "940K+", src: "/v4/cat_04_sound.jpg" },
  { name: "Video Templates",      count: "150K+", src: "/v4/cat_05_video_templates.jpg" },
  { name: "Graphic Templates",    count: "420K+", src: "/v4/cat_06_graphic_templates.jpg" },
  { name: "Presentations",        count: "210K+", src: "/v4/cat_07_presentations.jpg" },
  { name: "3D Assets",            count: "380K+", src: "/v4/cat_08_3d.jpg" },
  { name: "Fonts",                count: "78K+",  src: "/v4/cat_09_fonts.jpg" },
  { name: "Graphics",             count: "280K+", src: "/v4/cat_10_graphics.jpg" },
  { name: "Add-ons & LUTs",       count: "38K+",  src: "/v4/cat_11_addons.jpg" },
  { name: "All Categories",       count: "28.1M+", src: "/v4/cat_12_all.jpg" },
];

export function AssetLibraryV4() {
  return (
    <section
      className="bg-[var(--hero)] text-white border-t border-white/5"
      style={{ paddingTop: "var(--space-24)", paddingBottom: "var(--space-24)" }}
    >
      <div className="mx-auto max-w-[1920px] px-6 lg:px-10">
        {/* Header */}
        <div style={{ marginBottom: "var(--gap-asset-title)" }}>
          <h2 className="font-display tracking-display font-medium leading-[1.0] text-[40px] lg:text-[60px]">
            Every asset class.{" "}
            <em className="italic text-gradient-brand">One library.</em>
          </h2>
          <p
            className="text-[14px] lg:text-[16px] leading-[1.5] text-white/65 lg:whitespace-nowrap"
            style={{ marginTop: "var(--gap-text-lg)" }}
          >
            Beyond AI, the same subscription unlocks 28M+ human-crafted stock assets across every medium creators need.
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.name} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href="#"
      aria-label={`${category.name}, ${category.count}`}
      className="group relative block aspect-[4/5] overflow-hidden bg-[var(--surface-dark-card)] ring-1 ring-white/8 rounded-md hover:ring-2 hover:ring-[var(--envato)] hover:shadow-[var(--shadow-glow-primary)] transition-all duration-300"
    >
      <Image
        src={category.src}
        alt={category.name}
        fill
        sizes="(min-width:1024px) 22vw, (min-width:768px) 30vw, 45vw"
        className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

      <ArrowUpRight className="absolute top-4 right-4 size-4 text-[var(--envato)] opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5">
        <div className="font-display text-[20px] lg:text-[24px] tracking-display font-medium leading-[1.05] text-white">
          {category.name}
        </div>
        <div className="mt-1 text-[10.5px] font-mono uppercase tracking-[0.2em] text-[var(--envato)]">
          {category.count}
        </div>
      </div>
    </Link>
  );
}
