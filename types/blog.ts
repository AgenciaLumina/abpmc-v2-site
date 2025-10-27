export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  date: string;
  image: string;
  author?: string;
  tags?: string[];
  publishedAt?: Date;
  featured?: boolean;
}

export interface PostCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}
