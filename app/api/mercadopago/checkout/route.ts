import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { createPaymentPreference } from "@/lib/mercadopago";
import { TransacaoStatus } from "@prisma/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // Verifica autenticação
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const { planoId } = await req.json();

    if (!planoId) {
      return NextResponse.json(
        { error: "planoId é obrigatório" },
        { status: 400 }
      );
    }

    // Busca o associado
    const associado = await prisma.associado.findUnique({
      where: { id: parseInt(session.user.id) },
    });

    if (!associado) {
      return NextResponse.json(
        { error: "Associado não encontrado" },
        { status: 404 }
      );
    }

    // Busca o plano
    const plano = await prisma.plano.findUnique({
      where: { id: planoId },
    });

    if (!plano) {
      return NextResponse.json(
        { error: "Plano não encontrado" },
        { status: 404 }
      );
    }

    if (!plano.ativo) {
      return NextResponse.json(
        { error: "Plano não está ativo" },
        { status: 400 }
      );
    }

    // Cria a transação no banco
    const transacao = await prisma.transacao.create({
      data: {
        associadoId: associado.id,
        planoId: plano.id,
        valor: plano.valor,
        status: TransacaoStatus.PENDENTE,
        metodo: "mercadopago",
        descricao: `Anuidade ${plano.nome}`,
        dataVencimento: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
      },
    });

    // Cria a preferência de pagamento no Mercado Pago
    const preference = await createPaymentPreference(
      associado,
      plano,
      transacao.id
    );

    // Atualiza a transação com o preferenceId
    await prisma.transacao.update({
      where: { id: transacao.id },
      data: { preferenceId: preference.id },
    });

    return NextResponse.json({
      success: true,
      transacaoId: transacao.id,
      preferenceId: preference.id,
      initPoint: preference.initPoint,
      sandboxInitPoint: preference.sandboxInitPoint,
    });
  } catch (error) {
    console.error("Erro ao criar checkout:", error);
    return NextResponse.json(
      { error: "Erro ao processar pagamento" },
      { status: 500 }
    );
  }
}
