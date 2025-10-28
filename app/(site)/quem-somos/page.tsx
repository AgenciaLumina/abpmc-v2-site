import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import RenderHtml from '@/components/legacy/render-html';
import HeaderInterno from '@/components/layout/HeaderInterno';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quem Somos | ABPMC",
  description: "Conheça a ABPMC - Associação Brasileira de Psicologia e Medicina Comportamental.",
};

export default async function QuemSomosPage() {
  const page = await prisma.content.findUnique({
    where: {
      slug: 'quem-somos',
      type: 'PAGE',
    },
  });

  if (!page) {
    notFound();
  }

  return (
    <>
      <HeaderInterno titulo={page.title} />
      <main className="max-w-[1280px] mx-auto px-6 py-16 text-[#222] font-outfit leading-relaxed bg-[#fefefe]">
        <div className="prose prose-lg max-w-none">
          <RenderHtml html={page.html} />
        </div>
      </main>
    </>
  );
}
