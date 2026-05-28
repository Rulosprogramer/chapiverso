"use client";

import { useEffect, useRef } from "react";

const MARQUEE_ITEMS = [
  "MÚSICA", "TEATRO", "MODA", "COMUNIDAD", "HUERTAS", "CIRCO", "BARES",
  "MÚSICA", "TEATRO", "MODA", "COMUNIDAD", "HUERTAS", "CIRCO", "BARES",
];

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    setTimeout(() => {
      el.style.transition = "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#556EFF]">
      {/* Subtle radial overlay for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(255,255,255,0.12),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#3D4FE0]/60 to-transparent" />
      </div>

      {/* Decorative sparkles */}
      <div className="absolute top-[15%] left-[8%] text-[#EF2EF2] text-5xl md:text-7xl select-none" style={{ animation: "pulseGlow 3s ease-in-out infinite" }}>✦</div>
      <div className="absolute top-[25%] right-[6%] text-[#EF2EF2] text-3xl md:text-5xl select-none" style={{ animation: "pulseGlow 3s ease-in-out infinite 1.2s" }}>✦</div>
      <div className="absolute top-[55%] left-[3%] text-[#F2E85C] text-xl md:text-3xl opacity-70 select-none" style={{ animation: "pulseGlow 4s ease-in-out infinite 0.5s" }}>★</div>
      <div className="absolute top-[40%] right-[3%] text-[#F2E85C] text-2xl opacity-50 select-none" style={{ animation: "pulseGlow 4s ease-in-out infinite 2s" }}>★</div>
      {/* Extra decorative dots */}
      <div className="absolute top-[10%] right-[25%] text-white/20 text-4xl select-none">◦</div>
      <div className="absolute top-[70%] left-[15%] text-white/15 text-3xl select-none">◦</div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-8 flex-1 justify-center">
        <p className="font-[family-name:var(--font-barlow)] text-xs md:text-sm text-white/60 tracking-[0.4em] uppercase mb-3">
          PULEP JKW113 · Bogotá, Colombia
        </p>
        <p className="font-[family-name:var(--font-barlow)] text-sm md:text-base text-white/80 tracking-[0.25em] uppercase mb-1">
          Bienvenidos a
        </p>

        <h1
          ref={titleRef}
          className="font-[family-name:var(--font-anton)] text-[18vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] text-white uppercase leading-[0.85] tracking-tight my-3"
          style={{
            textShadow: "0 4px 30px rgba(0,0,30,0.25)",
          }}
        >
          CHAPIVERSO
        </h1>

        <p className="font-[family-name:var(--font-barlow)] text-lg md:text-2xl text-[#F2E85C] italic mt-1 mb-6 font-medium">
          Bogotá
        </p>

        {/* Date badges */}
        <div className="flex items-center gap-2 md:gap-3 mb-4 flex-wrap justify-center">
          {["4", "5", "6"].map((day, i) => (
            <span
              key={day}
              className="px-4 md:px-6 py-1.5 md:py-2 bg-[#F2E85C] text-[#3D4FE0] font-[family-name:var(--font-anton)] text-lg md:text-2xl rounded-full leading-none font-bold"
            >
              {i === 0 ? `JUNIO ${day}` : day}
            </span>
          ))}
        </div>

        <p className="font-[family-name:var(--font-barlow)] text-xs md:text-sm text-white/70 tracking-[0.25em] uppercase mb-5">
          Sector de La Playa · Chapinero Central
        </p>

        <p className="font-[family-name:var(--font-barlow)] text-base md:text-lg text-white/90 max-w-xl leading-relaxed mb-10">
          Donde la cultura se encuentra,<br className="hidden sm:block" /> se transforma y se vive
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#programa"
            className="px-8 py-3.5 bg-[#F2E85C] text-[#3D4FE0] font-[family-name:var(--font-barlow)] font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-[#556EFF] transition-all rounded-sm"
          >
            Ver Programa
          </a>
          <a
            href="#nosotros"
            className="px-8 py-3.5 border-2 border-white/60 text-white font-[family-name:var(--font-barlow)] font-semibold uppercase tracking-widest text-sm hover:bg-white hover:text-[#556EFF] transition-all rounded-sm"
          >
            Conocer el Proyecto
          </a>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative z-10 overflow-hidden border-t border-b border-white/20 py-3 bg-[#3D4FE0]/40">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {MARQUEE_ITEMS.map((item, i) => (
            <span
              key={i}
              className="font-[family-name:var(--font-anton)] text-white/80 text-base md:text-lg mx-6 uppercase tracking-[0.2em]"
            >
              {item}
              <span className="text-[#F2E85C] mx-3">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
