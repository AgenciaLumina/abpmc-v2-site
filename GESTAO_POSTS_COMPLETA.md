# Gestão Completa de Posts e Notícias

## 🎯 OBJETIVOS

1. Melhorar página `/categoria/noticias`
2. Criar sistema de paginação (10 posts por página)
3. Criar painel admin "Artigos e Notícias"
4. Importar imagens destacadas do XML
5. Sistema de upload de mídias
6. Embed de vídeos do YouTube
7. Gestão completa estilo WordPress

---

## 📋 TAREFAS

### 1. Melhorar Página de Categoria

**Arquivo:** `app/(site)/categoria/[slug]/page.tsx`

**Remover:**
```typescript
// ❌ Remover este bloco
<section className="py-20 px-6 md:px-16">
  <div className="max-w-5xl mx-auto text-center">
    <p className="text-lg leading-relaxed">
      Conteúdos da categoria <strong>{categoria.name}</strong>
    </p>
  </div>
</section>
```

**Remover:**
```typescript
// ❌ Remover este bloco CTA
<section className="w-full bg-gradient-to-b from-[#0B2E47] to-[#163B56] py-[60px] text-center text-white">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-2xl font-semibold mb-2">
      {posts.length} {posts.length === 1 ? "Publicação" : "Publicações"}
    </h2>
    <p className="max-w-3xl mx-auto text-base text-[#E8EEF3]">
      Explore os conteúdos desta categoria
    </p>
  </div>
</section>
```

**Adicionar:**
- Paginação com números (1, 2, 3, ...)
- 10 posts por página
- AJAX para carregar sem reload
- Indicador de página atual

---

### 2. Sistema de Paginação

**Componente:** `components/pagination/PostsPagination.tsx`

```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Funcionalidades:
- Números de página clicáveis
- Botões Anterior/Próximo
- Página atual destacada
- Máximo 7 números visíveis
- Reticências (...) para páginas ocultas
- AJAX (sem reload)
```

**API:** `app/api/posts/route.ts`

```typescript
GET /api/posts?page=1&limit=10&categoria=noticias

Response:
{
  posts: Post[],
  pagination: {
    page: 1,
    limit: 10,
    total: 368,
    pages: 37
  }
}
```

---

### 3. Painel Admin - Artigos e Notícias

**Rota:** `/admin/artigos-noticias`

**Funcionalidades:**

#### Listagem
- ✅ Tabela com todos os posts
- ✅ Colunas: Imagem, Título, Categoria, Data, Status, Ações
- ✅ Busca por título
- ✅ Filtro por categoria
- ✅ Filtro por status (publicado/rascunho)
- ✅ Ordenação por data
- ✅ Paginação (20 por página)
- ✅ Ações: Editar, Excluir, Visualizar

#### Criar/Editar Post
- ✅ Título
- ✅ Slug (gerado automaticamente)
- ✅ Conteúdo (Editor WYSIWYG)
- ✅ Excerpt (resumo)
- ✅ Imagem destacada (upload)
- ✅ Categoria(s)
- ✅ Status (publicado/rascunho)
- ✅ Data de publicação
- ✅ Autor
- ✅ Vídeo YouTube (embed)
- ✅ SEO (meta title, description)

#### Upload de Mídias
- ✅ Botão "Escolher Mídia"
- ✅ Modal com biblioteca de mídias
- ✅ Upload de novas imagens
- ✅ Busca de mídias existentes
- ✅ Preview de imagens
- ✅ Informações (tamanho, dimensões, data)
- ✅ Selecionar e inserir

---

### 4. Importar Imagens do XML

**Script:** `scripts/importar-imagens-posts.ts`

**Processo:**
1. Ler XML `todo-conteudo.xml`
2. Extrair posts com imagens destacadas
3. Para cada post:
   - Buscar no banco por slug
   - Extrair URL da imagem
   - Baixar imagem
   - Salvar em `public/uploads/posts/`
   - Atualizar campo `featuredImage` no banco

**Estrutura no XML:**
```xml
<item>
  <title>Título do Post</title>
  <wp:post_name>slug-do-post</wp:post_name>
  <wp:postmeta>
    <wp:meta_key>_thumbnail_id</wp:meta_key>
    <wp:meta_value>123</wp:meta_value>
  </wp:postmeta>
</item>

<item>
  <wp:post_id>123</wp:post_id>
  <wp:post_type>attachment</wp:post_type>
  <wp:attachment_url>https://abpmc.org.br/wp-content/uploads/2024/01/imagem.jpg</wp:attachment_url>
</item>
```

---

### 5. Sistema de Upload de Mídias

**API:** `app/api/admin/media/route.ts`

```typescript
// Upload
POST /api/admin/media/upload
FormData: { file: File }
Response: { url: string, id: number, ... }

// Listar
GET /api/admin/media?page=1&search=termo
Response: { media: Media[], pagination: {...} }

// Excluir
DELETE /api/admin/media/[id]
```

**Componente:** `components/admin/MediaLibrary.tsx`

```typescript
interface MediaLibraryProps {
  onSelect: (media: Media) => void;
  multiple?: boolean;
  accept?: string; // 'image/*', 'video/*', etc
}

// Funcionalidades:
- Grid de mídias
- Upload drag & drop
- Busca
- Filtro por tipo
- Preview
- Informações detalhadas
- Seleção múltipla (opcional)
```

**Validações:**
- ❌ Não permitir vídeos (MP4, AVI, etc)
- ✅ Permitir imagens (JPG, PNG, GIF, WebP)
- ✅ Permitir PDFs
- ✅ Tamanho máximo: 5MB
- ✅ Dimensões recomendadas: 1200x630px

---

### 6. Embed de Vídeos YouTube

**Campo no Formulário:**
```typescript
<input
  type="text"
  placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
  value={youtubeUrl}
  onChange={handleYoutubeUrl}
/>
```

**Conversão:**
```typescript
// Input: https://www.youtube.com/watch?v=dQw4w9WgXcQ
// Output: <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" />

function getYoutubeEmbedUrl(url: string): string {
  const videoId = extractYoutubeId(url);
  return `https://www.youtube.com/embed/${videoId}`;
}
```

**Armazenamento:**
```typescript
// No banco, salvar no campo meta como JSON
meta: {
  youtube: {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoId: "dQw4w9WgXcQ"
  }
}
```

---

### 7. Editor WYSIWYG

**Opções:**

#### Opção 1: TinyMCE (Recomendado)
```bash
npm install @tinymce/tinymce-react
```

**Funcionalidades:**
- Formatação de texto (negrito, itálico, etc)
- Listas (ordenadas e não ordenadas)
- Links
- Imagens (via biblioteca de mídias)
- Tabelas
- Código HTML
- Preview

#### Opção 2: Tiptap
```bash
npm install @tiptap/react @tiptap/starter-kit
```

**Mais leve e moderno**

---

## 📊 ESTRUTURA DE ARQUIVOS

```
app/admin/artigos-noticias/
├── page.tsx                    # Listagem
├── novo/
│   └── page.tsx               # Criar novo
└── [id]/
    └── editar/
        └── page.tsx           # Editar existente

app/api/admin/
├── posts/
│   ├── route.ts              # GET (listar), POST (criar)
│   └── [id]/
│       └── route.ts          # GET, PUT, DELETE
└── media/
    ├── route.ts              # GET (listar), POST (upload)
    └── [id]/
        └── route.ts          # DELETE

components/admin/
├── posts/
│   ├── PostsList.tsx         # Tabela de posts
│   ├── PostForm.tsx          # Formulário criar/editar
│   ├── PostFilters.tsx       # Filtros e busca
│   └── PostActions.tsx       # Ações (editar, excluir)
├── media/
│   ├── MediaLibrary.tsx      # Biblioteca de mídias
│   ├── MediaUploader.tsx     # Upload de arquivos
│   ├── MediaGrid.tsx         # Grid de mídias
│   └── MediaItem.tsx         # Item individual
└── editor/
    ├── RichTextEditor.tsx    # Editor WYSIWYG
    └── YouTubeEmbed.tsx      # Componente de embed

public/uploads/
├── posts/                    # Imagens de posts
├── media/                    # Outras mídias
└── temp/                     # Uploads temporários

scripts/
├── importar-imagens-posts.ts # Importar do XML
└── processar-midias.ts       # Processar uploads
```

---

## 🔄 FLUXOS

### Fluxo 1: Criar Novo Post

```
1. Admin acessa /admin/artigos-noticias
2. Clica em "Novo Post"
3. Preenche formulário:
   - Título (slug gerado automaticamente)
   - Conteúdo (editor WYSIWYG)
   - Excerpt
   - Clica "Escolher Imagem Destacada"
     → Modal de biblioteca abre
     → Pode fazer upload ou escolher existente
     → Seleciona imagem
     → Modal fecha, imagem aparece
   - Seleciona categoria
   - Define status (publicado/rascunho)
   - (Opcional) Adiciona vídeo YouTube
4. Clica "Publicar" ou "Salvar Rascunho"
5. Post criado
6. Redirecionado para listagem
```

### Fluxo 2: Editar Post Existente

```
1. Admin acessa /admin/artigos-noticias
2. Busca/filtra post desejado
3. Clica em "Editar"
4. Formulário carrega com dados atuais
5. Faz alterações necessárias
6. Clica "Atualizar"
7. Post atualizado
8. Redirecionado para listagem
```

### Fluxo 3: Adicionar Imagem ao Conteúdo

```
1. No editor WYSIWYG
2. Posiciona cursor onde quer imagem
3. Clica no botão "Inserir Imagem"
4. Modal de biblioteca abre
5. Escolhe imagem existente ou faz upload
6. Seleciona imagem
7. Define alt text
8. Define tamanho (pequeno/médio/grande/original)
9. Clica "Inserir"
10. Imagem aparece no conteúdo
```

### Fluxo 4: Adicionar Vídeo YouTube

```
1. No formulário de post
2. Seção "Vídeo YouTube"
3. Cola URL do vídeo
4. Sistema valida e extrai ID
5. Preview do vídeo aparece
6. Ao salvar, embed é armazenado
7. No post público, vídeo é exibido
```

---

## 🎨 DESIGN

### Página de Categoria (Melhorada)

```
┌─────────────────────────────────────────┐
│ Header: Notícias                        │
├─────────────────────────────────────────┤
│                                         │
│  [Grid de Posts - 10 por página]       │
│                                         │
│  ┌──────┐  ┌──────┐                   │
│  │ IMG  │  │ IMG  │                   │
│  │      │  │      │                   │
│  │Title │  │Title │                   │
│  └──────┘  └──────┘                   │
│                                         │
├─────────────────────────────────────────┤
│ Paginação: [<] 1 2 3 ... 37 [>]       │
└─────────────────────────────────────────┘
```

### Admin - Listagem de Posts

```
┌─────────────────────────────────────────┐
│ Artigos e Notícias          [+ Novo]   │
├─────────────────────────────────────────┤
│ [Buscar...] [Categoria▼] [Status▼]    │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐│
│ │IMG│Título│Categoria│Data│Status│⚙️ ││
│ ├─────────────────────────────────────┤│
│ │📷 │Post 1│Notícias │01/01│✓    │⚙️ ││
│ │📷 │Post 2│Eventos  │02/01│✓    │⚙️ ││
│ └─────────────────────────────────────┘│
├─────────────────────────────────────────┤
│ Paginação: [<] 1 2 3 [>]              │
└─────────────────────────────────────────┘
```

### Admin - Criar/Editar Post

```
┌─────────────────────────────────────────┐
│ Novo Post                    [Publicar] │
├─────────────────────────────────────────┤
│ Título: [________________]              │
│ Slug:   [________________] (auto)       │
│                                         │
│ ┌─────────────────────────────────────┐│
│ │ Editor WYSIWYG                      ││
│ │ [B][I][U] [Link] [Img] [...]       ││
│ │                                     ││
│ │ Conteúdo do post...                ││
│ └─────────────────────────────────────┘│
│                                         │
│ Excerpt: [________________]             │
│                                         │
│ Imagem Destacada:                       │
│ [Escolher Mídia]  [📷 Preview]         │
│                                         │
│ Categoria: [Notícias ▼]                │
│ Status: [Publicado ▼]                   │
│ Data: [01/01/2025]                      │
│                                         │
│ Vídeo YouTube (opcional):               │
│ [https://youtube.com/...]               │
│ [Preview do vídeo]                      │
│                                         │
│ [Salvar Rascunho] [Publicar]           │
└─────────────────────────────────────────┘
```

---

## 📦 DEPENDÊNCIAS NECESSÁRIAS

```json
{
  "dependencies": {
    "@tinymce/tinymce-react": "^4.3.0",
    "react-dropzone": "^14.2.3",
    "sharp": "^0.33.0",
    "slugify": "^1.6.6"
  }
}
```

---

## 🚀 IMPLEMENTAÇÃO

### Fase 1: Melhorar Página de Categoria
1. Remover textos desnecessários
2. Implementar paginação
3. Criar API de posts paginados
4. Testar navegação

### Fase 2: Painel Admin - Listagem
1. Criar página de listagem
2. Implementar filtros e busca
3. Criar API de listagem
4. Adicionar ações (editar, excluir)

### Fase 3: Painel Admin - Criar/Editar
1. Criar formulário
2. Integrar editor WYSIWYG
3. Implementar upload de imagem destacada
4. Criar API de CRUD

### Fase 4: Biblioteca de Mídias
1. Criar componente MediaLibrary
2. Implementar upload
3. Criar API de mídias
4. Integrar com formulário

### Fase 5: Importar Imagens do XML
1. Criar script de importação
2. Baixar imagens
3. Atualizar banco de dados
4. Verificar resultados

### Fase 6: Vídeos YouTube
1. Adicionar campo no formulário
2. Implementar validação
3. Criar componente de embed
4. Exibir no post público

---

## ✅ CHECKLIST

### Página de Categoria
- [ ] Remover texto "Conteúdos da categoria"
- [ ] Remover bloco CTA
- [ ] Implementar paginação (10 por página)
- [ ] AJAX para navegação
- [ ] Indicador de página atual

### Admin - Listagem
- [ ] Criar página /admin/artigos-noticias
- [ ] Tabela com posts
- [ ] Busca por título
- [ ] Filtro por categoria
- [ ] Filtro por status
- [ ] Paginação
- [ ] Botão "Novo Post"
- [ ] Ações: Editar, Excluir, Visualizar

### Admin - Criar/Editar
- [ ] Formulário completo
- [ ] Editor WYSIWYG
- [ ] Upload de imagem destacada
- [ ] Seleção de categoria
- [ ] Status (publicado/rascunho)
- [ ] Campo vídeo YouTube
- [ ] Validações
- [ ] Salvar/Publicar

### Biblioteca de Mídias
- [ ] Modal de biblioteca
- [ ] Grid de mídias
- [ ] Upload drag & drop
- [ ] Busca de mídias
- [ ] Preview
- [ ] Seleção e inserção

### Importação
- [ ] Script de importação de imagens
- [ ] Download de imagens do XML
- [ ] Atualização do banco
- [ ] Verificação de resultados

### Vídeos YouTube
- [ ] Campo no formulário
- [ ] Validação de URL
- [ ] Extração de ID
- [ ] Preview no admin
- [ ] Exibição no post público

---

**Status:** Planejamento completo  
**Próximo:** Implementação fase por fase  
**Tempo estimado:** 20-30 horas
