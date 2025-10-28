import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostEditForm from "@/components/admin/posts/PostEditForm";

export const metadata = {
  title: "Editar Post - Admin | ABPMC",
};

export default async function EditarPostPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/auth/admin");
  }

  const postId = parseInt(params.id);

  // Buscar post e categorias
  const [post, categories] = await Promise.all([
    prisma.content.findUnique({
      where: { id: postId },
      include: {
        terms: {
          include: {
            term: true,
          },
        },
      },
    }),
    prisma.term.findMany({
      where: { taxonomy: "category" },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-semibold text-[#0B2E47]">
            Editar Post
          </h1>
          <p className="text-gray-600 mt-1">
            Faça as alterações necessárias no post
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <PostEditForm post={post} categories={categories} />
      </div>
    </div>
  );
}
