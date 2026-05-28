"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

// Top 5 mirror the start of elements.envato.com's header; the rest collapse
// under "More" so the header stays compact on every breakpoint.
const NAV_PRIMARY = [
  { label: "Gen AI",          href: "#" },
  { label: "Video Templates", href: "#" },
  { label: "Stock Video",     href: "#" },
  { label: "Audio",           href: "#" },
  { label: "Graphics",        href: "#" },
];

const NAV_MORE = [
  { label: "Design Templates", href: "#" },
  { label: "Photos",           href: "#" },
  { label: "3D",               href: "#" },
  { label: "Fonts",            href: "#" },
  { label: "Web",              href: "#" },
  { label: "Resources",        href: "#" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "bg-[var(--hero)]/85 backdrop-blur-xl border-white/10"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1920px] px-6 lg:px-10 h-16 flex items-center gap-6 lg:gap-8">
        <Link href="/" className="shrink-0">
          <Image
            src="/envato_logo_light.svg"
            alt="Envato"
            width={140}
            height={32}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5 text-[13px] text-white/85 whitespace-nowrap">
          {NAV_PRIMARY.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3 py-2 rounded-sm hover:text-white hover:bg-white/5 transition-colors inline-flex items-center gap-1"
            >
              {item.label}
              <ChevronDown className="h-3 w-3 opacity-55" strokeWidth={2.2} />
            </a>
          ))}

          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              className="cursor-pointer px-3 py-2 rounded-sm hover:text-white hover:bg-white/5 transition-colors inline-flex items-center gap-1"
            >
              More
              <ChevronDown
                className={`h-3 w-3 opacity-55 transition-transform ${moreOpen ? "rotate-180" : ""}`}
                strokeWidth={2.2}
              />
            </button>
            {moreOpen && (
              <div className="absolute left-0 top-full mt-1 w-56 bg-black/95 backdrop-blur-xl border border-white/15 rounded-2xl p-1.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] z-50">
                {NAV_MORE.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMoreOpen(false)}
                    className="block px-3 py-2 rounded-xl text-[13px] text-white/85 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2 text-[13px]">
          <a
            href="#"
            className="hidden sm:inline-flex items-center text-white border border-white/40 hover:bg-[var(--envato)]/15 hover:border-[var(--envato)] hover:text-[var(--envato)] px-4 py-2 rounded-full font-semibold tracking-tight transition-colors"
          >
            Sign In
          </a>
          <a
            href="#"
            className="bg-[var(--envato)] text-[#0a0a0a] hover:bg-[var(--envato-deep)] hover:text-white transition-colors px-4 py-2 rounded-full font-semibold tracking-tight inline-flex items-center"
          >
            Go Unlimited
          </a>
        </div>
      </div>
    </header>
  );
}
