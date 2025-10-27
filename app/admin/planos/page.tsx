import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Gerenciar Planos - Painel Administrativo | ABPMC",
};

export default async function PlanosAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN")) {
    redirect("/admin/login");
  }

  // Buscar todos os planos
  const planos = await prisma.plano.findMany({
    include: {
      _count: {
        select: { associados: true },
      },
    },
    orderBy: { valor: "asc" },
  });

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Planos de Anuidade</h1>
          <p className="text-gray-400 mt-2">
            Gerenciar planos e valores de anuidade
          </p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium">
          + Novo Plano
        </button>
      </div>

      {/* Grid de Planos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {planos.map((plano) => (
          <div
            key={plano.id}
            className={`bg-gray-800 rounded-xl p-6 border ${
              plano.ativo ? "border-blue-500/50" : "border-gray-700"
            } relative overflow-hidden`}
          >
            {!plano.ativo && (
              <div className="absolute top-4 right-4">
                <span className="bg-red-500/20 text-red-400 text-xs px-3 py-1 rounded-full font-medium">
                  Inativo
                </span>
              </div>
            )}

            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white mb-2">
                {plano.nome}
              </h3>
              {plano.descricao && (
                <p className="text-sm text-gray-400">{plano.descricao}</p>
              )}
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">
                  R$ {plano.valor.toFixed(2)}
                </span>
                <span className="text-gray-400">/{plano.duracaoDias} dias</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {plano.recorrente ? "Renovação anual" : "Pagamento único"}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Associados</p>
                  <p className="text-lg font-semibold text-white">
                    {plano._count.associados}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Receita Potencial</p>
                  <p className="text-lg font-semibold text-white">
                    R$ {(plano.valor * plano._count.associados).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Editar
              </button>
              <button
                className={`flex-1 ${
                  plano.ativo
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-green-600 text-white hover:bg-green-700"
                } px-4 py-2 rounded-lg transition`}
              >
                {plano.ativo ? "Desativar" : "Ativar"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tabela Detalhada */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            Detalhes dos Planos
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900/50 border-b border-gray-700">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Plano
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Valor
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Duração
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Associados
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Receita
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Status
                </th>
                <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {planos.map((plano) => (
                <tr
                  key={plano.id}
                  className="border-b border-gray-700/50 hover:bg-gray-700/30 transition"
                >
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {plano.nome}
                      </p>
                      <p className="text-xs text-gray-400">
                        {plano.descricao || "Sem descrição"}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-semibold text-white">
                      R$ {plano.valor.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-300">
                      {plano.duracaoDias} dias
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-white">
                      {plano._count.associados}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-green-400">
                      R$ {(plano.valor * plano._count.associados).toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                        plano.ativo
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {plano.ativo ? "Ativo" : "Inativo"}
                    </span>
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      {session.user.role === "SUPERADMIN" && (
                        <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition">
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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
      </div>

      {/* Informações Adicionais */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            💡 Dicas para Planos
          </h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Mantenha no máximo 3-4 planos ativos para facilitar a escolha</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Planos desativados ainda mantêm associados existentes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Alterações de valor não afetam anuidades já pagas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Use descrições claras para diferenciar os planos</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            📊 Resumo Financeiro
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-blue-100 mb-1">Total de Planos</p>
              <p className="text-3xl font-bold text-white">{planos.length}</p>
            </div>
            <div>
              <p className="text-sm text-blue-100 mb-1">Planos Ativos</p>
              <p className="text-2xl font-bold text-white">
                {planos.filter((p) => p.ativo).length}
              </p>
            </div>
            <div>
              <p className="text-sm text-blue-100 mb-1">Valor Médio</p>
              <p className="text-2xl font-bold text-white">
                R${" "}
                {(
                  planos.reduce((sum, p) => sum + p.valor, 0) / planos.length
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
