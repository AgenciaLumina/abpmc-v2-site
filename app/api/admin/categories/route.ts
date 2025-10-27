import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET /api/admin/categories
 * Lista todas as categorias
 */
export async function GET() {
  try {
    const categories = await prisma.term.findMany({
      where: {
        taxonomy: "category",
      },
      include: {
        _count: {
          select: {
            contents: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
    
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return NextResponse.json(
      { error: "Erro ao buscar categorias" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/categories
 * Cria uma nova categoria
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug } = body;
    
    if (!name || !slug) {
      return NextResponse.json(
        { error: "Nome e slug são obrigatórios" },
        { status: 400 }
      );
    }
    
    // Verificar se slug já existe
    const existing = await prisma.term.findUnique({
      where: { slug },
    });
    
    if (existing) {
      return NextResponse.json(
        { error: "Já existe uma categoria com este slug" },
        { status: 409 }
      );
    }
    
    // Criar categoria
    const category = await prisma.term.create({
      data: {
        taxonomy: "category",
        name,
        slug,
      },
    });
    
    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    return NextResponse.json(
      { error: "Erro ao criar categoria" },
      { status: 500 }
    );
  }
}
