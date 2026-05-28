"use client";

import { useState } from "react";
import type { Activity } from "@/lib/activities";
import { formatShortDate, CATEGORY_CONFIG } from "@/lib/activities";

const ALL = "todas";

const CARD_CATEGORY_COLORS: Record<string, string> = {
  música: "bg-white/20 text-white border-white/30",
  teatro: "bg-[#EF2EF2]/20 text-[#F9AAFA] border-[#EF2EF2]/30",
  moda: "bg-[#f96814]/25 text-[#FFB380] border-[#f96814]/35",
  comunidad: "bg-green-400/20 text-green-200 border-green-300/30",
  huertas: "bg-emerald-400/20 text-emerald-200 border-emerald-300/30",
  circo: "bg-[#F2E85C]/20 text-[#F2E85C] border-[#F2E85C]/30",
  bares: "bg-purple-400/20 text-purple-200 border-purple-300/30",
};

export default function Schedule({ activities }: { activities: Activity[] }) {
  const [filter, setFilter] = useState<string>(ALL);

  const categories = [ALL, ...Array.from(new Set(activities.map((a) => a.category)))];

  const filtered =
    filter === ALL ? activities : activities.filter((a) => a.category === filter);

  const sorted = [...filtered].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <section id="agenda" className="bg-[#3D4FE0] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="font-[family-name:var(--font-barlow)] text-[#EF2EF2] text-xs tracking-[0.35em] uppercase mb-4 font-semibold">
            Todo el año
          </p>
          <h2 className="font-[family-name:var(--font-anton)] text-5xl md:text-6xl xl:text-8xl text-white uppercase leading-none">
            AGENDA
            <br />
            <span className="text-[#EF2EF2]">CHAPIVERSO</span>
          </h2>
          <p className="font-[family-name:var(--font-barlow)] text-white/70 text-base mt-4 max-w-xl">
            Actividades culturales cada fin de semana durante todo el año en La
            Playa, Chapinero Central.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const cfg = cat === ALL ? null : CATEGORY_CONFIG[cat];
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 font-[family-name:var(--font-barlow)] text-xs uppercase tracking-widest rounded-full border transition-all ${
                  isActive
                    ? "bg-[#F2E85C] text-[#3D4FE0] border-[#F2E85C] font-bold"
                    : "bg-transparent text-white/70 border-white/25 hover:border-white/50 hover:text-white"
                }`}
              >
                {cat === ALL ? "Todas" : cfg?.label ?? cat}
              </button>
            );
          })}
        </div>

        {/* Activity grid */}
        {sorted.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-[family-name:var(--font-barlow)] text-white/50 text-lg">
              No hay actividades programadas para esta categoría.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sorted.map((act) => {
              const cfg = CATEGORY_CONFIG[act.category];
              const catColor = CARD_CATEGORY_COLORS[act.category];
              return (
                <article
                  key={act.id}
                  className={`group relative p-6 bg-white/10 border rounded-xl hover:border-white/40 hover:bg-white/15 transition-all overflow-hidden ${
                    act.featured ? "border-[#F2E85C]/50" : "border-white/20"
                  }`}
                >
                  {act.featured && (
                    <div className="absolute top-0 right-0 px-3 py-1 bg-[#F2E85C] text-[#3D4FE0] text-[10px] font-[family-name:var(--font-barlow)] font-bold uppercase tracking-widest rounded-bl-lg rounded-tr-xl">
                      Destacado
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-[family-name:var(--font-anton)] text-[#F2E85C] text-3xl leading-none">
                        {formatShortDate(act.date)}
                      </p>
                      <p className="font-[family-name:var(--font-barlow)] text-white/50 text-xs uppercase tracking-wider mt-0.5">
                        {act.time} – {act.endTime}
                      </p>
                    </div>
                    {cfg && (
                      <span className="text-2xl leading-none opacity-80">
                        {cfg.icon}
                      </span>
                    )}
                  </div>

                  <h3 className="font-[family-name:var(--font-anton)] text-lg md:text-xl text-white uppercase leading-tight mb-2 group-hover:text-[#F2E85C] transition-colors">
                    {act.title}
                  </h3>

                  <p className="font-[family-name:var(--font-barlow)] text-white/50 text-xs uppercase tracking-wider mb-3">
                    📍 {act.location}
                  </p>

                  <p className="font-[family-name:var(--font-barlow)] text-white/75 text-sm leading-relaxed mb-4">
                    {act.description}
                  </p>

                  {cfg && (
                    <span
                      className={`inline-block px-3 py-1 border text-[10px] font-[family-name:var(--font-barlow)] uppercase tracking-wider rounded-full ${catColor ?? "bg-white/15 text-white border-white/25"}`}
                    >
                      {cfg.label}
                    </span>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
