"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const NAV = [
  { label: "Video", href: "#" },
  { label: "Photos", href: "#" },
  { label: "Audio", href: "#" },
  { label: "Graphics", href: "#" },
  { label: "Web", href: "#" },
  { label: "3D", href: "#" },
  { label: "AI Tools", href: "#" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "bg-[var(--hero)]/85 backdrop-blur-xl border-white/10"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 h-16 flex items-center gap-10">
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

        <nav className="hidden lg:flex items-center gap-1 text-[13px] text-white/80">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3 py-2 rounded-sm hover:text-white hover:bg-white/5 transition-colors inline-flex items-center gap-1"
            >
              {item.label}
              <ChevronDown className="h-3 w-3 opacity-50" strokeWidth={2} />
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 text-[13px]">
          <a
            href="#"
            className="hidden sm:inline-flex items-center text-white border border-white/40 hover:border-[var(--envato)] hover:text-[var(--envato)] px-4 py-2 rounded-full font-semibold tracking-tight transition-colors"
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
