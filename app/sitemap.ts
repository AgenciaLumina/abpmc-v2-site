import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://abpmc.com.br';

  // Buscar todos os posts publicados
  const posts = await prisma.content.findMany({
    where: {
      type: 'POST',
      status: 'publish',
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  // Buscar todas as páginas
  const pages = await prisma.content.findMany({
    where: {
      type: 'PAGE',
      status: 'publish',
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  // Buscar todas as categorias
  const categories = await prisma.term.findMany({
    where: {
      taxonomy: 'category',
    },
    select: {
      slug: true,
    },
  });

  // URLs estáticas principais
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/noticias`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/comportamento-em-foco`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/documentos`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/socios`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/diretoria`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // URLs dos posts
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/p/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // URLs das páginas
  const pageUrls = pages.map((page) => ({
    url: `${baseUrl}/pagina/${page.slug}`,
    lastModified: page.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  // URLs das categorias
  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/categoria/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...postUrls, ...pageUrls, ...categoryUrls];
}
