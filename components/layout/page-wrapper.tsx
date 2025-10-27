"use client";
import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#fefefe] text-[#222] font-outfit">
      {children || <p className="text-center py-20">Conteúdo indisponível.</p>}
    </main>
  );
}
