import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";
import DiretoriaIntro from "@/components/sections/diretoria/DiretoriaIntro";
import DiretoriaBoards from "@/components/sections/diretoria/DiretoriaBoards";

export const metadata: Metadata = {
  title: "Diretoria | ABPMC",
  description: "Conheça a Diretoria, Conselho Consultivo e Conselho Fiscal da ABPMC.",
};

export default function DiretoriaPage() {
  return (
    <>
      <HeaderInterno titulo="Diretoria" />
      <main>
        <DiretoriaIntro />
        <DiretoriaBoards />
      </main>
    </>
  );
}
