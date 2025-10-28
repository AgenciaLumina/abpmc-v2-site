# Dashboard Admin Completo - Planejamento e Implementação

## 📋 ESTRUTURA ATUAL

```
app/admin/
├── dashboard/          ✅ Existe (estatísticas gerais)
├── associados/         ⚠️  Vazio (precisa implementar)
├── posts/              ⚠️  Vazio (precisa implementar)
├── conteudos/          ⚠️  Vazio (precisa implementar)
├── socios/             ⚠️  Vazio (precisa implementar)
├── planos/             ⚠️  Vazio (precisa implementar)
├── pagamentos/         ⚠️  Vazio (precisa implementar)
└── layout.tsx          ✅ Existe
```

---

## 🎯 FUNCIONALIDADES A IMPLEMENTAR

### 1. Gerenciamento de Posts/Notícias
**Rota:** `/admin/posts`

**Funcionalidades:**
- ✅ Listar todos os posts
- ✅ Filtrar por categoria
- ✅ Buscar por título
- ✅ Criar novo post
- ✅ Editar post existente
- ✅ Excluir post
- ✅ Alterar status (publicado/rascunho)
- ✅ Upload de imagem destacada
- ✅ Editor WYSIWYG
- ✅ Associar categorias
- ✅ Definir data de publicação

**Campos do Post:**
- Título
- Slug (gerado automaticamente)
- Conteúdo HTML
- Excerpt (resumo)
- Categoria(s)
- Status (publish/draft)
- Data de publicação
- Autor

---

### 2. Gerenciamento de Páginas
**Rota:** `/admin/conteudos`

**Funcionalidades:**
- ✅ Listar todas as páginas
- ✅ Criar nova página
- ✅ Editar página existente
- ✅ Excluir página
- ✅ Alterar status
- ✅ Editor WYSIWYG
- ✅ SEO (meta title, description)

**Páginas Especiais:**
- Comportamento em Foco
- Quem Somos
- Diretoria
- Estatuto
- Convocações
- Editais

---

### 3. Gerenciamento de Associados
**Rota:** `/admin/associados`

**Funcionalidades:**
- ✅ Listar todos os associados
- ✅ Filtrar por status (ativo/vencido/bloqueado)
- ✅ Buscar por nome/email
- ✅ Ver detalhes do associado
- ✅ Editar dados do associado
- ✅ Alterar status
- ✅ Resetar senha
- ✅ Gerenciar plano
- ✅ Ver histórico de pagamentos
- ✅ Exportar lista (CSV/Excel)
- ✅ Enviar email em massa

**Campos Editáveis:**
- Nome
- Email
- CPF
- Telefone
- Endereço completo
- Currículo Lattes
- Status (ativo/vencido/bloqueado)
- Role (associado/admin)
- Visível no site
- Plano associado
- Data de vencimento

---

### 4. Gerenciamento de Sócios (Página Pública)
**Rota:** `/admin/socios`

**Funcionalidades:**
- ✅ Listar sócios visíveis no site
- ✅ Alterar visibilidade
- ✅ Editar informações públicas
- ✅ Ordenar lista
- ✅ Importar em massa
- ✅ Exportar lista

---

### 5. Gerenciamento de Planos
**Rota:** `/admin/planos`

**Funcionalidades:**
- ✅ Listar todos os planos
- ✅ Criar novo plano
- ✅ Editar plano existente
- ✅ Ativar/desativar plano
- ✅ Definir preço
- ✅ Definir duração
- ✅ Definir benefícios
- ✅ Ver associados do plano

**Campos do Plano:**
- Nome
- Descrição
- Valor
- Duração (dias)
- Recorrente (sim/não)
- Ativo (sim/não)
- Benefícios (lista)

---

### 6. Gerenciamento de Pagamentos/Transações
**Rota:** `/admin/pagamentos`

**Funcionalidades:**
- ✅ Listar todas as transações
- ✅ Filtrar por status
- ✅ Filtrar por período
- ✅ Buscar por associado
- ✅ Ver detalhes da transação
- ✅ Aprovar pagamento manual
- ✅ Rejeitar pagamento
- ✅ Gerar comprovante
- ✅ Exportar relatório
- ✅ Dashboard financeiro

**Status de Transação:**
- PENDENTE
- APROVADO
- REJEITADO
- CANCELADO

---

### 7. Gerenciamento de Categorias
**Rota:** `/admin/categorias`

**Funcionalidades:**
- ✅ Listar categorias
- ✅ Criar categoria
- ✅ Editar categoria
- ✅ Excluir categoria
- ✅ Ver posts da categoria
- ✅ Reordenar categorias

**Categorias Principais:**
- Notícias
- Eventos
- Encontros Anuais
- Artigos Históricos
- Histórias e Personagens
- Comportamento em Foco

---

### 8. Gerenciamento de Documentos
**Rota:** `/admin/documentos`

**Funcionalidades:**
- ✅ Upload de documentos (PDF, DOC, etc.)
- ✅ Organizar por categoria
- ✅ Definir visibilidade (público/restrito)
- ✅ Associar a páginas/posts
- ✅ Download de documentos
- ✅ Excluir documentos

**Tipos de Documentos:**
- Estatuto
- Regimento Interno
- Atas de Reunião
- Editais
- Convocações
- Certificados
- Materiais de Eventos

---

### 9. Configurações do Sistema
**Rota:** `/admin/configuracoes`

**Funcionalidades:**
- ✅ Configurações gerais do site
- ✅ Informações de contato
- ✅ Redes sociais
- ✅ SEO global
- ✅ Email (SMTP)
- ✅ Integração Mercado Pago
- ✅ Backup do banco
- ✅ Logs do sistema

---

## 🔄 FLUXOS PRINCIPAIS

### Fluxo 1: Criar e Publicar Notícia
```
1. Admin acessa /admin/posts
2. Clica em "Nova Notícia"
3. Preenche título, conteúdo, categoria
4. Faz upload de imagem (opcional)
5. Define status (publicado/rascunho)
6. Salva
7. Post aparece em /categoria/noticias
```

### Fluxo 2: Gerenciar Associado
```
1. Admin acessa /admin/associados
2. Busca associado por nome/email
3. Clica em "Editar"
4. Atualiza dados (endereço, telefone, etc.)
5. Altera status se necessário
6. Salva alterações
7. Associado recebe email de confirmação
```

### Fluxo 3: Aprovar Pagamento
```
1. Admin acessa /admin/pagamentos
2. Filtra por "PENDENTE"
3. Clica em transação
4. Verifica comprovante
5. Aprova ou rejeita
6. Sistema atualiza status do associado
7. Associado recebe email de confirmação
```

### Fluxo 4: Criar Página Especial
```
1. Admin acessa /admin/conteudos
2. Clica em "Nova Página"
3. Seleciona template (ex: Comportamento em Foco)
4. Preenche conteúdo
5. Define slug (/comportamento-em-foco)
6. Publica
7. Página fica disponível no menu
```

### Fluxo 5: Upload de Documento
```
1. Admin acessa /admin/documentos
2. Clica em "Upload"
3. Seleciona arquivo (PDF)
4. Define categoria (ex: Editais)
5. Define visibilidade (público/restrito)
6. Salva
7. Documento fica disponível para download
```

---

## 📊 APIs NECESSÁRIAS

### Posts
- `GET /api/admin/posts` - Listar posts
- `POST /api/admin/posts` - Criar post
- `PUT /api/admin/posts/[id]` - Editar post
- `DELETE /api/admin/posts/[id]` - Excluir post

### Páginas
- `GET /api/admin/pages` - Listar páginas
- `POST /api/admin/pages` - Criar página
- `PUT /api/admin/pages/[id]` - Editar página
- `DELETE /api/admin/pages/[id]` - Excluir página

### Associados
- `GET /api/admin/associados` - Listar associados
- `GET /api/admin/associados/[id]` - Detalhes
- `PUT /api/admin/associados/[id]` - Editar
- `POST /api/admin/associados/[id]/reset-senha` - Resetar senha
- `GET /api/admin/associados/export` - Exportar CSV

### Transações
- `GET /api/admin/transacoes` - Listar transações
- `PUT /api/admin/transacoes/[id]/aprovar` - Aprovar
- `PUT /api/admin/transacoes/[id]/rejeitar` - Rejeitar

### Documentos
- `POST /api/admin/documentos/upload` - Upload
- `GET /api/admin/documentos` - Listar
- `DELETE /api/admin/documentos/[id]` - Excluir

### Categorias
- `GET /api/admin/categorias` - Listar
- `POST /api/admin/categorias` - Criar
- `PUT /api/admin/categorias/[id]` - Editar
- `DELETE /api/admin/categorias/[id]` - Excluir

---

## 🎨 COMPONENTES REUTILIZÁVEIS

### 1. DataTable
- Tabela com paginação
- Ordenação por coluna
- Busca
- Filtros
- Ações em massa

### 2. FormBuilder
- Campos de formulário
- Validação
- Upload de arquivos
- Editor WYSIWYG
- Seleção de data

### 3. Modal
- Confirmação de ações
- Formulários
- Visualização de detalhes

### 4. StatusBadge
- Badges coloridos por status
- Ativo/Vencido/Bloqueado
- Aprovado/Pendente/Rejeitado

### 5. FileUploader
- Drag & drop
- Preview de imagens
- Validação de tipo/tamanho
- Progress bar

---

## 🔐 PERMISSÕES

### ADMIN
- ✅ Acesso total ao dashboard
- ✅ Gerenciar posts/páginas
- ✅ Gerenciar associados
- ✅ Aprovar pagamentos
- ✅ Gerenciar planos
- ✅ Upload de documentos
- ✅ Configurações do sistema

### ASSOCIADO
- ✅ Ver próprio perfil
- ✅ Editar dados pessoais
- ✅ Ver histórico de pagamentos
- ✅ Baixar comprovantes
- ❌ Sem acesso ao admin

---

## 📱 RESPONSIVIDADE

- ✅ Desktop (1920px+)
- ✅ Laptop (1366px)
- ✅ Tablet (768px)
- ✅ Mobile (375px)

---

## 🚀 PRIORIDADE DE IMPLEMENTAÇÃO

### Fase 1 (Crítico)
1. ✅ Gerenciamento de Posts
2. ✅ Gerenciamento de Associados
3. ✅ Gerenciamento de Pagamentos

### Fase 2 (Importante)
4. ✅ Gerenciamento de Páginas
5. ✅ Gerenciamento de Categorias
6. ✅ Upload de Documentos

### Fase 3 (Desejável)
7. ✅ Gerenciamento de Planos
8. ✅ Configurações do Sistema
9. ✅ Relatórios e Analytics

---

## 📝 PRÓXIMOS PASSOS

1. [ ] Criar APIs para cada módulo
2. [ ] Implementar páginas do admin
3. [ ] Criar componentes reutilizáveis
4. [ ] Implementar upload de arquivos
5. [ ] Adicionar validações
6. [ ] Implementar permissões
7. [ ] Testes de integração
8. [ ] Documentação de uso
9. [ ] Deploy em produção

---

**Status:** Planejamento completo  
**Data:** 28/10/2025  
**Próximo:** Implementação das páginas e APIs
