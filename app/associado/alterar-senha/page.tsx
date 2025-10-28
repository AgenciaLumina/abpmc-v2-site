import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Alterar Senha - Área do Associado | ABPMC",
};

export default async function AlterarSenhaPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/associado");
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#0B2E47]">
          Alterar Senha
        </h1>
        <p className="text-gray-600 mt-2">
          Altere sua senha de acesso
        </p>
      </div>

      {/* Formulário */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 max-w-2xl">
        <h2 className="text-xl font-semibold text-[#0B2E47] mb-6">
          Nova Senha
        </h2>

        <form className="space-y-6">
          {/* Senha Atual */}
          <div>
            <label
              htmlFor="senhaAtual"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Senha Atual
            </label>
            <input
              type="password"
              id="senhaAtual"
              name="senhaAtual"
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#22949e] focus:border-transparent bg-gray-50 cursor-not-allowed"
              placeholder="Digite sua senha atual"
            />
          </div>

          {/* Nova Senha */}
          <div>
            <label
              htmlFor="novaSenha"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nova Senha
            </label>
            <input
              type="password"
              id="novaSenha"
              name="novaSenha"
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#22949e] focus:border-transparent bg-gray-50 cursor-not-allowed"
              placeholder="Digite a nova senha"
            />
            <p className="text-sm text-gray-500 mt-1">
              Mínimo 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais
            </p>
          </div>

          {/* Confirmar Nova Senha */}
          <div>
            <label
              htmlFor="confirmarSenha"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirmar Nova Senha
            </label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#22949e] focus:border-transparent bg-gray-50 cursor-not-allowed"
              placeholder="Confirme a nova senha"
            />
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              disabled
              className="px-6 py-2 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed"
            >
              Alterar Senha (Em breve)
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>

        {/* Aviso */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex">
            <svg
              className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Funcionalidade em desenvolvimento</p>
              <p>
                Esta funcionalidade estará disponível em breve. Por enquanto, entre em contato com o suporte para alterar sua senha.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
