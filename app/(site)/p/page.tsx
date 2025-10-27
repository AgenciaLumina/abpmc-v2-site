import { prisma } from '@/lib/prisma';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import HeaderInterno from "@/components/layout/HeaderInterno";
import NoticiaCard from "@/components/blog/NoticiaCard";

export default async function PostsPage() {
  const posts = await prisma.content.findMany({
    where: {
      type: 'POST',
      status: 'publish'
    },
    orderBy: {
      publishedAt: 'desc'
    },
    include: {
      terms: { select: { term: { select: { name: true } } } },
    },
  });

  return (
    <>
      <HeaderInterno titulo="Notícias" />
      
      <main className="max-w-[1280px] mx-auto px-6 py-20 bg-[#fefefe]">
        {posts.length === 0 ? (
          <p className="text-center text-[#666] text-[16px]">Nenhuma notícia encontrada.</p>
        ) : (
          <div className="flex flex-col gap-10">
            {posts.map((post: any) => {
              const cats = (post.terms || []).map((t: any) => t.term.name);
              const categoria = cats.length > 0 ? cats[0] : "Notícias";
              const data = post.publishedAt ? format(post.publishedAt, "MMMM d, yyyy", { locale: ptBR }) : "";

              return (
                <NoticiaCard
                  key={post.slug}
                  titulo={post.title}
                  categoria={categoria}
                  data={data}
                  link={`/p/${post.slug}`}
                />
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
