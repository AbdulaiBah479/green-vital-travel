"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CurrencySwitcher from "./CurrencySwitcher";
import { useWishlist } from "@/lib/WishlistContext";

const links = [
  { label: "Home", href: "/", id: "" },
  { label: "About Us", href: "/about", id: "" },
  { label: "Our Services", href: "/services", id: "" },
  { label: "Contact Us", href: "/contact", id: "" },
  { label: "Brochure", href: "/#brochure", id: "brochure" },
  { label: "Career", href: "/#career", id: "career" },
];

const aboutLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Travel Insurance", href: "/insurance" },
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "Corporate Travel", href: "/groups" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const hasDarkHero = pathname === "/";
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const { count } = useWishlist();
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasDarkHero) return;
    const onScroll = () => {
      const threshold = Math.min(window.innerHeight * 0.75, 560);
      setScrolledPastHero(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasDarkHero]);

  useEffect(() => {
    const sections = links
      .filter((l) => l.id)
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const others = Array.from(document.body.children).filter(
      (el) => el.tagName !== "HEADER"
    );
    others.forEach((el) => {
      if (open) el.setAttribute("inert", "");
      else el.removeAttribute("inert");
    });

    return () => {
      document.body.style.overflow = "";
      others.forEach((el) => el.removeAttribute("inert"));
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setAboutOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!aboutOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [aboutOpen]);

  const dark = !hasDarkHero || scrolledPastHero || open;

  const isActive = (link: (typeof links)[number]) =>
    link.id ? activeId === link.id : pathname.startsWith(link.href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        dark
          ? "border-b border-ink/10 bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 sm:px-10">
        <Link
          href="/#top"
          data-cursor-hover
          aria-label="Green Vital — home"
          className="shrink-0 py-1"
        >
          <span className="inline-flex items-center rounded-xl bg-paper px-3 py-2 shadow-sm lg:px-4 lg:py-3">
            <Image
              src="/brand-logo.png"
              alt="Green Vital"
              width={963}
              height={982}
              className="h-24 w-auto lg:h-36"
              priority
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap text-xs eyebrow uppercase transition-colors ${
                isActive(link)
                  ? dark
                    ? "text-accent-deep"
                    : "text-accent"
                  : dark
                    ? "text-ink/70 hover:text-ink"
                    : "text-paper/80 hover:text-paper"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="relative" ref={aboutRef}>
            <button
              type="button"
              onClick={() => setAboutOpen((o) => !o)}
              aria-expanded={aboutOpen}
              aria-haspopup="true"
              className={`whitespace-nowrap text-xs eyebrow uppercase transition-colors ${
                dark ? "text-ink/70 hover:text-ink" : "text-paper/80 hover:text-paper"
              }`}
            >
              About ▾
            </button>
            <div
              className={`absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-2xl border border-ink/10 bg-paper py-2 shadow-xl transition-all duration-200 ${
                aboutOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
              }`}
            >
              {aboutLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setAboutOpen(false)}
                  className="block px-4 py-3 text-sm text-ink/70 transition-colors hover:bg-paper-dim hover:text-accent-deep"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <CurrencySwitcher dark={dark} />
          </div>

          <Link
            href="/wishlist"
            aria-label={`Wishlist${count > 0 ? ` (${count} saved)` : ""}`}
            data-cursor-hover
            className={`relative hidden h-9 w-9 items-center justify-center rounded-full transition-colors lg:flex ${
              dark ? "text-ink/70 hover:text-ink" : "text-paper/80 hover:text-paper"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden="true">
              <path d="M12 21s-7-4.6-9.5-9C.6 8.4 2 4.8 5.4 4.1 7.6 3.6 9.9 4.6 12 7c2.1-2.4 4.4-3.4 6.6-2.9C22 4.8 23.4 8.4 21.5 12 19 16.4 12 21 12 21Z" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-2 text-[9px] font-bold text-ink">
                {count}
              </span>
            )}
          </Link>

          <Link
            href="/planner"
            className="hidden whitespace-nowrap rounded-full bg-accent px-5 py-2.5 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft lg:inline-block"
          >
            Plan a Trip
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`h-px w-6 transition-transform duration-300 ${
                open ? "bg-paper" : dark ? "bg-ink" : "bg-paper"
              } ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-6 transition-transform duration-300 ${
                open ? "bg-paper" : dark ? "bg-ink" : "bg-paper"
              } ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 flex h-dvh flex-col overflow-y-auto bg-ink px-6 py-28 text-paper transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-4">
          {[...links, ...aboutLinks].map((link, i) => (
            <Link
              key={`${link.href}-${i}`}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              className={`font-serif text-2xl italic transition-all duration-500 sm:text-3xl ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              } ${"id" in link && link.id && activeId === link.id ? "text-accent" : "text-paper"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-10 flex items-center gap-4">
          <Link
            href="/wishlist"
            onClick={() => setOpen(false)}
            className="text-xs eyebrow uppercase text-paper/70 hover:text-paper"
          >
            Wishlist {count > 0 ? `(${count})` : ""}
          </Link>
          <span className="text-paper/30">·</span>
          <div className="text-paper">
            <CurrencySwitcher dark={false} />
          </div>
        </div>
        <Link
          href="/planner"
          onClick={() => setOpen(false)}
          className="mt-8 inline-block w-fit rounded-full bg-accent px-7 py-3 text-xs eyebrow uppercase text-ink"
        >
          Plan a Trip
        </Link>
      </div>
    </header>
  );
}
