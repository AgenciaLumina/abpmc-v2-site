"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  FunnelIcon,
  DocumentTextIcon,
  DocumentArrowDownIcon,
  VideoCameraIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";

interface Conteudo {
  id: number;
  titulo: string;
  corpo: string;
  categoria: string;
  tipo: string;
  visivelApenas: string;
  anexoUrl: string | null;
  thumbnailUrl: string | null;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminConteudosPage() {
  const [conteudos, setConteudos] = useState<Conteudo[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [search, setSearch] = useState("");
  const [tipoFilter, setTipoFilter] = useState("all");
  const [visibilidadeFilter, setVisibilidadeFilter] = useState("all");
  const [ativoFilter, setAtivoFilter] = useState("all");

  useEffect(() => {
    loadConteudos();
  }, [page, tipoFilter, visibilidadeFilter, ativoFilter]);

  const loadConteudos = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      });

      if (tipoFilter !== "all") {
        params.set("tipo", tipoFilter);
      }

      if (visibilidadeFilter !== "all") {
        params.set("visibilidade", visibilidadeFilter);
      }

      if (ativoFilter !== "all") {
        params.set("ativo", ativoFilter);
      }

      if (search) {
        params.set("search", search);
      }

      const response = await fetch(`/api/admin/conteudos?${params}`);
      const data = await response.json();

      setConteudos(data.conteudos || []);
      setTotal(data.pagination?.total || 0);
      setPages(data.pagination?.pages || 0);
    } catch (error) {
      console.error("Erro ao carregar conteúdos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadConteudos();
  };

  const handleDelete = async (id: number, titulo: string) => {
    if (!confirm(`Tem certeza que deseja deletar "${titulo}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/conteudos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Conteúdo deletado com sucesso!");
        loadConteudos();
      } else {
        alert("Erro ao deletar conteúdo");
      }
    } catch (error) {
      console.error("Erro ao deletar conteúdo:", error);
      alert("Erro ao deletar conteúdo");
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "ARTIGO":
        return <DocumentTextIcon className="h-5 w-5" />;
      case "DOWNLOAD":
        return <DocumentArrowDownIcon className="h-5 w-5" />;
      case "VIDEO":
        return <VideoCameraIcon className="h-5 w-5" />;
      case "NOTICIA":
        return <NewspaperIcon className="h-5 w-5" />;
      default:
        return <DocumentTextIcon className="h-5 w-5" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "ARTIGO":
        return "bg-blue-100 text-blue-800";
      case "DOWNLOAD":
        return "bg-green-100 text-green-800";
      case "VIDEO":
        return "bg-purple-100 text-purple-800";
      case "NOTICIA":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getVisibilidadeColor = (visibilidade: string) => {
    switch (visibilidade) {
      case "PUBLICO":
        return "bg-green-100 text-green-800";
      case "ASSOCIADOS":
        return "bg-yellow-100 text-yellow-800";
      case "ADMIN":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Conteúdos Restritos
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Gerenciar documentos e materiais exclusivos
              </p>
            </div>
            <Link
              href="/admin/conteudos/new"
              className="inline-flex items-center gap-2 bg-[#0F2C3A] text-white px-4 py-2 rounded-lg hover:bg-[#163B4F] transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              Novo Conteúdo
            </Link>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Busca */}
            <form onSubmit={handleSearch} className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar conteúdos..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3E808D] focus:border-transparent"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </form>

            {/* Filtro Tipo */}
            <select
              value={tipoFilter}
              onChange={(e) => {
                setTipoFilter(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3E808D] focus:border-transparent"
            >
              <option value="all">Todos os tipos</option>
              <option value="ARTIGO">Artigo</option>
              <option value="DOWNLOAD">Download</option>
              <option value="VIDEO">Vídeo</option>
              <option value="NOTICIA">Notícia</option>
            </select>

            {/* Filtro Visibilidade */}
            <select
              value={visibilidadeFilter}
              onChange={(e) => {
                setVisibilidadeFilter(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3E808D] focus:border-transparent"
            >
              <option value="all">Todas visibilidades</option>
              <option value="PUBLICO">Público</option>
              <option value="ASSOCIADOS">Associados</option>
              <option value="ADMIN">Admin</option>
            </select>

            {/* Filtro Ativo */}
            <select
              value={ativoFilter}
              onChange={(e) => {
                setAtivoFilter(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3E808D] focus:border-transparent"
            >
              <option value="all">Todos status</option>
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </select>
          </div>

          <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <FunnelIcon className="h-4 w-4" />
              {total} conteúdos encontrados
            </span>
          </div>
        </div>

        {/* Tabela de Conteúdos */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-[#3E808D]"></div>
              <p className="mt-4 text-gray-600">Carregando...</p>
            </div>
          ) : conteudos.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600">Nenhum conteúdo encontrado.</p>
              <Link
                href="/admin/conteudos/new"
                className="mt-4 inline-flex items-center gap-2 text-[#3E808D] hover:underline"
              >
                <PlusIcon className="h-5 w-5" />
                Criar primeiro conteúdo
              </Link>
            </div>
          ) : (
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visibilidade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoria
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {conteudos.map((conteudo) => (
                    <tr key={conteudo.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {conteudo.titulo}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(conteudo.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${getTipoColor(
                            conteudo.tipo
                          )}`}
                        >
                          {getTipoIcon(conteudo.tipo)}
                          {conteudo.tipo}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getVisibilidadeColor(
                            conteudo.visivelApenas
                          )}`}
                        >
                          {conteudo.visivelApenas}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {conteudo.categoria}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            conteudo.ativo
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {conteudo.ativo ? "Ativo" : "Inativo"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/conteudos/${conteudo.id}/edit`}
                            className="text-[#3E808D] hover:text-[#2C5F6B] p-1 rounded hover:bg-gray-100"
                            title="Editar"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </Link>
                          <button
                            onClick={() =>
                              handleDelete(conteudo.id, conteudo.titulo)
                            }
                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-gray-100"
                            title="Deletar"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Paginação */}
              {pages > 1 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={() => setPage(Math.min(pages, page + 1))}
                      disabled={page === pages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      Próximo
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Mostrando{" "}
                        <span className="font-medium">
                          {(page - 1) * 20 + 1}
                        </span>{" "}
                        até{" "}
                        <span className="font-medium">
                          {Math.min(page * 20, total)}
                        </span>{" "}
                        de <span className="font-medium">{total}</span>{" "}
                        resultados
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                          onClick={() => setPage(Math.max(1, page - 1))}
                          disabled={page === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Anterior
                        </button>
                        {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                          const pageNum = i + 1;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setPage(pageNum)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                page === pageNum
                                  ? "z-10 bg-[#3E808D] border-[#3E808D] text-white"
                                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                        <button
                          onClick={() => setPage(Math.min(pages, page + 1))}
                          disabled={page === pages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Próximo
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
