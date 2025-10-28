import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import PostsListClient from "@/components/admin/posts/PostsListClient";

export const metadata = {
  title: "Artigos e Notícias - Admin | ABPMC",
};

export default async function ArtigosNoticiasPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; category?: string; status?: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/auth/admin");
  }

  const currentPage = Number(searchParams.page) || 1;
  const limit = 20;
  const skip = (currentPage - 1) * limit;

  // Construir filtros
  const where: any = {
    type: "POST",
  };

  if (searchParams.status) {
    where.status = searchParams.status;
  }

  if (searchParams.search) {
    where.OR = [
      { title: { contains: searchParams.search, mode: "insensitive" } },
      { excerpt: { contains: searchParams.search, mode: "insensitive" } },
    ];
  }

  if (searchParams.category) {
    where.terms = {
      some: {
        term: {
          slug: searchParams.category,
        },
      },
    };
  }

  // Buscar posts e categorias
  const [posts, totalPosts, categories] = await Promise.all([
    prisma.content.findMany({
      where,
      skip,
      take: limit,
      orderBy: { publishedAt: "desc" },
      include: {
        terms: {
          include: {
            term: true,
          },
        },
      },
    }),
    prisma.content.count({ where }),
    prisma.term.findMany({
      where: { taxonomy: "category" },
      orderBy: { name: "asc" },
    }),
  ]);

  const totalPages = Math.ceil(totalPosts / limit);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-[#0B2E47]">
                Artigos e Notícias
              </h1>
              <p className="text-gray-600 mt-1">
                Gerencie todos os posts do site
              </p>
            </div>
            <Link
              href="/admin/artigos-noticias/novo"
              className="px-6 py-3 bg-[#22949e] hover:bg-[#1d7a82] text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Novo Post
            </Link>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <PostsListClient
          posts={posts}
          categories={categories}
          currentPage={currentPage}
          totalPages={totalPages}
          totalPosts={totalPosts}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
}
