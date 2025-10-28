import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Configurações - Admin | ABPMC",
};

export default async function ConfiguracoesPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/auth/admin");
  }

  // Buscar configurações do sistema
  const configuracoes = await prisma.configuracaoSistema.findMany({
    orderBy: { chave: "asc" },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-semibold text-[#0B2E47]">
            Configurações do Sistema
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie as configurações gerais da plataforma
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Informações do Sistema */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#0B2E47] mb-4">
            Informações do Sistema
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Versão</p>
                  <p className="text-lg font-semibold text-gray-900">2.0.0</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-lg font-semibold text-green-600">Online</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Última Atualização</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date().toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Configurações Gerais */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#0B2E47]">
              Configurações Gerais
            </h2>
            <button className="px-4 py-2 bg-[#22949e] hover:bg-[#1d7a82] text-white rounded-lg font-medium transition-colors">
              Salvar Alterações
            </button>
          </div>

          <div className="space-y-6">
            {/* Nome do Site */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Site
              </label>
              <input
                type="text"
                defaultValue="ABPMC - Associação Brasileira de Psicologia e Medicina Comportamental"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22949e] focus:border-transparent"
              />
            </div>

            {/* E-mail de Contato */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail de Contato
              </label>
              <input
                type="email"
                defaultValue="contato@abpmc.org.br"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22949e] focus:border-transparent"
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <input
                type="tel"
                defaultValue="(11) 1234-5678"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22949e] focus:border-transparent"
              />
            </div>

            {/* Endereço */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endereço
              </label>
              <textarea
                rows={3}
                defaultValue="São Paulo, SP - Brasil"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22949e] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Configurações de E-mail */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#0B2E47] mb-4">
            Configurações de E-mail
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Servidor SMTP
                </label>
                <input
                  type="text"
                  placeholder="smtp.exemplo.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22949e] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Porta
                </label>
                <input
                  type="number"
                  placeholder="587"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22949e] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Usuário
                </label>
                <input
                  type="text"
                  placeholder="usuario@exemplo.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22949e] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22949e] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="ssl"
                className="w-4 h-4 text-[#22949e] border-gray-300 rounded focus:ring-[#22949e]"
              />
              <label htmlFor="ssl" className="text-sm text-gray-700">
                Usar SSL/TLS
              </label>
            </div>
          </div>
        </div>

        {/* Configurações de Pagamento */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#0B2E47] mb-4">
            Configurações de Pagamento
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mercado Pago - Access Token
              </label>
              <input
                type="password"
                placeholder="APP_USR-••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22949e] focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Token de acesso do Mercado Pago para processar pagamentos
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sandbox"
                defaultChecked
                className="w-4 h-4 text-[#22949e] border-gray-300 rounded focus:ring-[#22949e]"
              />
              <label htmlFor="sandbox" className="text-sm text-gray-700">
                Modo Sandbox (Teste)
              </label>
            </div>
          </div>
        </div>

        {/* Configurações Armazenadas */}
        {configuracoes.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-[#0B2E47] mb-4">
              Configurações Armazenadas no Banco
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Chave
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Valor
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Tipo
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Descrição
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {configuracoes.map((config) => (
                    <tr key={config.id}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {config.chave}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {config.valor.length > 50
                          ? `${config.valor.substring(0, 50)}...`
                          : config.valor}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {config.tipo}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {config.descricao || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {configuracoes.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhuma Configuração Armazenada
              </h3>
              <p className="text-gray-600">
                As configurações serão criadas automaticamente conforme o uso do sistema
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
