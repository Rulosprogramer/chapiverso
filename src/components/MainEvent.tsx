"use client";

import { useState } from "react";

type DayActivity = {
  time: string;
  title: string;
  category: string;
  location: string;
  description: string;
};

type Day = {
  date: string;
  label: string;
  activities: DayActivity[];
};

const CATEGORY_COLORS: Record<string, string> = {
  música: "bg-white/20 text-white border-white/30",
  moda: "bg-[#f96814]/30 text-[#FFB380] border-[#f96814]/40",
  circo: "bg-[#F2E85C]/20 text-[#F2E85C] border-[#F2E85C]/30",
  comunidad: "bg-green-400/20 text-green-200 border-green-300/30",
  huertas: "bg-emerald-400/20 text-emerald-200 border-emerald-300/30",
  teatro: "bg-[#EF2EF2]/20 text-[#F9AAFA] border-[#EF2EF2]/30",
  bares: "bg-purple-400/20 text-purple-200 border-purple-300/30",
};

export default function MainEvent({ days }: { days: Day[] }) {
  const [activeDay, setActiveDay] = useState(0);
  const day = days[activeDay];

  return (
    <section id="programa" className="bg-[#556EFF] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <p className="font-[family-name:var(--font-barlow)] text-[#F2E85C] text-xs tracking-[0.35em] uppercase mb-4 font-semibold">
              Evento Principal
            </p>
            <h2 className="font-[family-name:var(--font-anton)] text-5xl md:text-6xl xl:text-8xl text-white uppercase leading-none">
              JUNIO
              <br />
              <span className="text-[#F2E85C]">4 · 5 · 6</span>
            </h2>
          </div>
          <div className="text-right">
            <p className="font-[family-name:var(--font-barlow)] text-white/70 text-sm uppercase tracking-widest">
              Sector de La Playa
            </p>
            <p className="font-[family-name:var(--font-barlow)] text-white/40 text-xs uppercase tracking-widest mt-1">
              Chapinero Central, Bogotá
            </p>
          </div>
        </div>

        {/* Day tabs */}
        <div className="flex gap-2 md:gap-4 mb-10 overflow-x-auto pb-2">
          {days.map((d, i) => (
            <button
              key={d.date}
              onClick={() => setActiveDay(i)}
              className={`flex-shrink-0 px-6 py-3 font-[family-name:var(--font-anton)] text-sm md:text-base uppercase tracking-wider rounded-sm transition-all ${
                activeDay === i
                  ? "bg-[#F2E85C] text-[#3D4FE0]"
                  : "bg-white/15 text-white hover:bg-white/25 border border-white/20"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Activities for selected day */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {day.activities.map((act, i) => (
            <div
              key={i}
              className="group p-5 md:p-6 bg-white/10 border border-white/20 rounded-xl hover:border-white/40 hover:bg-white/15 transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="font-[family-name:var(--font-anton)] text-[#F2E85C] text-2xl leading-none">
                  {act.time}
                </span>
                <span
                  className={`px-3 py-1 border text-[10px] font-[family-name:var(--font-barlow)] uppercase tracking-wider rounded-full flex-shrink-0 ${
                    CATEGORY_COLORS[act.category] ?? "bg-white/15 text-white border-white/25"
                  }`}
                >
                  {act.category}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-anton)] text-xl md:text-2xl text-white uppercase leading-tight mb-2 group-hover:text-[#F2E85C] transition-colors">
                {act.title}
              </h3>
              <p className="font-[family-name:var(--font-barlow)] text-white/60 text-xs uppercase tracking-widest mb-2">
                📍 {act.location}
              </p>
              <p className="font-[family-name:var(--font-barlow)] text-white/75 text-sm leading-relaxed">
                {act.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-12 p-6 md:p-8 bg-[#F2E85C] rounded-xl text-center">
          <p className="font-[family-name:var(--font-anton)] text-[#3D4FE0] text-2xl md:text-4xl uppercase mb-2">
            Entrada Libre · Espacio Público
          </p>
          <p className="font-[family-name:var(--font-barlow)] text-[#3D4FE0]/70 text-sm uppercase tracking-widest font-medium">
            Sector de La Playa · Chapinero Central · Bogotá
          </p>
        </div>
      </div>
    </section>
  );
}
