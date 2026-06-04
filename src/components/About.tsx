const PILLARS = [
  { icon: "♫",  label: "Música" },
  { icon: "🎭", label: "Teatro" },
  { icon: "✦",  label: "Moda" },
  { icon: "🤝", label: "Comunidad" },
  { icon: "🌱", label: "Huertas" },
  { icon: "🎪", label: "Circo" },
  { icon: "🍺", label: "Bares" },
];

const IMPACTS = [
  {
    number: "01",
    title: "Agenda cultural articulada",
    desc: "20 a 30 actores culturales, comunitarios y comerciales del territorio co-construyendo una programación cultural común.",
  },
  {
    number: "02",
    title: "500 – 800 asistentes",
    desc: "Impacto directo en 3 días de activación cultural. Habitantes, visitantes y transeúntes que permanecen y reconocen la oferta del barrio.",
  },
  {
    number: "03",
    title: "Identidades y apropiación",
    desc: "Visibilización de músicas populares, juventudes, emprendimientos y sectores LGBTIQ+ como parte del tejido cultural de La Playa.",
  },
  {
    number: "04",
    title: "Espacio público activado",
    desc: "Intervenciones híbridas e inmersivas en espacios estratégicos del territorio que reactiván simbólica y económicamente el sector.",
  },
  {
    number: "05",
    title: "Memorias del territorio",
    desc: "Registros audiovisuales, entrevistas, publicaciones digitales y relatos comunitarios que documentan las prácticas culturales del barrio.",
  },
];

export default function About() {
  return (
    <section id="nosotros" className="bg-[#3D4FE0] py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Top grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">

          {/* Left — text */}
          <div>
            <p className="font-[family-name:var(--font-barlow)] text-[#F2E85C] text-xs tracking-[0.35em] uppercase mb-5 font-semibold">
              Sobre el proyecto
            </p>
            <h2 className="font-[family-name:var(--font-anton)] text-5xl md:text-6xl xl:text-7xl text-white uppercase leading-[0.9] mb-8">
              UN BARRIO,
              <br />
              <span className="text-[#F2E85C]">UN UNIVERSO</span>
            </h2>

            <p className="font-[family-name:var(--font-barlow)] text-white/85 text-base md:text-lg leading-relaxed mb-5">
              El territorio de <strong className="text-white">La Playa en Chapinero Central</strong> se
              configura como un ecosistema cultural vivo: zona musical, espacio LGBTIQ+,
              distrito creativo, territorio de memoria, lugar de comercio y punto de
              encuentro cotidiano.
            </p>
            <p className="font-[family-name:var(--font-barlow)] text-white/65 text-base leading-relaxed mb-5">
              Esta riqueza evidencia una necesidad central de articulación entre actores,
              prácticas y espacios. Chapiverso surge como respuesta a la fragmentación
              existente: fortalece el trabajo en red, genera diálogo intergeneracional,
              activa la circulación de saberes y sistematiza memorias locales.
            </p>
            <p className="font-[family-name:var(--font-barlow)] text-white/65 text-base leading-relaxed mb-8">
              A través de formatos híbridos e innovadores —recorridos culturales, muestras
              en proceso, intervenciones en espacio público y cruces entre música, danza,
              teatro, moda y prácticas comunitarias— transformamos lo cotidiano en
              experiencias colectivas significativas.
            </p>

            {/* Valores */}
            <div className="flex flex-wrap gap-2">
              {["Articulación", "Co-creación", "Memoria", "Territorio", "Diversidad", "Sostenibilidad"].map((v) => (
                <span
                  key={v}
                  className="px-4 py-1.5 border border-white/25 text-white/70 font-[family-name:var(--font-barlow)] text-xs uppercase tracking-widest rounded-full hover:border-white hover:text-white transition-all"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Right — disciplines + objective */}
          <div>
            <p className="font-[family-name:var(--font-barlow)] text-white/50 text-xs tracking-[0.35em] uppercase mb-6">
              Disciplinas del ecosistema
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
              {PILLARS.map((p) => (
                <div
                  key={p.label}
                  className="flex flex-col items-center gap-2.5 py-5 px-3 rounded-xl border border-white/20 hover:border-white/50 hover:bg-white/10 transition-all cursor-default group"
                >
                  <span className="text-2xl leading-none group-hover:scale-110 transition-transform">
                    {p.icon}
                  </span>
                  <span className="font-[family-name:var(--font-barlow)] text-[10px] md:text-xs text-white/60 uppercase tracking-widest group-hover:text-white transition-colors text-center leading-tight">
                    {p.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Objetivo oficial */}
            <div className="p-6 border-l-4 border-[#F2E85C] bg-white/8 rounded-r-xl">
              <p className="font-[family-name:var(--font-barlow)] text-white/85 text-sm leading-relaxed italic">
                "Conectar las múltiples identidades, actores, espacios y expresiones
                culturales de La Playa, mediante la construcción de una agenda cultural
                articulada que genere experiencias artísticas, significativas y de encuentro,
                fortaleciendo la apropiación, la circulación y la sostenibilidad del
                ecosistema cultural del territorio."
              </p>
              <p className="font-[family-name:var(--font-barlow)] text-[#F2E85C] text-xs uppercase tracking-widest mt-3 font-semibold">
                Objetivo General · Chapiverso
              </p>
            </div>
          </div>
        </div>

        {/* ── Impact strip ── */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <p className="font-[family-name:var(--font-barlow)] text-[#F2E85C] text-xs tracking-[0.35em] uppercase font-semibold">
              Impacto esperado
            </p>
            <div className="flex-1 h-px bg-white/15" />
            <div className="flex gap-6">
              <div className="text-center">
                <p className="font-[family-name:var(--font-anton)] text-white text-2xl leading-none">30</p>
                <p className="font-[family-name:var(--font-barlow)] text-white/40 text-[10px] uppercase tracking-widest mt-1">
                  Beneficiarios directos
                </p>
              </div>
              <div className="text-center">
                <p className="font-[family-name:var(--font-anton)] text-white text-2xl leading-none">89</p>
                <p className="font-[family-name:var(--font-barlow)] text-white/40 text-[10px] uppercase tracking-widest mt-1">
                  Beneficiarios indirectos
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {IMPACTS.map((item) => (
              <div
                key={item.number}
                className="p-5 bg-white/8 border border-white/12 rounded-xl hover:bg-white/12 hover:border-white/25 transition-all group"
              >
                <p className="font-[family-name:var(--font-anton)] text-[#F2E85C] text-3xl leading-none mb-3 group-hover:scale-105 transition-transform origin-left">
                  {item.number}
                </p>
                <p className="font-[family-name:var(--font-barlow)] text-white text-sm font-semibold mb-2 uppercase tracking-wide leading-tight">
                  {item.title}
                </p>
                <p className="font-[family-name:var(--font-barlow)] text-white/55 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
