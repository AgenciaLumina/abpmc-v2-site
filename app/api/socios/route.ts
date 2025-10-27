import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const socios = await prisma.associado.findMany({
      where: {
        visivelNoSite: true,
        status: "ATIVO",
      },
      select: {
        id: true,
        nome: true,
        email: true,
        curriculoLattes: true,
      },
      orderBy: {
        nome: "asc",
      },
    });

    return NextResponse.json({ socios });
  } catch (error: any) {
    console.error("❌ Erro ao buscar sócios:", error);
    return NextResponse.json(
      { error: "Erro ao buscar sócios", details: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
