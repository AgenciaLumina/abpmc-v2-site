"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [html, setHtml] = useState("");
  const [status, setStatus] = useState("publish");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await fetch("/api/admin/categories");
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug) {
      setSlug(generateSlug(value));
    }
  };

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !slug) {
      alert("Título e slug são obrigatórios");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          html,
          excerpt,
          status,
          categoryIds: selectedCategories,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Post criado com sucesso!");
        router.push("/admin/posts");
        router.refresh();
      } else {
        alert(data.error || "Erro ao criar post");
      }
    } catch (error) {
      console.error("Erro ao criar post:", error);
      alert("Erro ao criar post");
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
            href="/admin/posts"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Voltar para Posts
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Novo Post</h1>
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
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3E808D] focus:border-transparent"
                placeholder="Digite o título do post"
                required
              />
            </div>

            {/* Slug */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug (URL) *
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3E808D] focus:border-transparent font-mono text-sm"
                placeholder="url-do-post"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                URL: /p/{slug || "url-do-post"}
              </p>
            </div>

            {/* Resumo */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resumo (Excerpt)
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3E808D] focus:border-transparent"
                placeholder="Breve descrição do post"
              />
            </div>

            {/* Conteúdo HTML */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conteúdo *
              </label>
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                rows={20}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3E808D] focus:border-transparent font-mono text-sm"
                placeholder="Cole ou digite o HTML do post aqui"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                💡 Pode colar HTML formatado diretamente (ex: do Word, WordPress, etc.)
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Status</h3>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3E808D] focus:border-transparent"
              >
                <option value="publish">Publicado</option>
                <option value="draft">Rascunho</option>
              </select>
            </div>

            {/* Categorias */}
            <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
              <h3 className="font-semibold text-gray-900 mb-4">Categorias</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {categories.length === 0 ? (
                  <p className="text-sm text-gray-500">Carregando categorias...</p>
                ) : (
                  categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleCategoryToggle(category.id)}
                        className="w-4 h-4 text-[#3E808D] border-gray-300 rounded focus:ring-[#3E808D]"
                      />
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </label>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center justify-end gap-4 bg-white rounded-lg shadow-sm p-6">
            <Link
              href="/admin/posts"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#0F2C3A] text-white rounded-lg hover:bg-[#163B4F] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Publicando..." : "Publicar Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
