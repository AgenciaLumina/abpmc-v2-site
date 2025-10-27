import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import RenderHtml from '@/components/legacy/render-html';
import HeaderInterno from '@/components/layout/HeaderInterno';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function SinglePage({ params }: PageProps) {
  const page = await prisma.content.findUnique({
    where: {
      slug: params.slug,
      type: 'PAGE',
    },
  });

  if (!page) {
    notFound();
  }

  // Verificar se é a página de diretoria para aplicar estilos específicos
  const isDiretoria = params.slug === 'diretoria';

  return (
    <>
      <HeaderInterno titulo={page.title} />
      <main className="max-w-[1280px] mx-auto px-6 py-16 text-[#222] font-outfit leading-relaxed bg-[#fefefe]">
        <div className={isDiretoria ? "diretoria-section" : "prose prose-lg max-w-none"}>
          <RenderHtml html={page.html} />
        </div>
      </main>
    </>
  );
}

// export async function generateStaticParams() {
//   const pages = await prisma.content.findMany({
//     where: {
//       type: 'PAGE'
//     },
//     select: {
//       slug: true
//     }
//   })

//   return pages.map((page) => ({
//     slug: page.slug,
//   }))
// }
