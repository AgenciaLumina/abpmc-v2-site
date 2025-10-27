import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "12");
    
    const posts = await prisma.content.findMany({
      where: {
        type: "POST",
        status: "publish",
        ...(category && {
          terms: {
            some: {
              term: {
                slug: category,
              },
            },
          },
        }),
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
      take: limit,
    });

    // Formatar resposta
    const postsFormatados = posts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || "",
      html: post.html,
      publishedAt: post.publishedAt,
      author: post.author,
      categories: post.terms.map((ct) => ({
        id: ct.term.id,
        name: ct.term.name,
        slug: ct.term.slug,
      })),
    }));

    return NextResponse.json(postsFormatados);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return NextResponse.json(
      { error: "Erro ao buscar posts" },
      { status: 500 }
    );
  }
}
