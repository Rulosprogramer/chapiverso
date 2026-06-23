"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const MARQUEE_ITEMS = [
  "MÚSICA", "TEATRO", "MODA", "COMUNIDAD", "HUERTAS", "CIRCO", "BARES",
  "MÚSICA", "TEATRO", "MODA", "COMUNIDAD", "HUERTAS", "CIRCO", "BARES",
];

export default function Hero() {
  const titleRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

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

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#556EFF]">

      {/* ── Background video ── */}
      <video
        ref={videoRef}
        src="/versoreel-web.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* ── Overlay: keeps text readable over the video ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-[#556EFF]/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(255,255,255,0.08),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#3D4FE0]/70 to-transparent" />
      </div>

      {/* ── Decorative sparkles ── */}
      <div className="absolute z-[2] top-[15%] left-[8%] text-[#EF2EF2] text-5xl md:text-7xl select-none" style={{ animation: "pulseGlow 3s ease-in-out infinite" }}>✦</div>
      <div className="absolute z-[2] top-[25%] right-[6%] text-[#EF2EF2] text-3xl md:text-5xl select-none" style={{ animation: "pulseGlow 3s ease-in-out infinite 1.2s" }}>✦</div>
      <div className="absolute z-[2] top-[55%] left-[3%] text-[#F2E85C] text-xl md:text-3xl opacity-70 select-none" style={{ animation: "pulseGlow 4s ease-in-out infinite 0.5s" }}>★</div>
      <div className="absolute z-[2] top-[40%] right-[3%] text-[#F2E85C] text-2xl opacity-50 select-none" style={{ animation: "pulseGlow 4s ease-in-out infinite 2s" }}>★</div>

      {/* ── Mute / unmute button ── */}
      <button
        onClick={toggleMute}
        aria-label={muted ? "Activar sonido" : "Silenciar"}
        className="absolute z-20 bottom-20 right-5 md:right-8 flex items-center gap-2 px-3 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white hover:bg-black/60 transition-all group"
        style={{ animation: "muteButtonPulse 2s ease-in-out infinite" }}
      >
        {muted ? (
          /* Speaker muted icon */
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : (
          /* Speaker on icon */
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
          </svg>
        )}
        <span className="font-[family-name:var(--font-barlow)] text-xs uppercase tracking-widest hidden sm:inline">
          {muted ? "Sonido" : "Silenciar"}
        </span>
      </button>

      {/* ── Institutional logos strip ── */}
      <div className="relative z-10 pt-20 md:pt-24 px-4 md:px-8 flex items-center justify-between">
        <Image
          src="/logo-mi-casa-white.png"
          alt="Mi Casa Es Mi Casa"
          width={4500}
          height={2515}
          className="w-24 md:w-32 h-auto opacity-90"
        />
        <p className="font-[family-name:var(--font-barlow)] text-[10px] md:text-xs text-white/50 tracking-[0.35em] uppercase">
          PULEP JKW113
        </p>
        <Image
          src="/logo-bogota-white.png"
          alt="Bogotá"
          width={4500}
          height={2445}
          className="w-24 md:w-32 h-auto opacity-90"
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pb-8 flex-1 justify-center">
        <p className="font-[family-name:var(--font-barlow)] text-sm md:text-base text-white/80 tracking-[0.25em] uppercase mb-1">
          Bienvenidos a
        </p>

        <h1
          ref={titleRef}
          className="w-[85vw] sm:w-[72vw] md:w-[62vw] lg:w-[54vw] xl:w-[46vw] mb-0 drop-shadow-2xl"
        >
          <Image
            src="/logo-chapiverso-white.png"
            alt="Chapiverso Bogotá | Agenda Cultural de Chapinero Central"
            width={8334}
            height={8334}
            className="w-full h-auto"
            priority
          />
        </h1>

        {/* Date badges */}
        <div className="flex flex-col items-center gap-1 mb-4 -mt-[5px]">
          <p className="font-[family-name:var(--font-barlow)] text-[#F2E85C] text-base md:text-lg tracking-[0.4em] uppercase font-semibold">
            JUNIO
          </p>
          <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center">
            {["4", "5", "6"].map((day) => (
              <span
                key={day}
                className="px-4 md:px-6 py-1.5 md:py-2 bg-[#F2E85C] text-[#3D4FE0] font-[family-name:var(--font-anton)] text-lg md:text-2xl rounded-full leading-none font-bold"
              >
                {day}
              </span>
            ))}
          </div>
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

      {/* ── Marquee strip ── */}
      <div className="relative z-10 overflow-hidden border-t border-b border-white/20 py-3 bg-[#3D4FE0]/50">
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
