import Image from "next/image";

const LOGOS = [
  { src: "/logos-chapiverso/aguante.png",       alt: "Aguante" },
  { src: "/logos-chapiverso/almejorestilo.png",  alt: "Al Mejor Estilo" },
  { src: "/logos-chapiverso/artestudio.png",     alt: "Artestudio" },
  { src: "/logos-chapiverso/artfem.png",         alt: "Artfem" },
  { src: "/logos-chapiverso/cineclub.png",       alt: "Cineclub" },
  { src: "/logos-chapiverso/circumbia.png",      alt: "Circumbia" },
  { src: "/logos-chapiverso/conjuros.png",       alt: "Conjuros" },
  { src: "/logos-chapiverso/crew.png",           alt: "Crew" },
  { src: "/logos-chapiverso/elparche.png",       alt: "El Parche" },
  { src: "/logos-chapiverso/horda.png",          alt: "Horda" },
  { src: "/logos-chapiverso/huerta.png",         alt: "Huerta" },
  { src: "/logos-chapiverso/kairos.png",         alt: "Kairos" },
  { src: "/logos-chapiverso/karen.png",          alt: "Karen" },
  { src: "/logos-chapiverso/kimera.png",         alt: "Kimera" },
  { src: "/logos-chapiverso/latino.png",         alt: "Latino Power" },
  { src: "/logos-chapiverso/lucky.png",          alt: "Lucky" },
  { src: "/logos-chapiverso/mariachis.png",      alt: "Mariachis" },
  { src: "/logos-chapiverso/paralaje.png",       alt: "Paralaje" },
  { src: "/logos-chapiverso/ragweed.png",        alt: "Ragweed" },
  { src: "/logos-chapiverso/relevent.png",       alt: "Relevent" },
  { src: "/logos-chapiverso/releventhall.png",   alt: "Relevent Music Hall" },
  { src: "/logos-chapiverso/sucursal.png",       alt: "Sucursal" },
  { src: "/logos-chapiverso/wapz.png",           alt: "Wapz" },
];

export default function Logos() {
  return (
    <section className="bg-[#556EFF] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-[family-name:var(--font-barlow)] text-[#F2E85C] text-xs tracking-[0.35em] uppercase font-semibold mb-3">
            Quiénes hacen posible el Chapiverso
          </p>
          <h2 className="font-[family-name:var(--font-anton)] text-4xl md:text-5xl xl:text-6xl text-white uppercase leading-none">
            ALIADOS &amp; COLECTIVOS
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4">
          {LOGOS.map((logo) => (
            <div
              key={logo.src}
              className="bg-white rounded-xl p-2 md:p-3 flex items-center justify-center aspect-square shadow-lg hover:scale-105 transition-transform duration-200"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={1000}
                height={1000}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
