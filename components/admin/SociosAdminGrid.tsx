"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Socio {
  id: number;
  nome: string;
  email: string;
  curriculoLattes: string | null;
  visivelNoSite: boolean;
  status: string;
  createdAt: Date;
}

export default function SociosAdminGrid({ socios }: { socios: Socio[] }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [updating, setUpdating] = useState<number | null>(null);

  const filteredSocios = socios.filter(
    (socio) =>
      socio.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      socio.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  async function toggleVisibilidade(socioId: number, visivelAtual: boolean) {
    setUpdating(socioId);
    try {
      const response = await fetch(`/api/admin/socios/${socioId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visivelNoSite: !visivelAtual }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar");

      router.refresh();
    } catch (error) {
      alert("Erro ao atualizar visibilidade");
    } finally {
      setUpdating(null);
    }
  }

  async function atualizarLattes(socioId: number, url: string | null) {
    try {
      const response = await fetch(`/api/admin/socios/${socioId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ curriculoLattes: url }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar");

      router.refresh();
      alert("Currículo Lattes atualizado!");
    } catch (error) {
      alert("Erro ao atualizar Lattes");
    }
  }

  return (
    <div className="space-y-4">
      {/* Busca */}
      <div className="bg-gray-800 rounded-lg p-4">
        <input
          type="text"
          placeholder="Buscar por nome ou email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total de Sócios</p>
          <p className="text-white text-2xl font-bold">{socios.length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Visíveis no Site</p>
          <p className="text-green-400 text-2xl font-bold">
            {socios.filter((s) => s.visivelNoSite).length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Com Lattes</p>
          <p className="text-blue-400 text-2xl font-bold">
            {socios.filter((s) => s.curriculoLattes).length}
          </p>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-white text-sm font-medium">
                  Nome
                </th>
                <th className="px-4 py-3 text-left text-white text-sm font-medium">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-white text-sm font-medium">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-white text-sm font-medium">
                  Lattes
                </th>
                <th className="px-4 py-3 text-center text-white text-sm font-medium">
                  Visível no Site
                </th>
                <th className="px-4 py-3 text-center text-white text-sm font-medium">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredSocios.map((socio) => (
                <tr key={socio.id} className="hover:bg-gray-700/50">
                  <td className="px-4 py-3 text-white">{socio.nome}</td>
                  <td className="px-4 py-3 text-gray-300 text-sm">
                    {socio.email}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        socio.status === "ATIVO"
                          ? "bg-green-900/50 text-green-300"
                          : "bg-red-900/50 text-red-300"
                      }`}
                    >
                      {socio.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {socio.curriculoLattes ? (
                      <a
                        href={socio.curriculoLattes}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Ver Lattes
                      </a>
                    ) : (
                      <button
                        onClick={() => {
                          const url = prompt("Digite a URL do Lattes:");
                          if (url) atualizarLattes(socio.id, url);
                        }}
                        className="text-gray-400 hover:text-gray-300 text-sm"
                      >
                        Adicionar
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() =>
                        toggleVisibilidade(socio.id, socio.visivelNoSite)
                      }
                      disabled={updating === socio.id}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                        socio.visivelNoSite
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                      } disabled:opacity-50`}
                    >
                      {updating === socio.id
                        ? "..."
                        : socio.visivelNoSite
                        ? "Visível"
                        : "Oculto"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => {
                        const novaUrl = prompt(
                          "URL do Lattes:",
                          socio.curriculoLattes || ""
                        );
                        if (novaUrl !== null) {
                          atualizarLattes(socio.id, novaUrl || null);
                        }
                      }}
                      className="text-gray-400 hover:text-white text-sm"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSocios.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            Nenhum sócio encontrado
          </div>
        )}
      </div>
    </div>
  );
}
