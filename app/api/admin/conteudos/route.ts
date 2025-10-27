import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET /api/admin/conteudos
 * Lista conteúdos restritos com filtros
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const tipo = searchParams.get("tipo") || undefined;
    const visibilidade = searchParams.get("visibilidade") || undefined;
    const search = searchParams.get("search") || undefined;
    const ativo = searchParams.get("ativo");
    
    const skip = (page - 1) * limit;
    
    // Construir filtros
    const where: any = {};
    
    if (tipo) {
      where.tipo = tipo;
    }
    
    if (visibilidade) {
      where.visivelApenas = visibilidade;
    }
    
    if (ativo !== null && ativo !== undefined) {
      where.ativo = ativo === "true";
    }
    
    if (search) {
      where.OR = [
        { titulo: { contains: search, mode: "insensitive" } },
        { corpo: { contains: search, mode: "insensitive" } },
        { categoria: { contains: search, mode: "insensitive" } },
      ];
    }
    
    // Buscar conteúdos
    const [conteudos, total] = await Promise.all([
      prisma.conteudoRestrito.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.conteudoRestrito.count({ where }),
    ]);
    
    return NextResponse.json({
      conteudos,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Erro ao buscar conteúdos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar conteúdos" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * POST /api/admin/conteudos
 * Cria um novo conteúdo restrito
 */
export async function POST(request: NextRequest) {
  try {
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
    
    if (!titulo || !corpo) {
      return NextResponse.json(
        { error: "Título e corpo são obrigatórios" },
        { status: 400 }
      );
    }
    
    // Criar conteúdo
    const conteudo = await prisma.conteudoRestrito.create({
      data: {
        titulo,
        corpo,
        categoria: categoria || "Geral",
        tipo: tipo || "ARTIGO",
        visivelApenas: visivelApenas || "ASSOCIADOS",
        anexoUrl: anexoUrl || null,
        thumbnailUrl: thumbnailUrl || null,
        ativo: ativo !== undefined ? ativo : true,
      },
    });
    
    return NextResponse.json({ conteudo }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar conteúdo:", error);
    return NextResponse.json(
      { error: "Erro ao criar conteúdo" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
