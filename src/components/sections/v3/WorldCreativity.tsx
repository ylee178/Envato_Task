import Image from "next/image";

export function WorldCreativity() {
  return (
    <section className="bg-[var(--bg)] py-24 lg:py-32 border-t border-[var(--line)]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10 lg:gap-14 items-center">
        <div className="max-w-[400px]">
          <h2 className="font-display tracking-display font-medium leading-[1.0] text-[40px] lg:text-[56px] text-[var(--ink)]">
            The world&apos;s
            <br />
            creativity.
            <br />
            <em className="italic text-gradient-brand-deep">Organised for yours.</em>
          </h2>
          <p className="mt-6 text-[15px] lg:text-[17px] leading-[1.55] text-[var(--muted-ink)] max-w-[360px]">
            Millions of references from every culture, movement and moment. Curated, so you can create something new.
          </p>
        </div>

        <div className="relative aspect-[4/3] lg:aspect-[5/4] overflow-hidden">
          <Image
            src="/v3/moodboard_collage.jpg"
            alt="A pile of editorial references curated by Envato"
            fill
            sizes="(min-width:1024px) 60vw, 100vw"
            quality={90}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
