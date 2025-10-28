# Implementação Rápida - Admin Dashboard

## 🎯 OBJETIVO
Criar dashboard admin completo para gerenciar todo o conteúdo do site ABPMC.

---

## ✅ JÁ IMPLEMENTADO

### 1. Dashboard Principal
- ✅ Estatísticas gerais
- ✅ Gráficos de receita
- ✅ Status de associados
- ✅ Últimas transações
- ✅ Cards informativos

### 2. Estrutura Base
- ✅ Layout admin com sidebar
- ✅ Autenticação NextAuth
- ✅ Proteção de rotas
- ✅ Banco de dados Prisma

### 3. Dados Migrados
- ✅ 370 posts
- ✅ 34 páginas
- ✅ 722 associados
- ✅ 6 categorias
- ✅ Planos e transações

---

## 🚧 A IMPLEMENTAR

### FASE 1: Gerenciamento de Conteúdo (PRIORITÁRIO)

#### 1.1 Posts/Notícias (`/admin/posts`)
```typescript
// Funcionalidades principais:
- Listar posts com paginação
- Criar novo post
- Editar post existente
- Excluir post
- Filtrar por categoria
- Buscar por título
- Alterar status (publish/draft)
- Upload de imagem
```

**API Necessária:**
```typescript
// app/api/admin/posts/route.ts
GET    /api/admin/posts          // Listar
POST   /api/admin/posts          // Criar
PUT    /api/admin/posts/[id]     // Editar
DELETE /api/admin/posts/[id]     // Excluir
```

#### 1.2 Páginas (`/admin/conteudos`)
```typescript
// Funcionalidades principais:
- Listar páginas
- Criar nova página
- Editar página
- Excluir página
- Editor WYSIWYG
```

**API Necessária:**
```typescript
// app/api/admin/pages/route.ts
GET    /api/admin/pages          // Listar
POST   /api/admin/pages          // Criar
PUT    /api/admin/pages/[id]     // Editar
DELETE /api/admin/pages/[id]     // Excluir
```

#### 1.3 Categorias (`/admin/categorias`)
```typescript
// Funcionalidades principais:
- Listar categorias
- Criar categoria
- Editar categoria
- Excluir categoria
- Ver posts por categoria
```

---

### FASE 2: Gerenciamento de Usuários

#### 2.1 Associados (`/admin/associados`)
```typescript
// Funcionalidades principais:
- Listar associados com filtros
- Editar dados do associado
- Alterar status
- Resetar senha
- Ver histórico de pagamentos
- Exportar lista CSV
```

**API Necessária:**
```typescript
// app/api/admin/associados/route.ts
GET    /api/admin/associados              // Listar
GET    /api/admin/associados/[id]         // Detalhes
PUT    /api/admin/associados/[id]         // Editar
POST   /api/admin/associados/[id]/reset   // Reset senha
GET    /api/admin/associados/export       // Exportar CSV
```

#### 2.2 Sócios Públicos (`/admin/socios`)
```typescript
// Funcionalidades principais:
- Listar sócios visíveis
- Alterar visibilidade
- Editar informações públicas
- Ordenar lista
```

---

### FASE 3: Gerenciamento Financeiro

#### 3.1 Transações (`/admin/pagamentos`)
```typescript
// Funcionalidades principais:
- Listar transações
- Filtrar por status/período
- Aprovar pagamento
- Rejeitar pagamento
- Ver detalhes
- Gerar relatório
```

**API Necessária:**
```typescript
// app/api/admin/transacoes/route.ts
GET    /api/admin/transacoes                  // Listar
PUT    /api/admin/transacoes/[id]/aprovar    // Aprovar
PUT    /api/admin/transacoes/[id]/rejeitar   // Rejeitar
GET    /api/admin/transacoes/relatorio       // Relatório
```

#### 3.2 Planos (`/admin/planos`)
```typescript
// Funcionalidades principais:
- Listar planos
- Criar plano
- Editar plano
- Ativar/desativar
- Ver associados do plano
```

---

### FASE 4: Documentos e Arquivos

#### 4.1 Upload de Documentos (`/admin/documentos`)
```typescript
// Funcionalidades principais:
- Upload de PDFs/DOCs
- Organizar por categoria
- Definir visibilidade
- Download
- Excluir
```

**API Necessária:**
```typescript
// app/api/admin/documentos/route.ts
POST   /api/admin/documentos/upload    // Upload
GET    /api/admin/documentos            // Listar
DELETE /api/admin/documentos/[id]      // Excluir
```

---

### FASE 5: Configurações

#### 5.1 Configurações Gerais (`/admin/configuracoes`)
```typescript
// Funcionalidades principais:
- Informações do site
- Contato e redes sociais
- SEO global
- Configuração de email
- Integração Mercado Pago
- Backup
```

---

## 🔧 COMPONENTES REUTILIZÁVEIS

### 1. DataTable Component
```typescript
// components/admin/DataTable.tsx
interface DataTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  pagination?: boolean;
  searchable?: boolean;
}
```

### 2. FormBuilder Component
```typescript
// components/admin/FormBuilder.tsx
interface FormBuilderProps {
  fields: Field[];
  onSubmit: (data: any) => void;
  initialData?: any;
  loading?: boolean;
}
```

### 3. RichTextEditor Component
```typescript
// components/admin/RichTextEditor.tsx
interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
```

### 4. FileUploader Component
```typescript
// components/admin/FileUploader.tsx
interface FileUploaderProps {
  onUpload: (file: File) => void;
  accept?: string;
  maxSize?: number;
  preview?: boolean;
}
```

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

### Gerenciamento de Conteúdo
- [ ] API de Posts (CRUD completo)
- [ ] Página de listagem de posts
- [ ] Formulário de criar/editar post
- [ ] Upload de imagem para posts
- [ ] API de Páginas (CRUD completo)
- [ ] Página de listagem de páginas
- [ ] Formulário de criar/editar página
- [ ] API de Categorias (CRUD completo)
- [ ] Página de gerenciamento de categorias

### Gerenciamento de Usuários
- [ ] API de Associados (listagem e edição)
- [ ] Página de listagem de associados
- [ ] Formulário de editar associado
- [ ] Função de reset de senha
- [ ] Exportação CSV
- [ ] Página de sócios públicos
- [ ] Alterar visibilidade de sócios

### Gerenciamento Financeiro
- [ ] API de Transações
- [ ] Página de listagem de transações
- [ ] Aprovar/rejeitar pagamentos
- [ ] Relatórios financeiros
- [ ] API de Planos
- [ ] Página de gerenciamento de planos
- [ ] Criar/editar planos

### Documentos
- [ ] API de upload de documentos
- [ ] Página de gerenciamento de documentos
- [ ] Upload com drag & drop
- [ ] Organização por categoria
- [ ] Download de documentos

### Componentes
- [ ] DataTable reutilizável
- [ ] FormBuilder reutilizável
- [ ] RichTextEditor (TinyMCE ou similar)
- [ ] FileUploader com preview
- [ ] Modal de confirmação
- [ ] StatusBadge
- [ ] LoadingSpinner
- [ ] Toast notifications

### Configurações
- [ ] Página de configurações gerais
- [ ] Configuração de email
- [ ] Configuração de pagamento
- [ ] Backup do banco
- [ ] Logs do sistema

---

## 🚀 COMANDOS ÚTEIS

### Criar API Route
```bash
# Exemplo: API de Posts
touch app/api/admin/posts/route.ts
```

### Criar Página Admin
```bash
# Exemplo: Página de Posts
touch app/admin/posts/page.tsx
touch app/admin/posts/novo/page.tsx
touch app/admin/posts/[id]/editar/page.tsx
```

### Criar Componente
```bash
# Exemplo: DataTable
touch components/admin/DataTable.tsx
```

---

## 📦 DEPENDÊNCIAS NECESSÁRIAS

```json
{
  "dependencies": {
    "@tanstack/react-table": "^8.10.0",    // Tabelas
    "react-hook-form": "^7.48.0",          // Formulários
    "@tinymce/tinymce-react": "^4.3.0",    // Editor WYSIWYG
    "react-dropzone": "^14.2.3",           // Upload de arquivos
    "react-hot-toast": "^2.4.1",           // Notificações
    "date-fns": "^2.30.0",                 // Manipulação de datas
    "xlsx": "^0.18.5",                     // Exportar Excel
    "papaparse": "^5.4.1"                  // Exportar CSV
  }
}
```

---

## 🎨 DESIGN SYSTEM

### Cores
```css
--admin-bg: #0f172a;          /* Fundo escuro */
--admin-card: #1e293b;        /* Cards */
--admin-border: #334155;      /* Bordas */
--admin-text: #f1f5f9;        /* Texto principal */
--admin-text-muted: #94a3b8;  /* Texto secundário */
--admin-primary: #3b82f6;     /* Azul primário */
--admin-success: #10b981;     /* Verde sucesso */
--admin-warning: #f59e0b;     /* Amarelo aviso */
--admin-danger: #ef4444;      /* Vermelho erro */
```

### Componentes Base
- Botões: Primary, Secondary, Danger, Ghost
- Inputs: Text, Email, Number, Date, Select, Textarea
- Cards: Com header, body e footer
- Modals: Confirmação, Formulário, Visualização
- Tables: Com ordenação, paginação e busca

---

## 📝 EXEMPLO DE IMPLEMENTAÇÃO

### API de Posts
```typescript
// app/api/admin/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const search = searchParams.get("search") || "";
  const categoria = searchParams.get("categoria") || "";

  const where = {
    type: "POST",
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
      ],
    }),
    ...(categoria && {
      terms: {
        some: {
          term: {
            slug: categoria,
          },
        },
      },
    }),
  };

  const [posts, total] = await Promise.all([
    prisma.content.findMany({
      where,
      include: {
        terms: {
          include: {
            term: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.content.count({ where }),
  ]);

  return NextResponse.json({
    posts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const data = await request.json();

  const post = await prisma.content.create({
    data: {
      type: "POST",
      title: data.title,
      slug: data.slug,
      html: data.html,
      excerpt: data.excerpt,
      status: data.status || "draft",
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
      author: session.user.nome,
    },
  });

  // Associar categorias
  if (data.categorias && data.categorias.length > 0) {
    await prisma.contentTerm.createMany({
      data: data.categorias.map((catId: number) => ({
        contentId: post.id,
        termId: catId,
      })),
    });
  }

  return NextResponse.json({ post }, { status: 201 });
}
```

---

## 🎯 PRÓXIMOS PASSOS IMEDIATOS

1. **Instalar dependências**
   ```bash
   npm install @tanstack/react-table react-hook-form react-hot-toast
   ```

2. **Criar componentes base**
   - DataTable
   - FormBuilder
   - Modal

3. **Implementar APIs**
   - Posts (CRUD)
   - Páginas (CRUD)
   - Associados (listagem e edição)

4. **Criar páginas admin**
   - Listagem de posts
   - Formulário de post
   - Listagem de associados

5. **Testar funcionalidades**
   - Criar post
   - Editar post
   - Excluir post
   - Filtrar e buscar

---

**Status:** Planejamento e estrutura criados  
**Data:** 28/10/2025  
**Próximo:** Implementação dos componentes e APIs
