import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { diasParaVencimento } from "@/lib/auth";
import Link from "next/link";

export const metadata = {
  title: "Dashboard - Área do Associado | ABPMC",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/associado/login");
  }

  // Busca dados do associado
  const associado = await prisma.associado.findUnique({
    where: { id: parseInt(session.user.id) },
    include: {
      plano: true,
      transacoes: {
        where: { status: "APROVADO" },
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!associado) {
    redirect("/associado/login");
  }

  const diasRestantes = diasParaVencimento(associado.vencimento);
  const anuVencendo = diasRestantes !== null && diasRestantes <= 30 && diasRestantes > 0;
  const anuVencida = diasRestantes !== null && diasRestantes < 0;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#0B2E47]">
          Olá, {associado.nome.split(" ")[0]}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Bem-vindo à sua área do associado ABPMC
        </p>
      </div>

      {/* Alertas */}
      {anuVencida && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Anuidade Vencida
              </h3>
              <p className="text-sm text-red-700 mt-1">
                Sua anuidade venceu há {Math.abs(diasRestantes!)} dias. Renove
                agora para manter o acesso completo aos benefícios.
              </p>
              <Link
                href="/associado/minha-anuidade"
                className="inline-block mt-3 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition"
              >
                Renovar Agora
              </Link>
            </div>
          </div>
        </div>
      )}

      {anuVencendo && !anuVencida && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-md">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Anuidade próxima do vencimento
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                Sua anuidade vence em {diasRestantes} dias (
                {associado.vencimento?.toLocaleDateString("pt-BR")}). Renove
                agora e evite a interrupção dos serviços.
              </p>
              <Link
                href="/associado/minha-anuidade"
                className="inline-block mt-3 px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-md hover:bg-yellow-700 transition"
              >
                Renovar Anuidade
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Status */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <p className="text-2xl font-semibold text-[#0B2E47]">
                {associado.status}
              </p>
            </div>
            <div
              className={`h-12 w-12 rounded-full flex items-center justify-center ${
                associado.status === "ATIVO"
                  ? "bg-green-100"
                  : "bg-red-100"
              }`}
            >
              <svg
                className={`w-6 h-6 ${
                  associado.status === "ATIVO"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                {associado.status === "ATIVO" ? (
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            </div>
          </div>
        </div>

        {/* Plano */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Plano</p>
              <p className="text-2xl font-semibold text-[#0B2E47]">
                {associado.plano?.nome || "Nenhum"}
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Vencimento */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Vencimento</p>
              <p className="text-xl font-semibold text-[#0B2E47]">
                {associado.vencimento
                  ? new Date(associado.vencimento).toLocaleDateString("pt-BR")
                  : "N/A"}
              </p>
              {diasRestantes !== null && diasRestantes > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  {diasRestantes} dias restantes
                </p>
              )}
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Últimas Transações */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-[#0B2E47] mb-4">
          Últimas Transações
        </h2>

        {associado.transacoes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Data
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Descrição
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Valor
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {associado.transacoes.map((transacao) => (
                  <tr key={transacao.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {transacao.dataPagamento
                        ? new Date(transacao.dataPagamento).toLocaleDateString(
                            "pt-BR"
                          )
                        : new Date(transacao.createdAt).toLocaleDateString(
                            "pt-BR"
                          )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {transacao.descricao}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      R$ {transacao.valor.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        {transacao.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            Nenhuma transação encontrada
          </p>
        )}

        <div className="mt-4 text-center">
          <Link
            href="/associado/minha-anuidade"
            className="text-sm text-[#22949e] hover:text-[#0B2E47] font-medium transition"
          >
            Ver histórico completo →
          </Link>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/associado/conteudos"
          className="bg-gradient-to-r from-[#2b4e6d] to-[#22949e] text-white rounded-lg p-6 hover:shadow-lg transition-all duration-300"
        >
          <h3 className="text-lg font-semibold mb-2">
            📚 Conteúdos Exclusivos
          </h3>
          <p className="text-white/90 text-sm">
            Acesse artigos, vídeos e materiais exclusivos para associados
          </p>
        </Link>

        <Link
          href="/associado/downloads"
          className="bg-gradient-to-r from-[#0B2E47] to-[#2b4e6d] text-white rounded-lg p-6 hover:shadow-lg transition-all duration-300"
        >
          <h3 className="text-lg font-semibold mb-2">📥 Downloads</h3>
          <p className="text-white/90 text-sm">
            Baixe documentos, certificados e materiais complementares
          </p>
        </Link>
      </div>
    </>
  );
}
