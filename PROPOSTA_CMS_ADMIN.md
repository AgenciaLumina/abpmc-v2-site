# 📋 Proposta: Sistema CMS Admin Completo - ABPMC

## 🎯 Objetivo
Criar uma área administrativa completa tipo WordPress para gestão de todos os conteúdos do site ABPMC.

---

## 📊 Estado Atual (Análise)

### **Banco de Dados**
- ✅ **373 posts** migrados
- ✅ **37 páginas** migradas
- ✅ **17 categorias** (com duplicatas a limpar)
- ✅ Schema preparado para: Content, Term, ConteudoRestrito, MediaAsset

### **Rotas Admin Existentes**
- `/admin/dashboard` - Dashboard principal
- `/admin/posts` - Listagem de posts ✅
- `/admin/posts/new` - Criar post ⚠️ (rota existe, precisa implementar)
- `/admin/posts/[id]/edit` - Editar post ⚠️ (rota existe, precisa implementar)
- `/admin/associados` - Gestão de associados
- `/admin/socios` - Gestão de sócios
- `/admin/pagamentos` - Gestão de pagamentos
- `/admin/planos` - Gestão de planos

### **APIs Existentes**
- ✅ `GET /api/admin/posts` - Listar posts com paginação/filtros
- ✅ `GET /api/admin/categories` - Listar categorias
- ✅ `DELETE /api/admin/posts/[id]` - Deletar post
- ⚠️ Faltam: POST/PUT para criar/editar posts

---

## 🏗️ Arquitetura Proposta

### **1. Gestão de Posts (Notícias)**

#### **Funcionalidades**
- ✅ Listar posts com filtros (status, categoria, busca)
- 🔨 **Criar novo post** com editor rich text
- 🔨 **Editar post existente**
- ✅ Deletar post
- 🔨 Atribuir múltiplas categorias
- 🔨 Definir status: Publicado / Rascunho
- 🔨 Upload de imagem destacada
- 🔨 SEO: título, slug, excerpt
- 🔨 Autor e data de publicação

#### **Componentes a Criar**
```
/admin/posts/new/page.tsx          → Formulário criar post
/admin/posts/[id]/edit/page.tsx    → Formulário editar post
/components/admin/PostEditor.tsx   → Editor rich text (TipTap/Quill)
/components/admin/CategoryPicker.tsx → Seletor de categorias
/components/admin/MediaUploader.tsx  → Upload de imagens
```

#### **APIs a Criar**
```
POST /api/admin/posts              → Criar post
PUT /api/admin/posts/[id]          → Atualizar post
POST /api/admin/upload             → Upload de mídia
```

---

### **2. Gestão de Categorias**

#### **Funcionalidades**
- 🔨 Listar todas as categorias
- 🔨 Criar nova categoria (nome, slug, descrição)
- 🔨 Editar categoria
- 🔨 Deletar categoria (se não houver posts vinculados)
- 🔨 Limpar categorias duplicadas ("Notícias", "notícias", "not-cias")
- 🔨 Visualizar quantidade de posts por categoria

#### **Categorias Principais Identificadas**
1. **Notícias** (geral)
2. **Comportamento em Foco** ⭐ (seção especial)
3. **Eventos**
4. **Encontros Anuais**
5. **Comunicados**
6. **Editais**
7. **Homenagens**
8. **Notas de Falecimento**
9. **Projetos**
10. **Publicações**

#### **Componentes a Criar**
```
/admin/categorias/page.tsx         → Listagem de categorias
/components/admin/CategoryForm.tsx → Formulário categoria
```

#### **APIs a Criar**
```
POST /api/admin/categories         → Criar categoria
PUT /api/admin/categories/[id]     → Atualizar categoria
DELETE /api/admin/categories/[id]  → Deletar categoria
POST /api/admin/categories/merge   → Mesclar categorias duplicadas
```

---

### **3. Gestão de Conteúdos Restritos**

#### **O que são?**
Documentos e materiais exclusivos para associados (usa tabela `ConteudoRestrito`)

#### **Tipos de Conteúdo**
- **ARTIGO** - Artigos científicos
- **DOWNLOAD** - PDFs, manuais, guias
- **VIDEO** - Vídeos exclusivos
- **NOTICIA** - Notícias exclusivas

#### **Visibilidade**
- PUBLICO
- ASSOCIADOS (requer login)
- ADMIN (apenas administradores)

#### **Funcionalidades**
- 🔨 Listar conteúdos restritos
- 🔨 Criar novo conteúdo
- 🔨 Editar conteúdo
- 🔨 Upload de arquivos anexos (PDFs, etc.)
- 🔨 Definir visibilidade e tipo
- 🔨 Thumbnail/imagem de capa
- 🔨 Ativar/desativar

#### **Componentes a Criar**
```
/admin/conteudos/page.tsx          → Listagem conteúdos restritos
/admin/conteudos/new/page.tsx      → Criar conteúdo
/admin/conteudos/[id]/edit/page.tsx → Editar conteúdo
```

#### **APIs a Criar**
```
GET /api/admin/conteudos           → Listar conteúdos
POST /api/admin/conteudos          → Criar conteúdo
PUT /api/admin/conteudos/[id]      → Atualizar conteúdo
DELETE /api/admin/conteudos/[id]   → Deletar conteúdo
```

---

### **4. Gestão de Páginas Estáticas**

#### **Funcionalidades**
- 🔨 Listar páginas existentes (37 páginas)
- 🔨 Criar nova página
- 🔨 Editar página
- 🔨 Definir template/layout
- 🔨 SEO: título, slug, meta description

#### **Componentes a Criar**
```
/admin/paginas/page.tsx            → Listagem páginas
/admin/paginas/new/page.tsx        → Criar página
/admin/paginas/[id]/edit/page.tsx  → Editar página
```

---

### **5. Gestão de Mídia (Biblioteca)**

#### **Funcionalidades**
- 🔨 Biblioteca de imagens/arquivos
- 🔨 Upload múltiplo
- 🔨 Busca e filtros
- 🔨 Visualizar onde está sendo usado
- 🔨 Deletar mídia

#### **Componentes a Criar**
```
/admin/midia/page.tsx              → Biblioteca de mídia
/components/admin/MediaLibrary.tsx → Modal seletor de mídia
```

---

## 📱 Navegação Admin (Sidebar)

```
🏠 Dashboard
📰 Posts
   ├── Todos os Posts
   ├── Novo Post
   └── Categorias

📁 Páginas
   ├── Todas as Páginas
   └── Nova Página

🔒 Conteúdos Restritos
   ├── Todos os Conteúdos
   └── Novo Conteúdo

📸 Mídia

👥 Associados
💳 Pagamentos
📊 Relatórios
⚙️ Configurações
```

---

## 🎨 Direcionamento por Categoria (Roteamento Inteligente)

### **Comportamento em Foco**
- **Categoria**: "Comportamento em Foco"
- **Rota pública**: `/comportamento-em-foco`
- **Componente**: `app/(site)/comportamento-em-foco/page.tsx`
- **Exibe**: Posts apenas desta categoria

### **Notícias**
- **Categoria**: "Notícias"
- **Rota pública**: `/noticias` ou `/p` (posts)
- **Componente**: `app/(site)/noticias/page.tsx`
- **Exibe**: Todos os posts de notícias

### **Eventos**
- **Categoria**: "Eventos"
- **Rota pública**: `/eventos`
- **Componente**: `app/(site)/eventos/page.tsx`
- **Exibe**: Posts de eventos

### **Roteamento Dinâmico**
```typescript
// app/(site)/[categoria]/page.tsx
export default function CategoriaPage({ params }) {
  // Busca posts pela categoria do slug
  // Ex: /comportamento-em-foco → categoria = "comportamento-em-foco"
}
```

---

## 🔧 Stack Tecnológico

### **Editor Rich Text**
- **TipTap** (recomendado) ou **React-Quill**
- Suporte: negrito, itálico, listas, links, imagens
- Paste de HTML (manter formatação de Word/outros sites)

### **Upload de Arquivos**
- **react-dropzone** para upload drag & drop
- Armazenar em `/public/uploads` ou AWS S3 (futuro)
- Salvar referências em `MediaAsset`

### **Formulários**
- **React Hook Form** + **Zod** para validação

### **UI Components**
- **Heroicons** (já em uso)
- **Headless UI** para modals/dropdowns
- **Tailwind CSS** (já em uso)

---

## 📈 Priorização (Fases)

### **Fase 1: Gestão de Posts** (PRIORITÁRIO) ✨
1. Criar/editar posts
2. Editor rich text
3. Seletor de categorias
4. Upload de imagem destacada
5. Limpar categorias duplicadas

### **Fase 2: Gestão de Conteúdos Restritos**
1. CRUD conteúdos restritos
2. Upload de PDFs/anexos
3. Controle de visibilidade

### **Fase 3: Gestão de Páginas**
1. Editar páginas existentes
2. Criar novas páginas

### **Fase 4: Biblioteca de Mídia**
1. Upload múltiplo
2. Galeria/busca
3. Integração com editor

---

## ✅ Checklist de Implementação

### **APIs (Backend)**
- [ ] `POST /api/admin/posts` - Criar post
- [ ] `PUT /api/admin/posts/[id]` - Atualizar post
- [ ] `POST /api/admin/upload` - Upload de mídia
- [ ] `POST /api/admin/categories` - Criar categoria
- [ ] `PUT /api/admin/categories/[id]` - Atualizar categoria
- [ ] `DELETE /api/admin/categories/[id]` - Deletar categoria
- [ ] `GET /api/admin/conteudos` - Listar conteúdos restritos
- [ ] `POST /api/admin/conteudos` - Criar conteúdo restrito
- [ ] `PUT /api/admin/conteudos/[id]` - Atualizar conteúdo
- [ ] `DELETE /api/admin/conteudos/[id]` - Deletar conteúdo

### **Componentes (Frontend)**
- [ ] `PostEditor.tsx` - Editor com TipTap
- [ ] `CategoryPicker.tsx` - Seletor múltiplo de categorias
- [ ] `MediaUploader.tsx` - Upload de imagens
- [ ] `MediaLibrary.tsx` - Modal biblioteca de mídia
- [ ] `CategoryForm.tsx` - Formulário categorias
- [ ] `ConteudoForm.tsx` - Formulário conteúdos restritos

### **Páginas (Rotas)**
- [ ] `/admin/posts/new/page.tsx` - Criar post
- [ ] `/admin/posts/[id]/edit/page.tsx` - Editar post
- [ ] `/admin/categorias/page.tsx` - Gestão categorias
- [ ] `/admin/conteudos/page.tsx` - Gestão conteúdos restritos
- [ ] `/admin/conteudos/new/page.tsx` - Criar conteúdo
- [ ] `/admin/conteudos/[id]/edit/page.tsx` - Editar conteúdo
- [ ] `/admin/midia/page.tsx` - Biblioteca de mídia

### **Utilitários**
- [ ] Script para limpar categorias duplicadas
- [ ] Middleware de upload (validar tipos, tamanhos)
- [ ] Gerador automático de slugs

---

## 🚀 Próximos Passos Imediatos

1. ✅ Documento de proposta criado
2. **Implementar editor de posts** (`/admin/posts/new`)
3. **Criar API POST /api/admin/posts**
4. **Implementar upload de imagens**
5. **Limpar categorias duplicadas no banco**
6. **Testar fluxo completo**: criar post → publicar → ver no site

---

**📅 Última atualização:** 27/10/2025  
**🔧 Status:** Proposta aprovada, pronto para implementação
