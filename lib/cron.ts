import cron from "node-cron";
import { prisma } from "./prisma";
import { sendExpirationWarningEmail } from "./email";
import { AssociadoStatus } from "@prisma/client";

/**
 * Verifica anuidades próximas do vencimento e envia alertas
 * Executa diariamente às 9h
 */
export function startExpirationCheckJob() {
  // Executa todos os dias às 09:00
  cron.schedule("0 9 * * *", async () => {
    console.log("[CRON] Iniciando verificação de vencimentos...");

    try {
      const hoje = new Date();
      const daquiA7Dias = new Date();
      daquiA7Dias.setDate(hoje.getDate() + 7);

      const daquiA30Dias = new Date();
      daquiA30Dias.setDate(hoje.getDate() + 30);

      // Busca associados com vencimento próximo (7 ou 30 dias)
      const associados = await prisma.associado.findMany({
        where: {
          status: AssociadoStatus.ATIVO,
          vencimento: {
            gte: hoje,
            lte: daquiA30Dias,
          },
        },
      });

      console.log(`[CRON] ${associados.length} associados com vencimento próximo`);

      // Envia e-mails de aviso
      for (const associado of associados) {
        if (!associado.vencimento) continue;

        const diasRestantes = Math.ceil(
          (associado.vencimento.getTime() - hoje.getTime()) /
            (1000 * 60 * 60 * 24)
        );

        // Envia aviso em 30, 15, 7 e 3 dias antes do vencimento
        if ([30, 15, 7, 3].includes(diasRestantes)) {
          try {
            await sendExpirationWarningEmail(associado, diasRestantes);

            console.log(
              `[CRON] Email enviado para ${associado.email} (${diasRestantes} dias)`
            );

            // Log no sistema
            await prisma.logSistema.create({
              data: {
                tipo: "INFO",
                mensagem: `Email de aviso de vencimento enviado`,
                usuarioId: associado.id,
                dados: { diasRestantes },
              },
            });
          } catch (error) {
            console.error(
              `[CRON] Erro ao enviar email para ${associado.email}:`,
              error
            );
          }
        }
      }

      // Atualiza status de associados com anuidade vencida
      const resultado = await prisma.associado.updateMany({
        where: {
          status: AssociadoStatus.ATIVO,
          vencimento: {
            lt: hoje,
          },
        },
        data: {
          status: AssociadoStatus.VENCIDO,
        },
      });

      if (resultado.count > 0) {
        console.log(`[CRON] ${resultado.count} associados marcados como vencidos`);

        await prisma.logSistema.create({
          data: {
            tipo: "SISTEMA",
            mensagem: `${resultado.count} associados marcados como vencidos`,
          },
        });
      }

      console.log("[CRON] Verificação de vencimentos concluída");
    } catch (error) {
      console.error("[CRON] Erro na verificação de vencimentos:", error);

      await prisma.logSistema.create({
        data: {
          tipo: "ERRO",
          mensagem: "Erro na verificação automática de vencimentos",
          dados: { error: String(error) },
        },
      });
    }
  });

  console.log("✓ Job de verificação de vencimentos iniciado (diariamente às 9h)");
}

/**
 * Limpa logs antigos (mantém últimos 90 dias)
 * Executa semanalmente aos domingos às 3h
 */
export function startLogCleanupJob() {
  // Executa aos domingos às 03:00
  cron.schedule("0 3 * * 0", async () => {
    console.log("[CRON] Iniciando limpeza de logs antigos...");

    try {
      const data90DiasAtras = new Date();
      data90DiasAtras.setDate(data90DiasAtras.getDate() - 90);

      const resultado = await prisma.logSistema.deleteMany({
        where: {
          createdAt: {
            lt: data90DiasAtras,
          },
        },
      });

      console.log(`[CRON] ${resultado.count} logs antigos removidos`);

      await prisma.logSistema.create({
        data: {
          tipo: "SISTEMA",
          mensagem: `Limpeza automática de logs: ${resultado.count} registros removidos`,
        },
      });
    } catch (error) {
      console.error("[CRON] Erro na limpeza de logs:", error);
    }
  });

  console.log("✓ Job de limpeza de logs iniciado (semanalmente aos domingos)");
}

/**
 * Inicializa todos os jobs CRON
 */
export function startAllCronJobs() {
  console.log("\n🕐 Iniciando CRON Jobs...");
  startExpirationCheckJob();
  startLogCleanupJob();
  console.log("✓ Todos os CRON jobs iniciados com sucesso\n");
}
