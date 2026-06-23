import Image from "next/image";

type Logo = { src: string; alt: string; instagram?: string };

const LOGOS: Logo[] = [
  { src: "/logos-chapiverso/aguante.png",       alt: "Aguante",                    instagram: "https://instagram.com/aguante_barriocol" },
  { src: "/logos-chapiverso/almejorestilo.png",  alt: "Al Mejor Estilo",            instagram: "https://instagram.com/almejorestilomusic" },
  { src: "/logos-chapiverso/artestudio.png",     alt: "Artestudio",                 instagram: "https://instagram.com/artestudiobog" },
  { src: "/logos-chapiverso/artfem.png",         alt: "Artfem" },
  { src: "/logos-chapiverso/cineclub.png",       alt: "Cineclub" },
  { src: "/logos-chapiverso/circumbia.png",      alt: "Circumbia",                  instagram: "https://instagram.com/circumbia_balls" },
  { src: "/logos-chapiverso/conjuros.png",       alt: "Conjuros",                   instagram: "https://instagram.com/conjuros_accesorios" },
  { src: "/logos-chapiverso/crew.png",           alt: "Crew",                       instagram: "https://instagram.com/cr3w.house" },
  { src: "/logos-chapiverso/elparche.png",       alt: "El Parche" },
  { src: "/logos-chapiverso/horda.png",          alt: "Horda",                      instagram: "https://instagram.com/horda_free" },
  { src: "/logos-chapiverso/huerta.png",         alt: "Huerta",                     instagram: "https://instagram.com/huertascomunitariaschapinero" },
  { src: "/logos-chapiverso/kairos.png",         alt: "Kairos",                     instagram: "https://instagram.com/kairostropic" },
  { src: "/logos-chapiverso/karen.png",          alt: "Karen" },
  { src: "/logos-chapiverso/kimera.png",         alt: "Kimera",                     instagram: "https://instagram.com/kimera_crea" },
  { src: "/logos-chapiverso/latino.png",         alt: "Latino Power" },
  { src: "/logos-chapiverso/lucky.png",          alt: "Lucky",                      instagram: "https://instagram.com/luckybarbogota" },
  { src: "/logos-chapiverso/mariachis.png",      alt: "Mariachis" },
  { src: "/logos-chapiverso/paralaje.png",       alt: "Paralaje" },
  { src: "/logos-chapiverso/ragweed.png",        alt: "Ragweed",                    instagram: "https://instagram.com/ragw33dshop2" },
  { src: "/logos-chapiverso/relevent.png",       alt: "Relevent" },
  { src: "/logos-chapiverso/releventhall.png",   alt: "Relevent Music Hall",        instagram: "https://instagram.com/releventmusichall" },
  { src: "/logos-chapiverso/sucursal.png",       alt: "Sucursal",                   instagram: "https://instagram.com/lasucursalvenue" },
  { src: "/logos-chapiverso/wapz.png",           alt: "Wapz",                       instagram: "https://instagram.com/graffiti_wapz" },
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
          {LOGOS.map((logo) => {
            const content = (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={1000}
                height={1000}
                className="w-full h-full object-contain"
              />
            );
            return logo.instagram ? (
              <a
                key={logo.src}
                href={logo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-2 md:p-3 flex items-center justify-center aspect-square shadow-lg hover:scale-105 transition-transform duration-200"
              >
                {content}
              </a>
            ) : (
              <div
                key={logo.src}
                className="bg-white rounded-xl p-2 md:p-3 flex items-center justify-center aspect-square shadow-lg hover:scale-105 transition-transform duration-200"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
