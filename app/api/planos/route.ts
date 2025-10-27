import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const planos = await prisma.plano.findMany({
      where: { ativo: true },
      orderBy: { valor: "asc" },
    });

    return NextResponse.json(planos);
  } catch (error) {
    console.error("Erro ao buscar planos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar planos" },
      { status: 500 }
    );
  }
}
