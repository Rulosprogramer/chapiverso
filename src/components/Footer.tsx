export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2A3DB8] border-t border-white/15 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 mb-12">
          <div>
            <h3
              className="font-[family-name:var(--font-anton)] text-4xl md:text-6xl text-white uppercase leading-none mb-3"
            >
              CHAPIVERSO
            </h3>
            <p className="font-[family-name:var(--font-barlow)] text-white/50 text-sm uppercase tracking-widest">
              Bogotá · Chapinero Central
            </p>
          </div>
          <p className="font-[family-name:var(--font-barlow)] text-white/60 text-base md:text-lg italic max-w-sm md:text-right">
            Donde la cultura se encuentra,<br /> se transforma y se vive.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/15 mb-10" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap gap-6">
            {["Programa", "Agenda", "Nosotros"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-[family-name:var(--font-barlow)] text-white/50 text-xs uppercase tracking-widest hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com/chapiverso"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-barlow)] text-[#F2E85C] text-sm font-semibold uppercase tracking-widest hover:text-white transition-colors"
            >
              @chapiverso
            </a>
          </div>
        </div>

        <p className="font-[family-name:var(--font-barlow)] text-white/25 text-xs mt-8 text-center uppercase tracking-widest">
          © {year} Chapiverso · PULEP JKW113 · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
