import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const metadata = {
  title: "Meu Perfil - Área do Associado | ABPMC",
};

export default async function PerfilPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/associado");
  }

  const associado = await prisma.associado.findUnique({
    where: { id: parseInt(session.user.id) },
  });

  if (!associado) {
    redirect("/auth/associado");
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#0B2E47]">
          Meu Perfil
        </h1>
        <p className="text-gray-600 mt-2">
          Visualize e edite suas informações pessoais
        </p>
      </div>

      {/* Card de Informações */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-[#0B2E47] mb-6">
          Informações Pessoais
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo
            </label>
            <p className="text-gray-900">{associado.nome}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <p className="text-gray-900">{associado.email}</p>
          </div>

          {/* CPF */}
          {associado.cpf && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CPF
              </label>
              <p className="text-gray-900">{associado.cpf}</p>
            </div>
          )}

          {/* Telefone */}
          {associado.telefone && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <p className="text-gray-900">{associado.telefone}</p>
            </div>
          )}

          {/* Endereço */}
          {associado.endereco && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endereço
              </label>
              <p className="text-gray-900">{associado.endereco}</p>
            </div>
          )}

          {/* Cidade/Estado */}
          {(associado.cidade || associado.estado) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cidade/Estado
              </label>
              <p className="text-gray-900">
                {associado.cidade && associado.estado
                  ? `${associado.cidade} - ${associado.estado}`
                  : associado.cidade || associado.estado}
              </p>
            </div>
          )}

          {/* CEP */}
          {associado.cep && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CEP
              </label>
              <p className="text-gray-900">{associado.cep}</p>
            </div>
          )}

          {/* Currículo Lattes */}
          {associado.curriculoLattes && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currículo Lattes
              </label>
              <a
                href={associado.curriculoLattes}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#22949e] hover:underline"
              >
                {associado.curriculoLattes}
              </a>
            </div>
          )}

          {/* Visível no Site */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Visível na página de Sócios
            </label>
            <p className="text-gray-900">
              {associado.visivelNoSite ? "Sim" : "Não"}
            </p>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="mt-8 flex gap-4">
          <button
            disabled
            className="px-6 py-2 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed"
          >
            Editar Perfil (Em breve)
          </button>
          <Link
            href="/associado/alterar-senha"
            className="px-6 py-2 bg-[#2b4e6d] text-white rounded-md hover:bg-[#22949e] transition-colors"
          >
            Alterar Senha
          </Link>
        </div>
      </div>
    </>
  );
}
