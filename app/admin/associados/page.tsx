import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const metadata = {
  title: "Gerenciar Associados - Painel Administrativo | ABPMC",
};

export default async function AssociadosAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN")) {
    redirect("/admin/login");
  }

  // Buscar todos os associados
  const associados = await prisma.associado.findMany({
    include: {
      plano: true,
      _count: {
        select: { transacoes: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Associados</h1>
          <p className="text-gray-400 mt-2">
            Gerenciar todos os associados do sistema
          </p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium">
          + Novo Associado
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Nome ou email..."
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Status
            </label>
            <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="">Todos</option>
              <option value="ATIVO">Ativo</option>
              <option value="VENCIDO">Vencido</option>
              <option value="INATIVO">Inativo</option>
              <option value="BLOQUEADO">Bloqueado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Plano
            </label>
            <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="">Todos</option>
              <option value="1">Estudante</option>
              <option value="2">Associado</option>
              <option value="3">Institucional</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Filtrar
            </button>
          </div>
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Total</p>
          <p className="text-2xl font-bold text-white">{associados.length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Ativos</p>
          <p className="text-2xl font-bold text-green-400">
            {associados.filter((a) => a.status === "ATIVO").length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Vencidos</p>
          <p className="text-2xl font-bold text-red-400">
            {associados.filter((a) => a.status === "VENCIDO").length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Inativos</p>
          <p className="text-2xl font-bold text-gray-400">
            {associados.filter((a) => a.status === "INATIVO").length}
          </p>
        </div>
      </div>

      {/* Tabela de Associados */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900/50 border-b border-gray-700">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Associado
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Plano
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Vencimento
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Transações
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Cadastro
                </th>
                <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {associados.map((associado) => (
                <tr
                  key={associado.id}
                  className="border-b border-gray-700/50 hover:bg-gray-700/30 transition"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {associado.nome.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {associado.nome}
                        </p>
                        <p className="text-xs text-gray-400">
                          {associado.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-300">
                      {associado.plano?.nome || "Sem plano"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                        associado.status === "ATIVO"
                          ? "bg-green-500/20 text-green-400"
                          : associado.status === "VENCIDO"
                          ? "bg-red-500/20 text-red-400"
                          : associado.status === "BLOQUEADO"
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {associado.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {associado.vencimento ? (
                      <div>
                        <p className="text-sm text-white">
                          {new Date(associado.vencimento).toLocaleDateString(
                            "pt-BR"
                          )}
                        </p>
                        <p className="text-xs text-gray-400">
                          {Math.ceil(
                            (new Date(associado.vencimento).getTime() -
                              new Date().getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}{" "}
                          dias
                        </p>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">N/A</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-300">
                      {associado._count.transacoes}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-400">
                      {new Date(associado.createdAt).toLocaleDateString(
                        "pt-BR"
                      )}
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
                      <button className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg transition">
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
            Mostrando {associados.length} de {associados.length} associados
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
