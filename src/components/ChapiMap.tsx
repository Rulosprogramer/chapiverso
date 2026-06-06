import Image from "next/image";

export default function ChapiMap() {
  return (
    <section className="bg-[#556EFF] py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="font-[family-name:var(--font-barlow)] text-[#F2E85C] text-xs tracking-[0.35em] uppercase font-semibold mb-3">
            Sector de La Playa · Chapinero Central
          </p>
          <h2 className="font-[family-name:var(--font-anton)] text-4xl md:text-5xl xl:text-6xl text-white uppercase leading-none">
            MAPA <span className="text-[#F2E85C]">CHAPIVERSO</span>
          </h2>
          <p className="font-[family-name:var(--font-barlow)] text-white/60 text-sm md:text-base mt-3 max-w-xl mx-auto leading-relaxed">
            Recorre los espacios, artistas y colectivos que hacen parte del universo cultural de La Playa.
          </p>
        </div>

        {/* Map — full width, rounded */}
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-white/15">
          <Image
            src="/chapi-map.jpeg"
            alt="Mapa Chapiverso — Sector La Playa, Chapinero Central"
            width={1080}
            height={830}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Footer note */}
        <p className="text-center font-[family-name:var(--font-barlow)] text-white/35 text-xs uppercase tracking-widest mt-5">
          Más de 100 premios participando en las diferentes actividades del recorrido
        </p>
      </div>
    </section>
  );
}
