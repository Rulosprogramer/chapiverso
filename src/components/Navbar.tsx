"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const LINKS = [
  { href: "#programa", label: "Programa" },
  { href: "#agenda", label: "Agenda" },
  { href: "#nosotros", label: "Nosotros" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#3D4FE0]/95 backdrop-blur-md py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="font-[family-name:var(--font-anton)] text-xl md:text-2xl text-white tracking-widest hover:text-[#F2E85C] transition-colors"
        >
          CHAPIVERSO
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-[family-name:var(--font-barlow)] text-sm font-medium text-white/70 hover:text-white transition-colors uppercase tracking-[0.15em]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://instagram.com/chapiverso"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 border border-[#556EFF] text-[#556EFF] text-sm font-[family-name:var(--font-barlow)] font-semibold uppercase tracking-widest hover:bg-[#556EFF] hover:text-white transition-all rounded-sm"
          >
            @chapiverso
          </a>
        </div>

        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-200 ${open ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-200 ${open ? "opacity-0 w-0" : ""}`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-200 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#3D4FE0]/98 backdrop-blur-xl border-t border-white/20 px-6 py-6 flex flex-col gap-5">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-[family-name:var(--font-barlow)] text-white/80 hover:text-white uppercase tracking-widest text-sm py-1"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://instagram.com/chapiverso"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#556EFF] uppercase tracking-widest text-sm font-semibold"
          >
            @chapiverso
          </a>
        </div>
      )}
    </nav>
  );
}
