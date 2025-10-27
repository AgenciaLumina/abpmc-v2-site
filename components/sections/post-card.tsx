import * as React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export interface PostCardProps {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: Date | string;
  author?: string;
  category?: string;
}

export default function PostCard({
  title,
  slug,
  excerpt,
  publishedAt,
  author,
  category
}: PostCardProps) {
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    : null;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
          {formattedDate && <time dateTime={publishedAt?.toString()}>{formattedDate}</time>}
          {category && (
            <>
              <span>•</span>
              <span>{category}</span>
            </>
          )}
        </div>
        <CardTitle>
          <Link
            href={`/p/${slug}`}
            className="hover:text-primary-500 transition-colors"
          >
            {title}
          </Link>
        </CardTitle>
      </CardHeader>
      
      {excerpt && (
        <CardContent>
          <p className="text-sm text-neutral-500 line-clamp-3">
            {excerpt}
          </p>
          <Link
            href={`/p/${slug}`}
            className="inline-flex items-center text-sm font-medium text-primary-500 hover:text-primary-700 mt-4"
          >
            Ler mais
            <svg
              className="ml-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </CardContent>
      )}
    </Card>
  );
}
