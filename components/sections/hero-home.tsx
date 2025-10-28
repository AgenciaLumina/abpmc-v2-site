"use client";
import Image from "next/image";
import Link from "next/link";

export default function HeroHome() {
  return (
    <section
      className="relative h-[690px] flex items-center justify-center text-center text-white pt-[70px]"
      style={{
        backgroundImage: "url('/images_estrutura/hero_home.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 px-6">
        <h1 className="text-[72px] leading-[1.1] font-extrabold">
          <span style={{ color: "#01C2CE" }}>XXIV</span> ENCONTRO<br />
          DA ABPMC<span style={{ color: "#01C2CE" }}>.</span>
        </h1>
        <p className="mt-6 text-lg">
          De 03 a 06 de setembro de 2025, na Faculdade São Judas, unidade Mooca – SP.
        </p>
        <Link
          href="/inscricao"
          className="inline-flex items-center justify-center px-10 py-3 mt-8 border border-white rounded-full text-white hover:bg-white hover:text-black transition-all"
        >
          Participe
        </Link>
      </div>
    </section>
  );
}
