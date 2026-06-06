"use client";

import { useRef, useState } from "react";

export default function ChapiGirlsVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  function handleEnded() {
    setPlaying(false);
  }

  return (
    <section className="bg-[#2A3DB8] py-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="font-[family-name:var(--font-barlow)] text-[#F2E85C] text-xs tracking-[0.35em] uppercase font-semibold mb-3">
            Chapiverso · Moda &amp; Cultura
          </p>
          <h2 className="font-[family-name:var(--font-anton)] text-4xl md:text-5xl xl:text-6xl text-white uppercase leading-none">
            CHAPI<span className="text-[#EF2EF2]">GIRLS</span>
          </h2>
        </div>

        {/* Video player */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black group">
          <video
            ref={videoRef}
            src="/chapigirls-web.mp4"
            onEnded={handleEnded}
            onClick={handlePlay}
            className="w-full aspect-video object-cover cursor-pointer"
            preload="metadata"
          />

          {/* Play / Pause overlay — visible when paused */}
          {!playing && (
            <button
              onClick={handlePlay}
              aria-label="Reproducir video"
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40 hover:bg-black/50 transition-all"
            >
              {/* Play circle */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#EF2EF2]/90 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform">
                <svg className="w-9 h-9 md:w-11 md:h-11 text-white translate-x-1" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
              <span className="font-[family-name:var(--font-barlow)] text-white/80 text-sm uppercase tracking-widest">
                Reproducir
              </span>
            </button>
          )}

          {/* Pause overlay — visible when playing, on hover */}
          {playing && (
            <button
              onClick={handlePlay}
              aria-label="Pausar video"
              className="absolute inset-0 flex items-center justify-center bg-transparent opacity-0 hover:opacity-100 hover:bg-black/20 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
                </svg>
              </div>
            </button>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center font-[family-name:var(--font-barlow)] text-white/30 text-xs uppercase tracking-widest mt-5">
          Sector de La Playa · Chapinero Central · Bogotá
        </p>
      </div>
    </section>
  );
}
