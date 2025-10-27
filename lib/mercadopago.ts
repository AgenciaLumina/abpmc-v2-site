import { MercadoPagoConfig, Preference } from "mercadopago";
import { Associado, Plano } from "@prisma/client";

// Configuração do cliente Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || "",
  options: {
    timeout: 5000,
  },
});

const preference = new Preference(client);

/**
 * Cria uma preferência de pagamento no Mercado Pago
 */
export async function createPaymentPreference(
  associado: Associado,
  plano: Plano,
  transacaoId: number
) {
  try {
    const body = {
      items: [
        {
          id: plano.id.toString(),
          title: `Anuidade ABPMC - ${plano.nome}`,
          description: plano.descricao || `Anuidade ${plano.nome}`,
          quantity: 1,
          unit_price: plano.valor,
          currency_id: "BRL",
        },
      ],
      payer: {
        name: associado.nome,
        email: associado.email,
        phone: associado.telefone
          ? {
              number: associado.telefone,
            }
          : undefined,
        identification: associado.cpf
          ? {
              type: "CPF",
              number: associado.cpf,
            }
          : undefined,
        address: associado.endereco
          ? {
              street_name: associado.endereco,
              zip_code: associado.cep || undefined,
            }
          : undefined,
      },
      back_urls: {
        success: `${process.env.APP_URL}/associado/pagamento/sucesso`,
        failure: `${process.env.APP_URL}/associado/pagamento/falha`,
        pending: `${process.env.APP_URL}/associado/pagamento/pendente`,
      },
      auto_return: "approved" as const,
      external_reference: transacaoId.toString(),
      notification_url: `${process.env.APP_URL}/api/mercadopago/webhook`,
      statement_descriptor: "ABPMC ANUIDADE",
      payment_methods: {
        excluded_payment_types: [],
        installments: 12,
      },
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(), // 7 dias
    };

    const result = await preference.create({ body });
    
    return {
      id: result.id,
      initPoint: result.init_point,
      sandboxInitPoint: result.sandbox_init_point,
    };
  } catch (error) {
    console.error("Erro ao criar preferência de pagamento:", error);
    throw new Error("Erro ao processar pagamento");
  }
}

/**
 * Verifica o status de um pagamento
 */
export async function getPaymentStatus(paymentId: string) {
  try {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar status do pagamento");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar status do pagamento:", error);
    throw error;
  }
}

/**
 * Tipos de eventos do webhook
 */
export enum MercadoPagoEventType {
  PAYMENT = "payment",
  PLAN = "plan",
  SUBSCRIPTION = "subscription",
  INVOICE = "invoice",
  POINT_INTEGRATION = "point_integration_wh",
  CHARGEBACKS = "chargebacks",
}

/**
 * Status de pagamento do Mercado Pago
 */
export enum MercadoPagoPaymentStatus {
  PENDING = "pending",
  APPROVED = "approved",
  AUTHORIZED = "authorized",
  IN_PROCESS = "in_process",
  IN_MEDIATION = "in_mediation",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
  CHARGED_BACK = "charged_back",
}

/**
 * Valida assinatura do webhook
 */
export function validateWebhookSignature(
  xSignature: string,
  xRequestId: string,
  dataId: string
): boolean {
  // Implementar validação de assinatura quando necessário
  // Por enquanto, apenas verifica se os headers existem
  return !!(xSignature && xRequestId && dataId);
}

/**
 * Processa notificação do webhook
 */
export interface WebhookNotification {
  id: string;
  type: string;
  data: {
    id: string;
  };
}

export function parseWebhookNotification(body: any): WebhookNotification {
  return {
    id: body.id,
    type: body.type,
    data: {
      id: body.data?.id || body.data_id,
    },
  };
}
