"use client";

const BG_INTERNAL = "/images_estrutura/header_internas.jpg";

export default function HeaderInterno({ titulo }: { titulo: string }) {
  return (
    <>
      {/* Hero com imagem de fundo e título */}
      <div
        className="relative w-full pt-[70px]"
        style={{
          backgroundImage: `url('${BG_INTERNAL}'), linear-gradient(180deg, #0F3142 0%, #102A38 100%)`,
          backgroundSize: "cover",
          backgroundPosition: "top right",
          backgroundColor: "#0F3142",
        }}
      >
        {/* Overlay translúcido */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        {/* Título centralizado */}
        <div className="relative z-10 text-center px-6 py-20 md:py-28">
          <h1 className="text-[50px] font-bold text-white font-outfit leading-tight">
            {titulo}
          </h1>
        </div>
      </div>
    </>
  );
}
