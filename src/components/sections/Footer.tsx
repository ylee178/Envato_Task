"use client";

import Image from "next/image";
import { Send } from "lucide-react";
import {
  SiInstagram,
  SiTiktok,
  SiFacebook,
  SiYoutube,
  SiReddit,
  SiPinterest,
  SiX,
} from "react-icons/si";

type Column = { title: string; links: { label: string; href: string }[] };

const DISCOVER: Column = {
  title: "Discover",
  links: [
    { label: "About Envato", href: "#" },
    { label: "Our Pricing & Plans", href: "#" },
    { label: "Teams & Enterprise Plans", href: "#" },
    { label: "Stock Video", href: "#" },
    { label: "Video Templates", href: "#" },
    { label: "Royalty-Free Music", href: "#" },
    { label: "Stock Photos", href: "#" },
    { label: "Fonts", href: "#" },
    { label: "Popular Searches", href: "#" },
  ],
};

const LICENSE: Column = {
  title: "License & User Terms",
  links: [
    { label: "License Terms", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Acceptable Use Policy", href: "#" },
    { label: "Fair Use Policy", href: "#" },
    { label: "Cookies", href: "#" },
    { label: "Do not sell or share my personal information", href: "#" },
    { label: "Cookie Settings", href: "#" },
  ],
};

const RESOURCES: Column = {
  title: "Resources",
  links: [
    { label: "Discover Tuts+", href: "#" },
    { label: "Video & Music", href: "#" },
    { label: "Design", href: "#" },
    { label: "Marketing", href: "#" },
    { label: "Web Design", href: "#" },
    { label: "Explore Blog", href: "#" },
  ],
};

const HELP: Column = {
  title: "Help",
  links: [
    { label: "Help Center", href: "#" },
    { label: "Become an Affiliate", href: "#" },
    { label: "Creative Partner Collective", href: "#" },
  ],
};

const ABOUT: Column = {
  title: "About Us",
  links: [
    { label: "Who We Are", href: "#" },
    { label: "Hey AI, learn about Envato", href: "#" },
    { label: "Our Products", href: "#" },
    { label: "Our Purpose", href: "#" },
    { label: "Join Our Team", href: "#" },
    { label: "Company Blog", href: "#" },
  ],
};

const AUTHORS: Column = {
  title: "Authors",
  links: [
    { label: "Become an Author", href: "#" },
    { label: "Author Sign In", href: "#" },
    { label: "Author Help Center", href: "#" },
  ],
};

const SOCIAL = [
  { Icon: SiInstagram, label: "Instagram" },
  { Icon: SiTiktok, label: "TikTok" },
  { Icon: SiFacebook, label: "Facebook" },
  { Icon: SiYoutube, label: "YouTube" },
  { Icon: SiReddit, label: "Reddit" },
  { Icon: SiPinterest, label: "Pinterest" },
  { Icon: SiX, label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--paper)] border-t border-[var(--line)]">
      <div className="mx-auto max-w-[1920px] px-6 lg:px-10 pt-14 lg:pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,360px)_1fr] gap-10 lg:gap-16">
          {/* LEFT — logo, social, email signup */}
          <div>
            <Image
              src="/envato_logo.svg"
              alt="Envato"
              width={120}
              height={28}
              className="h-7 w-auto"
            />

            <div className="mt-5 flex items-center gap-3 text-[var(--ink)]/70">
              {SOCIAL.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={`Envato on ${label}`}
                  className="size-7 grid place-items-center hover:text-[var(--ink)] transition-colors"
                >
                  <Icon className="size-[16px]" />
                </a>
              ))}
            </div>

            <div className="mt-8 max-w-[320px]">
              <p className="text-[13.5px] text-[var(--ink)] leading-[1.5]">
                <span className="font-semibold">Yes to creative inspo in your inbox.</span>{" "}
                Fresh tutorials, trends, tools (and no boring bits).
              </p>

              <form
                className="mt-4 relative flex items-center"
                onSubmit={(e) => e.preventDefault()}
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address for creative inspo newsletter
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Your email"
                  className="w-full pl-4 pr-12 py-3 text-[13.5px] bg-[var(--bg)] border border-[var(--line)] focus:border-[var(--ink)] outline-none rounded-md"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 grid place-items-center size-9 rounded-md bg-[var(--ink)] text-white hover:bg-[var(--envato)] hover:text-[var(--ink)] transition-colors"
                >
                  <Send className="size-4 -translate-x-px translate-y-px" strokeWidth={1.8} />
                </button>
              </form>

              <p className="mt-3 text-[11.5px] text-[var(--muted-ink)]">
                Unsubscribe any time.{" "}
                <a
                  href="#"
                  className="text-[var(--ink)] hover:underline underline-offset-4 transition-colors"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>

          {/* RIGHT — link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">
            <FooterColumn col={DISCOVER} />
            <FooterColumn col={LICENSE} />
            <div className="space-y-10">
              <FooterColumn col={RESOURCES} />
              <FooterColumn col={HELP} />
            </div>
            <div className="space-y-10">
              <FooterColumn col={ABOUT} />
              <FooterColumn col={AUTHORS} />
            </div>
          </div>
        </div>

        {/* Bottom: copyright + language */}
        <div className="mt-14 pt-6 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-4">
          <span className="text-[11.5px] text-[var(--muted-ink)] leading-snug max-w-[640px]">
            © 2026 Envato. Trademarks and brands are the property of their respective owners.
          </span>
          <button
            type="button"
            aria-label="Change language. Current: English"
            className="inline-flex items-center gap-1.5 text-[12px] text-[var(--ink)]/70 hover:text-[var(--ink)] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
            </svg>
            English ▾
          </button>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ col }: { col: Column }) {
  return (
    <div>
      <div className="text-[13px] font-semibold mb-3 text-[var(--ink)]">{col.title}</div>
      <ul className="space-y-2">
        {col.links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-[12.5px] text-[var(--ink)]/70 hover:text-[var(--ink)] hover:underline underline-offset-4 transition-colors leading-snug"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
