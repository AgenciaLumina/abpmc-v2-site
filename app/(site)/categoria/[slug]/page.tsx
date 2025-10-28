import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PostsPagination from "@/components/pagination/PostsPagination";

export const dynamic = 'force-dynamic';

interface CategoriaPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function CategoriaPage({ params, searchParams }: CategoriaPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const postsPerPage = 10;
  // Buscar categoria
  const categoria = await prisma.term.findUnique({
    where: {
      slug: params.slug,
      taxonomy: "category",
    },
  });

  if (!categoria) {
    notFound();
  }

  // Contar total de posts
  const totalPosts = await prisma.content.count({
    where: {
      type: "POST",
      status: "publish",
      terms: {
        some: {
          termId: categoria.id,
        },
      },
    },
  });

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Buscar posts desta categoria com paginação
  const posts = await prisma.content.findMany({
    where: {
      type: "POST",
      status: "publish",
      terms: {
        some: {
          termId: categoria.id,
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
    skip: (currentPage - 1) * postsPerPage,
    take: postsPerPage,
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
      <HeaderInterno titulo={categoria.name} />
      
      <main className="bg-white">

        {/* Listagem de Posts */}
        <section className="py-20 px-6 md:px-16">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600">
                Nenhum conteúdo publicado nesta categoria ainda.
              </p>
              <Link
                href="/noticias"
                className="inline-block mt-4 text-[#2b4e6d] hover:underline"
              >
                ← Voltar para todas as notícias
              </Link>
            </div>
          ) : (
            <>
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
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                        </svg>
                      </div>

                      {/* Conteúdo do Card */}
                      <div className="p-6">
                        <span className="block text-sm text-[#2b4e6d] mb-2">
                          {categoria.name} / {formatDate(post.publishedAt)}
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
                          Ler Mais
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Paginação */}
              <PostsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl={`/categoria/${params.slug}`}
              />
            </>
          )}
        </section>
      </main>
    </>
  );
}
