const BG_INTERNAL = "/images_estrutura/header_internas.jpg";

export default function DiretoriaHero() {
  return (
    <section
      id="hero-diretoria"
      role="banner"
      aria-label="Cabeçalho da página Diretoria"
      className="relative min-h-[320px] md:min-h-[380px] lg:min-h-[420px] overflow-hidden pt-[80px]"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%), url('${BG_INTERNAL}')`,
        backgroundPosition: "top right",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 h-full flex items-end">
        <h1 
          className="text-white font-extrabold leading-[1.05] tracking-tight py-12"
          style={{ fontSize: "clamp(42px, 6vw, 64px)" }}
        >
          Diretoria
        </h1>
      </div>
    </section>
  );
}
