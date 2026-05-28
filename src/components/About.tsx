const PILLARS = [
  { icon: "♫", label: "Música" },
  { icon: "🎭", label: "Teatro" },
  { icon: "✦", label: "Moda" },
  { icon: "◈", label: "Comunidad" },
  { icon: "🌱", label: "Huertas" },
  { icon: "★", label: "Circo" },
  { icon: "◆", label: "Bares" },
];

export default function About() {
  return (
    <section id="nosotros" className="bg-[#3D4FE0] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="font-[family-name:var(--font-barlow)] text-[#F2E85C] text-xs tracking-[0.35em] uppercase mb-5">
              Sobre el proyecto
            </p>
            <h2 className="font-[family-name:var(--font-anton)] text-5xl md:text-6xl xl:text-7xl text-white uppercase leading-[0.9] mb-8">
              UN BARRIO,
              <br />
              <span className="text-[#F2E85C]">MIL MUNDOS</span>
            </h2>
            <p className="font-[family-name:var(--font-barlow)] text-white/80 text-base md:text-lg leading-relaxed mb-5">
              Chapiverso es una plataforma de articulación cultural que conecta,
              visibiliza y potencia las diversas expresiones artísticas,
              identidades y sectores económicos de{" "}
              <strong className="text-white font-bold">La Playa</strong> en
              Chapinero Central.
            </p>
            <p className="font-[family-name:var(--font-barlow)] text-white/60 text-base leading-relaxed mb-8">
              A través de la co-creación de una agenda cultural viva y el diseño
              de experiencias híbridas e innovadoras, transformamos el espacio
              público y lo cotidiano en un punto de encuentro dinámico que
              promueve la circulación, la permanencia, el diálogo y la
              apropiación sostenible del territorio.
            </p>

            {/* Values row */}
            <div className="flex flex-wrap gap-3">
              {["Sostenibilidad", "Profesionalidad", "Honestidad", "Calidad"].map(
                (v) => (
                  <span
                    key={v}
                    className="px-4 py-1.5 border border-white/30 text-white/80 font-[family-name:var(--font-barlow)] text-xs uppercase tracking-widest rounded-full hover:border-white hover:text-white transition-all"
                  >
                    {v}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right */}
          <div>
            <p className="font-[family-name:var(--font-barlow)] text-white/50 text-xs tracking-[0.35em] uppercase mb-6">
              Nuestras disciplinas
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {PILLARS.map((p) => (
                <div
                  key={p.label}
                  className="flex flex-col items-center gap-2.5 py-5 px-3 rounded-xl border border-white/25 hover:border-white/60 hover:bg-white/10 transition-all cursor-default group"
                >
                  <span className="text-2xl leading-none group-hover:scale-110 transition-transform">
                    {p.icon}
                  </span>
                  <span className="font-[family-name:var(--font-barlow)] text-[10px] md:text-xs text-white/70 uppercase tracking-widest group-hover:text-white transition-colors text-center leading-tight">
                    {p.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Vision quote */}
            <div className="mt-8 p-6 border-l-4 border-[#F2E85C] bg-white/10 rounded-r-xl">
              <p className="font-[family-name:var(--font-barlow)] text-white/85 text-sm leading-relaxed italic">
                "Chapiverso será reconocido como el ecosistema cultural modelo
                de Bogotá para la integración y reactivación de territorios
                diversos."
              </p>
              <p className="font-[family-name:var(--font-barlow)] text-[#F2E85C] text-xs uppercase tracking-widest mt-3 font-semibold">
                Visión
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
