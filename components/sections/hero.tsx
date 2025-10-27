import Image from "next/image";
import Link from "next/link";

export default function Hero({
  bgImage = "/images_estrutura/hero_home.jpg",
}: { bgImage?: string }) {
  return (
    <section className="relative isolate min-h-[600px]">
      <div className="absolute inset-0 -z-10">
        <Image src={bgImage} alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-16 flex items-start">
        <h1 className="text-white font-extrabold tracking-tight leading-tight text-[44px] md:text-[72px]">
          <span style={{ color: "#01C2CE" }}>XXIV</span> ENCONTRO<br />
          DA ABPMC<span style={{ color: "#01C2CE" }}>.</span>
        </h1>
      </div>
    </section>
  );
}
