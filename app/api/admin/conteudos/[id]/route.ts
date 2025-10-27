import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RouteContext {
  params: { id: string };
}

/**
 * GET /api/admin/conteudos/[id]
 * Busca um conteúdo por ID
 */
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const id = parseInt(context.params.id);
    
    const conteudo = await prisma.conteudoRestrito.findUnique({
      where: { id },
    });
    
    if (!conteudo) {
      return NextResponse.json(
        { error: "Conteúdo não encontrado" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ conteudo });
  } catch (error) {
    console.error("Erro ao buscar conteúdo:", error);
    return NextResponse.json(
      { error: "Erro ao buscar conteúdo" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * PUT /api/admin/conteudos/[id]
 * Atualiza um conteúdo
 */
export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const id = parseInt(context.params.id);
    const body = await request.json();
    
    const {
      titulo,
      corpo,
      categoria,
      tipo,
      visivelApenas,
      anexoUrl,
      thumbnailUrl,
      ativo,
    } = body;
    
    // Verificar se conteúdo existe
    const existing = await prisma.conteudoRestrito.findUnique({
      where: { id },
    });
    
    if (!existing) {
      return NextResponse.json(
        { error: "Conteúdo não encontrado" },
        { status: 404 }
      );
    }
    
    // Atualizar conteúdo
    const conteudo = await prisma.conteudoRestrito.update({
      where: { id },
      data: {
        titulo: titulo !== undefined ? titulo : undefined,
        corpo: corpo !== undefined ? corpo : undefined,
        categoria: categoria !== undefined ? categoria : undefined,
        tipo: tipo !== undefined ? tipo : undefined,
        visivelApenas: visivelApenas !== undefined ? visivelApenas : undefined,
        anexoUrl: anexoUrl !== undefined ? anexoUrl : undefined,
        thumbnailUrl: thumbnailUrl !== undefined ? thumbnailUrl : undefined,
        ativo: ativo !== undefined ? ativo : undefined,
      },
    });
    
    return NextResponse.json({ conteudo });
  } catch (error) {
    console.error("Erro ao atualizar conteúdo:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar conteúdo" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * DELETE /api/admin/conteudos/[id]
 * Deleta um conteúdo
 */
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const id = parseInt(context.params.id);
    
    // Verificar se conteúdo existe
    const existing = await prisma.conteudoRestrito.findUnique({
      where: { id },
    });
    
    if (!existing) {
      return NextResponse.json(
        { error: "Conteúdo não encontrado" },
        { status: 404 }
      );
    }
    
    // Deletar conteúdo
    await prisma.conteudoRestrito.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar conteúdo:", error);
    return NextResponse.json(
      { error: "Erro ao deletar conteúdo" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
