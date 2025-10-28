'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  slug: string;
  html: string | null;
  excerpt: string | null;
  status: string;
  terms: Array<{
    term: {
      id: number;
      name: string;
      slug: string;
    };
  }>;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface PostEditFormProps {
  post: Post;
  categories: Category[];
}

export default function PostEditForm({ post, categories }: PostEditFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [content, setContent] = useState(post.html || '');
  const [excerpt, setExcerpt] = useState(post.excerpt || '');
  const [status, setStatus] = useState(post.status);
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    post.terms.map((t) => t.term.id)
  );

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug || slug === generateSlug(post.title)) {
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

  const handleSave = async () => {
    if (!title.trim()) {
      alert('O título é obrigatório');
      return;
    }

    if (!slug.trim()) {
      alert('O slug é obrigatório');
      return;
    }

    if (selectedCategories.length === 0) {
      alert('Selecione pelo menos uma categoria');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`/api/admin/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          slug,
          html: content,
          excerpt: excerpt || null,
          status,
          categoryIds: selectedCategories,
        }),
      });

      if (response.ok) {
        alert('Post atualizado com sucesso!');
        router.push('/admin/artigos-noticias');
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || 'Erro ao atualizar post');
      }
    } catch (error) {
      alert('Erro ao atualizar post');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 space-y-6">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22949e] focus:border-transparent"
            placeholder="Digite o título do post"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug (URL) *
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22949e] focus:border-transparent font-mono text-sm"
            placeholder="slug-do-post"
          />
          <p className="text-xs text-gray-500 mt-1">
            URL: /p/{slug || 'slug-do-post'}
          </p>
        </div>

        {/* Conteúdo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conteúdo
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22949e] focus:border-transparent font-mono text-sm"
            placeholder="Digite o conteúdo do post em HTML..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Você pode usar HTML para formatar o conteúdo
          </p>
        </div>

        {/* Resumo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resumo (Excerpt)
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22949e] focus:border-transparent"
            placeholder="Breve resumo do post..."
          />
        </div>

        {/* Grid: Categorias e Status */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Categorias */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categorias *
            </label>
            <div className="border border-gray-300 rounded-lg p-4 max-h-64 overflow-y-auto">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-2 py-2 hover:bg-gray-50 px-2 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="w-4 h-4 text-[#22949e] border-gray-300 rounded focus:ring-[#22949e]"
                  />
                  <span className="text-sm text-gray-700">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22949e] focus:border-transparent"
            >
              <option value="publish">Publicado</option>
              <option value="draft">Rascunho</option>
              <option value="pending">Pendente</option>
            </select>
          </div>
        </div>

        {/* Botões */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <Link
            href="/admin/artigos-noticias"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
          <div className="flex gap-3">
            <Link
              href={`/p/${post.slug}`}
              target="_blank"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Visualizar
            </Link>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-[#22949e] hover:bg-[#1d7a82] text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Salvando...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Salvar Alterações
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
