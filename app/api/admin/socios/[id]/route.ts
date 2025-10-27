import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticação
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN")) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const socioId = parseInt(params.id);
    const body = await request.json();

    // Atualizar sócio
    const socioAtualizado = await prisma.associado.update({
      where: { id: socioId },
      data: {
        ...(body.visivelNoSite !== undefined && { visivelNoSite: body.visivelNoSite }),
        ...(body.curriculoLattes !== undefined && { curriculoLattes: body.curriculoLattes }),
      },
    });

    return NextResponse.json({ success: true, socio: socioAtualizado });
  } catch (error) {
    console.error("Erro ao atualizar sócio:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar sócio" },
      { status: 500 }
    );
  }
}
