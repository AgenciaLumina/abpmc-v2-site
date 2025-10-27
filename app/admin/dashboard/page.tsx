import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Dashboard - Painel Administrativo | ABPMC",
};

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN")) {
    redirect("/admin/login");
  }

  // Buscar estatísticas
  const [
    totalAssociados,
    associadosAtivos,
    associadosVencidos,
    totalTransacoes,
    transacoesAprovadas,
    receitaMes,
    receitaTotal,
    ultimasTransacoes,
  ] = await Promise.all([
    prisma.associado.count(),
    prisma.associado.count({ where: { status: "ATIVO" } }),
    prisma.associado.count({ where: { status: "VENCIDO" } }),
    prisma.transacao.count(),
    prisma.transacao.count({ where: { status: "APROVADO" } }),
    prisma.transacao.aggregate({
      where: {
        status: "APROVADO",
        dataPagamento: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
      _sum: { valor: true },
    }),
    prisma.transacao.aggregate({
      where: { status: "APROVADO" },
      _sum: { valor: true },
    }),
    prisma.transacao.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        associado: {
          select: { nome: true, email: true },
        },
      },
    }),
  ]);

  const taxaSucesso = totalTransacoes > 0 
    ? ((transacoesAprovadas / totalTransacoes) * 100).toFixed(1)
    : "0";

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Visão geral do sistema ABPMC
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Associados */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Associados</p>
              <p className="text-3xl font-bold text-white">{totalAssociados}</p>
              <p className="text-green-400 text-sm mt-2">
                {associadosAtivos} ativos
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Receita do Mês */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Receita do Mês</p>
              <p className="text-3xl font-bold text-white">
                R$ {(receitaMes._sum.valor || 0).toFixed(2)}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {new Date().toLocaleDateString("pt-BR", { month: "long" })}
              </p>
            </div>
            <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Transações */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Transações</p>
              <p className="text-3xl font-bold text-white">{totalTransacoes}</p>
              <p className="text-green-400 text-sm mt-2">
                {taxaSucesso}% aprovadas
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Associados Vencidos */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Anuidades Vencidas</p>
              <p className="text-3xl font-bold text-white">{associadosVencidos}</p>
              <p className="text-red-400 text-sm mt-2">
                Atenção necessária
              </p>
            </div>
            <div className="h-12 w-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Informação */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Receita Total */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-lg font-semibold">Receita Total</h3>
            <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <p className="text-4xl font-bold text-white mb-2">
            R$ {(receitaTotal._sum.valor || 0).toFixed(2)}
          </p>
          <p className="text-blue-100 text-sm">
            {transacoesAprovadas} pagamentos aprovados
          </p>
        </div>

        {/* Status Geral */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white text-lg font-semibold mb-4">
            Status dos Associados
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-green-400 rounded-full" />
                <span className="text-gray-300">Ativos</span>
              </div>
              <span className="text-white font-semibold">{associadosAtivos}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-red-400 rounded-full" />
                <span className="text-gray-300">Vencidos</span>
              </div>
              <span className="text-white font-semibold">{associadosVencidos}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-gray-400 rounded-full" />
                <span className="text-gray-300">Outros</span>
              </div>
              <span className="text-white font-semibold">
                {totalAssociados - associadosAtivos - associadosVencidos}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Últimas Transações */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">
          Últimas Transações
        </h2>

        {ultimasTransacoes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                    Associado
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                    Data
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                    Valor
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                    Método
                  </th>
                </tr>
              </thead>
              <tbody>
                {ultimasTransacoes.map((transacao) => (
                  <tr key={transacao.id} className="border-b border-gray-700/50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm text-white font-medium">
                          {transacao.associado.nome}
                        </p>
                        <p className="text-xs text-gray-400">
                          {transacao.associado.email}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-300">
                      {new Date(transacao.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-white">
                      R$ {transacao.valor.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          transacao.status === "APROVADO"
                            ? "bg-green-500/20 text-green-400"
                            : transacao.status === "PENDENTE"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {transacao.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-300 capitalize">
                      {transacao.metodo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">
            Nenhuma transação encontrada
          </p>
        )}
      </div>
    </>
  );
}
