import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Comportamento em Foco | ABPMC",
  description: "Artigos e conteúdos especializados sobre análise do comportamento.",
};

export default async function ComportamentoEmFocoPage() {
  // Buscar posts da categoria "Comportamento em Foco"
  const posts = await prisma.content.findMany({
    where: {
      type: "POST",
      status: "publish",
      terms: {
        some: {
          term: {
            name: {
              contains: "Comportamento em Foco",
              mode: "insensitive",
            },
          },
        },
      },
    },
    include: {
      terms: {
        include: {
          term: true,
        },
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
  });

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <HeaderInterno titulo="Comportamento em Foco" />
      
      <main className="bg-white">
        {/* Introdução */}
        <section className="py-20 px-6 md:px-16">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-lg leading-relaxed">
              Artigos especializados, análises aprofundadas e conteúdos exclusivos sobre 
              Análise do Comportamento, trazendo reflexões atuais e relevantes para a área.
            </p>
          </div>
        </section>

        {/* Bloco Gradiente */}
        <section className="w-full bg-gradient-to-b from-[#0B2E47] to-[#163B56] py-[60px] text-center text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-2">Artigos Publicados</h2>
            <p className="max-w-3xl mx-auto text-base text-[#E8EEF3]">
              Explore os artigos da seção Comportamento em Foco
            </p>
          </div>
        </section>

        {/* Listagem de Artigos */}
        <section className="py-20 px-6 md:px-16">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600">
                Nenhum artigo publicado nesta categoria ainda.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Use o painel admin para adicionar conteúdo à categoria "Comportamento em Foco"
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {posts.map((post) => {
                return (
                  <article 
                    key={post.id}
                    className="bg-white border border-[#e6e8ef] rounded-2xl shadow-[0_10px_32px_rgba(2,12,27,.05)] overflow-hidden hover:shadow-[0_20px_50px_rgba(2,12,27,.1)] transition-shadow"
                  >
                    {/* Imagem do Post - Placeholder */}
                    <div className="relative w-full h-56 bg-gradient-to-br from-[#0B2E47] to-[#22949e] flex items-center justify-center">
                      <svg className="w-16 h-16 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>

                    {/* Conteúdo do Card */}
                    <div className="p-6">
                      <span className="block text-sm text-[#2b4e6d] mb-2">
                        Comportamento em Foco / {formatDate(post.publishedAt)}
                      </span>
                      <h2 className="text-xl font-semibold text-[#0F265C] mb-3">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-[#5a6575] mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      <Link 
                        href={`/p/${post.slug}`}
                        className="inline-block bg-[#2b4e6d] hover:bg-[#22949e] text-white rounded-full px-6 py-2 text-sm font-medium transition-colors"
                      >
                        Ler Artigo
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
