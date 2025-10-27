import Image from "next/image";
import { tokens } from "@/lib/tokens";

export default function PageHero({ title }: { title: string }) {
  return (
    <section className="relative isolate">
      <div className="absolute inset-0 -z-10">
        <Image src="/images_estrutura/header_internas.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/35" />
      </div>
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <h1
          className="font-extrabold text-white"
          style={{ fontFamily: "var(--font-outfit)", fontSize: tokens.typography.pageTitle.size, lineHeight: tokens.typography.pageTitle.line }}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
