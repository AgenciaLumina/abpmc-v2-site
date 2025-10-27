import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RouteContext {
  params: { id: string };
}

/**
 * GET /api/admin/posts/[id]
 * Busca um post por ID
 */
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const id = parseInt(context.params.id);
    
    const post = await prisma.content.findUnique({
      where: { id },
      include: {
        terms: {
          include: {
            term: true,
          },
        },
      },
    });
    
    if (!post) {
      return NextResponse.json(
        { error: "Post não encontrado" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ post });
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    return NextResponse.json(
      { error: "Erro ao buscar post" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/posts/[id]
 * Atualiza um post
 */
export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const id = parseInt(context.params.id);
    const body = await request.json();
    
    const { title, slug, html, excerpt, status, categoryIds } = body;
    
    // Verificar se post existe
    const existing = await prisma.content.findUnique({
      where: { id },
    });
    
    if (!existing) {
      return NextResponse.json(
        { error: "Post não encontrado" },
        { status: 404 }
      );
    }
    
    // Se mudou o slug, verificar se o novo slug já existe
    if (slug && slug !== existing.slug) {
      const slugExists = await prisma.content.findUnique({
        where: { slug },
      });
      
      if (slugExists) {
        return NextResponse.json(
          { error: "Já existe um post com este slug" },
          { status: 409 }
        );
      }
    }
    
    // Atualizar categorias se fornecidas
    if (categoryIds) {
      // Remover associações antigas
      await prisma.contentTerm.deleteMany({
        where: { contentId: id },
      });
      
      // Criar novas associações
      await prisma.contentTerm.createMany({
        data: categoryIds.map((termId: number) => ({
          contentId: id,
          termId,
        })),
      });
    }
    
    // Atualizar post
    const post = await prisma.content.update({
      where: { id },
      data: {
        title: title !== undefined ? title : undefined,
        slug: slug !== undefined ? slug : undefined,
        html: html !== undefined ? html : undefined,
        excerpt: excerpt !== undefined ? excerpt : undefined,
        status: status !== undefined ? status : undefined,
      },
      include: {
        terms: {
          include: {
            term: true,
          },
        },
      },
    });
    
    return NextResponse.json({ post });
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar post" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/posts/[id]
 * Deleta um post
 */
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const id = parseInt(context.params.id);
    
    // Verificar se post existe
    const existing = await prisma.content.findUnique({
      where: { id },
    });
    
    if (!existing) {
      return NextResponse.json(
        { error: "Post não encontrado" },
        { status: 404 }
      );
    }
    
    // Deletar post (cascade vai deletar as associações)
    await prisma.content.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    return NextResponse.json(
      { error: "Erro ao deletar post" },
      { status: 500 }
    );
  }
}
