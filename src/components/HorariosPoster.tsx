import Image from "next/image";

export default function HorariosPoster() {
  return (
    <section className="bg-[#2A3DB8] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-[family-name:var(--font-barlow)] text-[#F2E85C] text-xs tracking-[0.35em] uppercase font-semibold mb-3">
            Programa Oficial
          </p>
          <h2 className="font-[family-name:var(--font-anton)] text-4xl md:text-5xl text-white uppercase leading-none">
            <span className="text-[#F2E85C]">CRONOGRAMA</span>
          </h2>
        </div>

        {/* Poster image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 w-full">
          <Image
            src="/horarios.png"
            alt="Cronograma oficial Chapiverso — 4, 5 y 6 de junio 2026"
            width={1980}
            height={1530}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Footer note */}
        <p className="text-center font-[family-name:var(--font-barlow)] text-white/40 text-xs uppercase tracking-widest mt-6">
          Entrada libre · Espacio público · Chapinero Central, Bogotá
        </p>
      </div>
    </section>
  );
}
