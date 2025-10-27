import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  getPaymentStatus,
  parseWebhookNotification,
  MercadoPagoPaymentStatus,
  MercadoPagoEventType,
} from "@/lib/mercadopago";
import { TransacaoStatus, AssociadoStatus } from "@prisma/client";
import { sendPaymentConfirmationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    // Obtém headers de validação
    const xSignature = req.headers.get("x-signature");
    const xRequestId = req.headers.get("x-request-id");
    
    const body = await req.json();
    const notification = parseWebhookNotification(body);

    // Log da notificação
    await prisma.logSistema.create({
      data: {
        tipo: "PAGAMENTO",
        mensagem: "Webhook recebido do Mercado Pago",
        dados: body,
      },
    });

    // Processa apenas notificações de pagamento
    if (notification.type !== MercadoPagoEventType.PAYMENT) {
      return NextResponse.json({ received: true });
    }

    // Busca detalhes do pagamento
    const paymentData = await getPaymentStatus(notification.data.id);

    // Busca a transação pelo external_reference
    const transacao = await prisma.transacao.findFirst({
      where: {
        id: parseInt(paymentData.external_reference),
      },
      include: {
        associado: {
          include: {
            plano: true,
          },
        },
      },
    });

    if (!transacao) {
      console.error("Transação não encontrada:", paymentData.external_reference);
      return NextResponse.json({ received: true });
    }

    // Atualiza a transação com o paymentId
    await prisma.transacao.update({
      where: { id: transacao.id },
      data: { paymentId: paymentData.id.toString() },
    });

    // Processa conforme o status do pagamento
    switch (paymentData.status) {
      case MercadoPagoPaymentStatus.APPROVED:
        await handleApprovedPayment(transacao, paymentData);
        break;

      case MercadoPagoPaymentStatus.REJECTED:
      case MercadoPagoPaymentStatus.CANCELLED:
        await handleRejectedPayment(transacao);
        break;

      case MercadoPagoPaymentStatus.REFUNDED:
      case MercadoPagoPaymentStatus.CHARGED_BACK:
        await handleRefundedPayment(transacao);
        break;

      default:
        // Pagamento em processo ou pendente
        await prisma.transacao.update({
          where: { id: transacao.id },
          data: {
            status: TransacaoStatus.PENDENTE,
          },
        });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erro ao processar webhook:", error);
    
    // Log do erro
    await prisma.logSistema.create({
      data: {
        tipo: "ERRO",
        mensagem: "Erro ao processar webhook do Mercado Pago",
        dados: { error: String(error) },
      },
    });

    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

/**
 * Processa pagamento aprovado
 */
async function handleApprovedPayment(transacao: any, paymentData: any) {
  // Calcula nova data de vencimento
  const duracaoDias = transacao.associado.plano?.duracaoDias || 365;
  const novoVencimento = new Date();
  novoVencimento.setDate(novoVencimento.getDate() + duracaoDias);

  // Atualiza transação
  await prisma.transacao.update({
    where: { id: transacao.id },
    data: {
      status: TransacaoStatus.APROVADO,
      dataPagamento: new Date(paymentData.date_approved),
    },
  });

  // Atualiza associado
  await prisma.associado.update({
    where: { id: transacao.associadoId },
    data: {
      status: AssociadoStatus.ATIVO,
      vencimento: novoVencimento,
      planoId: transacao.planoId,
    },
  });

  // Envia email de confirmação
  try {
    await sendPaymentConfirmationEmail(
      transacao.associado,
      transacao.valor,
      novoVencimento
    );
  } catch (error) {
    console.error("Erro ao enviar email de confirmação:", error);
  }

  // Log de sucesso
  await prisma.logSistema.create({
    data: {
      tipo: "PAGAMENTO",
      mensagem: "Pagamento aprovado",
      usuarioId: transacao.associadoId,
      dados: {
        transacaoId: transacao.id,
        valor: transacao.valor,
        novoVencimento,
      },
    },
  });
}

/**
 * Processa pagamento rejeitado
 */
async function handleRejectedPayment(transacao: any) {
  await prisma.transacao.update({
    where: { id: transacao.id },
    data: {
      status: TransacaoStatus.RECUSADO,
    },
  });

  await prisma.logSistema.create({
    data: {
      tipo: "PAGAMENTO",
      mensagem: "Pagamento recusado",
      usuarioId: transacao.associadoId,
      dados: { transacaoId: transacao.id },
    },
  });
}

/**
 * Processa reembolso
 */
async function handleRefundedPayment(transacao: any) {
  await prisma.transacao.update({
    where: { id: transacao.id },
    data: {
      status: TransacaoStatus.REEMBOLSADO,
    },
  });

  await prisma.logSistema.create({
    data: {
      tipo: "PAGAMENTO",
      mensagem: "Pagamento reembolsado",
      usuarioId: transacao.associadoId,
      dados: { transacaoId: transacao.id },
    },
  });
}
