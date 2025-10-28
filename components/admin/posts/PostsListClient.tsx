'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  status: string;
  publishedAt: Date | null;
  featuredImage?: string | null;
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

interface PostsListClientProps {
  posts: Post[];
  categories: Category[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  searchParams: {
    search?: string;
    category?: string;
    status?: string;
  };
}

export default function PostsListClient({
  posts,
  categories,
  currentPage,
  totalPages,
  totalPosts,
  searchParams,
}: PostsListClientProps) {
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.search || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.category || '');
  const [selectedStatus, setSelectedStatus] = useState(searchParams.status || '');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedStatus) params.set('status', selectedStatus);
    params.set('page', '1');
    
    router.push(`/admin/artigos-noticias?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedStatus('');
    router.push('/admin/artigos-noticias');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este post?')) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert('Erro ao excluir post');
      }
    } catch (error) {
      alert('Erro ao excluir post');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      publish: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
    };

    const labels = {
      publish: 'Publicado',
      draft: 'Rascunho',
      pending: 'Pendente',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || styles.draft}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  return (
    <>
      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Busca */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
              placeholder="Título ou conteúdo..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22949e] focus:border-transparent"
            />
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22949e] focus:border-transparent"
            >
              <option value="">Todas</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22949e] focus:border-transparent"
            >
              <option value="">Todos</option>
              <option value="publish">Publicado</option>
              <option value="draft">Rascunho</option>
              <option value="pending">Pendente</option>
            </select>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleFilter}
            className="px-6 py-2 bg-[#22949e] hover:bg-[#1d7a82] text-white rounded-lg font-medium transition-colors"
          >
            Filtrar
          </button>
          <button
            onClick={handleClearFilters}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Limpar
          </button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <p className="text-sm text-gray-600">
          Mostrando <span className="font-semibold">{posts.length}</span> de{' '}
          <span className="font-semibold">{totalPosts}</span> posts
        </p>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Post
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Nenhum post encontrado
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* Imagem */}
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#0B2E47] to-[#22949e] flex items-center justify-center flex-shrink-0">
                          {post.featuredImage ? (
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <svg className="w-8 h-8 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                            </svg>
                          )}
                        </div>
                        {/* Título */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/admin/artigos-noticias/${post.id}/editar`}
                            className="font-medium text-gray-900 hover:text-[#22949e] line-clamp-2"
                          >
                            {post.title}
                          </Link>
                          {post.excerpt && (
                            <p className="text-sm text-gray-500 line-clamp-1 mt-1">
                              {post.excerpt}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {post.terms.map((t) => (
                          <span
                            key={t.term.id}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                          >
                            {t.term.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(post.publishedAt)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(post.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/p/${post.slug}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Visualizar"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        <Link
                          href={`/admin/artigos-noticias/${post.id}/editar`}
                          className="p-2 text-blue-400 hover:text-blue-600 transition-colors"
                          title="Editar"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={deletingId === post.id}
                          className="p-2 text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
                          title="Excluir"
                        >
                          {deletingId === post.id ? (
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Página {currentPage} de {totalPages}
            </div>
            <div className="flex gap-2">
              {currentPage > 1 && (
                <Link
                  href={`/admin/artigos-noticias?page=${currentPage - 1}${search ? `&search=${search}` : ''}${selectedCategory ? `&category=${selectedCategory}` : ''}${selectedStatus ? `&status=${selectedStatus}` : ''}`}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  ← Anterior
                </Link>
              )}
              {currentPage < totalPages && (
                <Link
                  href={`/admin/artigos-noticias?page=${currentPage + 1}${search ? `&search=${search}` : ''}${selectedCategory ? `&category=${selectedCategory}` : ''}${selectedStatus ? `&status=${selectedStatus}` : ''}`}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Próximo →
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
