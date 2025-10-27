import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Gerenciar Pagamentos - Painel Administrativo | ABPMC",
};

export default async function PagamentosAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN")) {
    redirect("/admin/login");
  }

  // Buscar todas as transações
  const transacoes = await prisma.transacao.findMany({
    include: {
      associado: {
        select: {
          nome: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  // Estatísticas
  const stats = {
    total: transacoes.length,
    aprovadas: transacoes.filter((t) => t.status === "APROVADO").length,
    pendentes: transacoes.filter((t) => t.status === "PENDENTE").length,
    recusadas: transacoes.filter((t) => t.status === "RECUSADO").length,
    valorTotal: transacoes
      .filter((t) => t.status === "APROVADO")
      .reduce((sum, t) => sum + t.valor, 0),
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Pagamentos</h1>
        <p className="text-gray-400 mt-2">
          Gerenciar todas as transações e pagamentos
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Transações</p>
              <p className="text-3xl font-bold text-white">{stats.total}</p>
            </div>
            <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Aprovadas</p>
              <p className="text-3xl font-bold text-green-400">{stats.aprovadas}</p>
            </div>
            <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Pendentes</p>
              <p className="text-3xl font-bold text-yellow-400">{stats.pendentes}</p>
            </div>
            <div className="h-12 w-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Valor Total</p>
              <p className="text-2xl font-bold text-white">
                R$ {stats.valorTotal.toFixed(2)}
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Status
            </label>
            <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="">Todos</option>
              <option value="APROVADO">Aprovado</option>
              <option value="PENDENTE">Pendente</option>
              <option value="RECUSADO">Recusado</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Método
            </label>
            <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="">Todos</option>
              <option value="mercadopago">Mercado Pago</option>
              <option value="transferencia">Transferência</option>
              <option value="boleto">Boleto</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Data Início
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Data Fim
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Aplicar Filtros
          </button>
          <button className="bg-gray-700 text-gray-300 px-6 py-2 rounded-lg hover:bg-gray-600 transition">
            Limpar
          </button>
          <button className="ml-auto bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Tabela de Transações */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900/50 border-b border-gray-700">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  ID
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Associado
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Descrição
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Valor
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Método
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Data
                </th>
                <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {transacoes.map((transacao) => (
                <tr
                  key={transacao.id}
                  className="border-b border-gray-700/50 hover:bg-gray-700/30 transition"
                >
                  <td className="py-4 px-6">
                    <span className="text-sm font-mono text-gray-400">
                      #{transacao.id}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {transacao.associado.nome}
                      </p>
                      <p className="text-xs text-gray-400">
                        {transacao.associado.email}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-300">
                      {transacao.descricao || "N/A"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-semibold text-white">
                      R$ {transacao.valor.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-300 capitalize">
                      {transacao.metodo}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                        transacao.status === "APROVADO"
                          ? "bg-green-500/20 text-green-400"
                          : transacao.status === "PENDENTE"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : transacao.status === "RECUSADO"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {transacao.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-sm text-white">
                        {new Date(transacao.createdAt).toLocaleDateString(
                          "pt-BR"
                        )}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(transacao.createdAt).toLocaleTimeString(
                          "pt-BR"
                        )}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      {transacao.comprovante && (
                        <button className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="bg-gray-900/50 px-6 py-4 flex items-center justify-between border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Mostrando {transacoes.length} de {transacoes.length} transações
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 transition disabled:opacity-50">
              Anterior
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 transition disabled:opacity-50">
              Próximo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
