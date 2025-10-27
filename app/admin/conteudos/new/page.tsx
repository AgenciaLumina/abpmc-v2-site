"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function NewConteudoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [corpo, setCorpo] = useState("");
  const [categoria, setCategoria] = useState("Geral");
  const [tipo, setTipo] = useState("ARTIGO");
  const [visivelApenas, setVisivelApenas] = useState("ASSOCIADOS");
  const [anexoUrl, setAnexoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [ativo, setAtivo] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo || !corpo) {
      alert("Título e corpo são obrigatórios");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/conteudos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          corpo,
          categoria,
          tipo,
          visivelApenas,
          anexoUrl: anexoUrl || null,
          thumbnailUrl: thumbnailUrl || null,
          ativo,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Conteúdo criado com sucesso!");
        router.push("/admin/conteudos");
        router.refresh();
      } else {
        alert(data.error || "Erro ao criar conteúdo");
      }
    } catch (error) {
      console.error("Erro ao criar conteúdo:", error);
      alert("Erro ao criar conteúdo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/conteudos"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Voltar para Conteúdos
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Novo Conteúdo Restrito</h1>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Título */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título *
              </label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3E808D] focus:border-transparent"
                placeholder="Digite o título do conteúdo"
                required
              />
            </div>

            {/* Corpo/Descrição */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição/Corpo *
              </label>
              <textarea
                value={corpo}
                onChange={(e) => setCorpo(e.target.value)}
                rows={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3E808D] focus:border-transparent"
                placeholder="Descreva o conteúdo ou cole o texto aqui..."
                required
              />
            </div>

            {/* Categoria */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <input
                type="text"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3E808D] focus:border-transparent"
                placeholder="Ex: Documentação, Artigos Científicos, etc."
              />
            </div>
          </div>

          {/* Configurações */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tipo e Visibilidade */}
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Tipo de Conteúdo</h3>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3E808D] focus:border-transparent"
                >
                  <option value="ARTIGO">Artigo</option>
                  <option value="DOWNLOAD">Download</option>
                  <option value="VIDEO">Vídeo</option>
                  <option value="NOTICIA">Notícia</option>
                </select>
                <p className="mt-2 text-sm text-gray-500">
                  {tipo === "ARTIGO" && "📄 Artigos científicos ou textos longos"}
                  {tipo === "DOWNLOAD" && "📥 PDFs, manuais, documentos para baixar"}
                  {tipo === "VIDEO" && "🎥 Vídeos ou links para conteúdo audiovisual"}
                  {tipo === "NOTICIA" && "📰 Notícias ou comunicados exclusivos"}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Visibilidade</h3>
                <select
                  value={visivelApenas}
                  onChange={(e) => setVisivelApenas(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3E808D] focus:border-transparent"
                >
                  <option value="PUBLICO">Público</option>
                  <option value="ASSOCIADOS">Apenas Associados</option>
                  <option value="ADMIN">Apenas Administradores</option>
                </select>
                <p className="mt-2 text-sm text-gray-500">
                  {visivelApenas === "PUBLICO" && "🌍 Visível para todos"}
                  {visivelApenas === "ASSOCIADOS" && "🔒 Requer login de associado"}
                  {visivelApenas === "ADMIN" && "🔐 Apenas administradores"}
                </p>
              </div>
            </div>

            {/* Anexos */}
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Anexo (URL)</h3>
                <input
                  type="url"
                  value={anexoUrl}
                  onChange={(e) => setAnexoUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3E808D] focus:border-transparent"
                  placeholder="https://exemplo.com/arquivo.pdf"
                />
                <p className="mt-2 text-sm text-gray-500">
                  📎 URL do arquivo para download (PDF, DOC, etc.)
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Thumbnail (URL)</h3>
                <input
                  type="url"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3E808D] focus:border-transparent"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
                <p className="mt-2 text-sm text-gray-500">
                  🖼️ Imagem de capa/destaque (opcional)
                </p>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ativo}
                    onChange={(e) => setAtivo(e.target.checked)}
                    className="w-5 h-5 text-[#3E808D] border-gray-300 rounded focus:ring-[#3E808D]"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-900">Ativo</span>
                    <p className="text-sm text-gray-500">
                      Conteúdo visível no site
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center justify-end gap-4 bg-white rounded-lg shadow-sm p-6">
            <Link
              href="/admin/conteudos"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#0F2C3A] text-white rounded-lg hover:bg-[#163B4F] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Criando..." : "Criar Conteúdo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
