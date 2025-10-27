import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET /api/admin/posts
 * Lista posts com paginação e filtros
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status") || undefined;
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    
    const skip = (page - 1) * limit;
    
    // Construir filtros
    const where: any = {
      type: "POST",
    };
    
    if (status) {
      where.status = status;
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
      ];
    }
    
    if (category) {
      where.terms = {
        some: {
          term: {
            slug: category,
          },
        },
      };
    }
    
    // Buscar posts
    const [posts, total] = await Promise.all([
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
    ]);
    
    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return NextResponse.json(
      { error: "Erro ao buscar posts" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/posts
 * Cria um novo post
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { title, slug, html, excerpt, status, categoryIds } = body;
    
    if (!title || !slug) {
      return NextResponse.json(
        { error: "Título e slug são obrigatórios" },
        { status: 400 }
      );
    }
    
    // Verificar se slug já existe
    const existing = await prisma.content.findUnique({
      where: { slug },
    });
    
    if (existing) {
      return NextResponse.json(
        { error: "Já existe um post com este slug" },
        { status: 409 }
      );
    }
    
    // Criar post
    const post = await prisma.content.create({
      data: {
        type: "POST",
        title,
        slug,
        html: html || "",
        excerpt: excerpt || null,
        status: status || "publish",
        publishedAt: new Date(),
        author: "admin", // TODO: pegar do usuário logado
        terms: categoryIds
          ? {
              create: categoryIds.map((termId: number) => ({
                termId,
              })),
            }
          : undefined,
      },
      include: {
        terms: {
          include: {
            term: true,
          },
        },
      },
    });
    
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar post:", error);
    return NextResponse.json(
      { error: "Erro ao criar post" },
      { status: 500 }
    );
  }
}
