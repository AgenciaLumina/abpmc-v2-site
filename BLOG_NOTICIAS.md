# 📰 Sistema de Blog/Notícias ABPMC

## ✅ Implementado

Sistema completo de Blog/Notícias com listagem e páginas individuais.

---

## 📁 Estrutura de Arquivos

```
/app/(site)/noticias
  ├── page.tsx                    # Listagem de posts
  └── [slug]/page.tsx             # Post individual (dinâmico)

/components/blog
  └── PostCard.tsx                # Card reutilizável de post

/lib
  └── posts-data.ts               # Dados mock (substituir por API)

/types
  └── blog.ts                     # Tipos TypeScript para posts
```

---

## 🌐 URLs

| Tipo | URL | Descrição |
|------|-----|-----------|
| **Listagem** | `/noticias` | Todos os posts |
| **Post Individual** | `/noticias/[slug]` | Página do post completo |

**Exemplos:**
- `http://localhost:3000/noticias`
- `http://localhost:3000/noticias/titulo-da-noticia`
- `http://localhost:3000/noticias/evento-regional`

---

## ✨ Funcionalidades

### Página de Listagem (`/noticias`)
- ✅ Hero padrão ABPMC
- ✅ Introdução centralizada
- ✅ Bloco gradiente (#0B2E47 → #163B56)
- ✅ Grid responsivo 2 colunas (mobile: 1 coluna)
- ✅ Cards com imagem, categoria, data, título e resumo
- ✅ Hover effects nos cards
- ✅ Botão "Carregar mais"
- ✅ 6 posts mockados

### Página Individual (`/noticias/[slug]`)
- ✅ Hero dinâmico com título do post
- ✅ Metadados (categoria + data)
- ✅ Imagem destaque grande
- ✅ Conteúdo HTML formatado
- ✅ Botão voltar
- ✅ Seção "Outras Notícias" (3 posts relacionados)
- ✅ Metadata dinâmico para SEO

### Componente PostCard
- ✅ Reutilizável
- ✅ Props tipadas
- ✅ Imagem com hover scale
- ✅ Link para post completo
- ✅ Design consistente

---

## 📊 Dados Mock

### Posts Incluídos (6 exemplos):

1. **Título da Notícia ou Artigo** (Institucional)
2. **Outra Notícia Importante** (Comunicados)
3. **Novo Evento Regional Confirmado** (Eventos)
4. **Nova Edição da Revista REBAC** (Publicações)
5. **Convocação para Assembleia Geral** (Institucional)
6. **Prêmio de Pesquisa ABPMC 2025** (Editais)

### Categorias:
- Institucional
- Comunicados
- Eventos
- Publicações
- Editais

---

## 🔄 Integração com Banco de Dados

### Atual (Mock):
```typescript
// lib/posts-data.ts
export const mockPosts: Post[] = [...]

export function getPosts(): Post[] {
  return mockPosts;
}
```

### Futuro (API):
```typescript
// app/api/posts/route.ts
export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: 'desc' },
    where: { published: true },
  });
  return Response.json(posts);
}

// app/(site)/noticias/page.tsx
const posts = await fetch('/api/posts').then(r => r.json());
```

---

## 📝 Estrutura de Dados

```typescript
interface Post {
  id: number;
  slug: string;              // URL amigável
  title: string;             // Título do post
  excerpt: string;           // Resumo curto
  content?: string;          // HTML completo
  category: string;          // Categoria
  date: string;              // Data formatada
  image: string;             // URL da imagem
  author?: string;           // Opcional
  tags?: string[];           // Opcional
  publishedAt?: Date;        // Opcional
  featured?: boolean;        // Destaque
}
```

---

## 🎨 Estilos e Design

### Cores:
- **Primária:** #0F265C
- **Secundária:** #2b4e6d
- **Hover:** #22949e
- **Gradiente:** #0B2E47 → #163B56
- **Texto:** #222 (títulos) / #5a6575 (corpo)

### Cards:
- Border: #e6e8ef
- Shadow: 0_10px_32px_rgba(2,12,27,.05)
- Hover: 0_20px_50px_rgba(2,12,27,.1)
- Rounded: 2xl (rounded-2xl)

### Responsividade:
- Desktop: Grid 2 colunas
- Mobile: Grid 1 coluna
- Imagens: Proporção 16:9 (h-56)

---

## 🚀 Próximos Passos

### 1. Criar Schema no Prisma
```prisma
model Post {
  id          Int      @id @default(autoincrement())
  slug        String   @unique
  title       String
  excerpt     String
  content     String   @db.Text
  category    String
  image       String?
  author      String?
  published   Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 2. Criar API Routes
- `GET /api/posts` - Listar todos
- `GET /api/posts/[slug]` - Buscar por slug
- `POST /api/admin/posts` - Criar (admin)
- `PATCH /api/admin/posts/[id]` - Editar (admin)
- `DELETE /api/admin/posts/[id]` - Deletar (admin)

### 3. Criar Painel Admin
- `/admin/posts` - Listagem
- `/admin/posts/novo` - Criar post
- `/admin/posts/[id]/editar` - Editar post
- Editor WYSIWYG (TinyMCE ou similar)
- Upload de imagens

### 4. Funcionalidades Adicionais
- Paginação (carregar mais)
- Busca por título/conteúdo
- Filtro por categoria
- Tags/palavras-chave
- Posts em destaque
- Sistema de comentários
- Compartilhamento social
- RSS Feed

---

## 📷 Imagens

### Imagens Mock Esperadas:
- `/public/uploads/noticia-01.jpg`
- `/public/uploads/noticia-02.jpg`
- `/public/uploads/noticia-03.jpg`
- `/public/uploads/noticia-04.jpg`
- `/public/uploads/noticia-05.jpg`
- `/public/uploads/noticia-06.jpg`

### Dimensões Recomendadas:
- **Listagem:** 800x450px (16:9)
- **Post Individual:** 1200x675px (16:9)

---

## ✅ Checklist

- [x] Página de listagem
- [x] Página individual dinâmica
- [x] Componente PostCard
- [x] Tipos TypeScript
- [x] Dados mock
- [x] Hero padrão
- [x] Bloco gradiente
- [x] Grid responsivo
- [x] Hover effects
- [x] Posts relacionados
- [x] Metadata SEO
- [ ] Integração com banco de dados
- [ ] Painel admin
- [ ] Upload de imagens
- [ ] Paginação
- [ ] Busca e filtros

---

**Sistema de Blog/Notícias pronto para uso com dados mock!**  
**Pronto para integração com banco de dados.** 🎉
