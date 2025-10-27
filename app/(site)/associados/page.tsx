import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";
import SociosGrid from "@/components/sections/socios/SociosGrid";

export const metadata: Metadata = {
  title: "Sócios ABPMC | ABPMC",
  description: "Conheça os sócios da ABPMC - Associação Brasileira de Psicologia e Medicina Comportamental.",
};

export default function AssociadosPage() {
  return (
    <>
      <HeaderInterno titulo="Sócios ABPMC" />
      <main className="max-w-[1280px] mx-auto px-4 md:px-6 py-16">
        <SociosGrid />
      </main>
    </>
  );
}
