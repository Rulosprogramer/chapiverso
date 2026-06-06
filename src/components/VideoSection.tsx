export default function VideoSection() {
  return (
    <section className="bg-[#08080F] py-0 overflow-hidden">
      {/* Top label */}
      <div className="bg-[#08080F] px-6 pt-16 pb-6 text-center">
        <p className="font-[family-name:var(--font-barlow)] text-[#F2E85C] text-xs tracking-[0.35em] uppercase font-semibold mb-3">
          Chapiverso en acción
        </p>
        <h2 className="font-[family-name:var(--font-anton)] text-4xl md:text-5xl xl:text-6xl text-white uppercase leading-none">
          EL TERRITORIO <span className="text-[#556EFF]">VIVE</span>
        </h2>
      </div>

      {/* Video — full width, loop, no controls */}
      <div className="relative w-full aspect-video max-h-[80vh]">
        <video
          src="/chapi-web.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Subtle gradient on top and bottom edges */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#08080F] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#08080F] to-transparent" />
        </div>
      </div>

      {/* Bottom strip */}
      <div className="bg-[#08080F] px-6 pb-16 pt-6 text-center">
        <p className="font-[family-name:var(--font-barlow)] text-white/30 text-xs uppercase tracking-[0.3em]">
          Sector de La Playa · Chapinero Central · Bogotá
        </p>
      </div>
    </section>
  );
}
