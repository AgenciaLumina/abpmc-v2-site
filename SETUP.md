# ABPMC v2 - Guia de Setup

## Pré-requisitos

- Node.js 18+
- PostgreSQL 12+
- pnpm (recomendado) ou npm

## Instalação

### 1. Instalar dependências

```bash
cd "/Volumes/Dock Station/abpmcdev/abpmc-v2"
pnpm install
```

### 2. Configurar banco de dados

```bash
# Copiar arquivo de ambiente
cp .env.example .env

# Editar .env com suas credenciais PostgreSQL
# DATABASE_URL="postgresql://usuario:senha@localhost:5432/abpmc"
```

### 3. Executar migrations do Prisma

```bash
pnpm db:migrate
```

### 4. Executar ETL completo

```bash
# Inspecionar CSVs primeiro
pnpm etl:inspect

# Executar importação completa
pnpm etl:all
```

### 5. Iniciar servidor de desenvolvimento

```bash
pnpm dev
```

O site estará disponível em: http://localhost:3000

## Scripts Disponíveis

### ETL (Extract, Transform, Load)
- `pnpm etl:inspect` - Inspeciona CSVs e gera relatórios
- `pnpm etl:pages` - Importa páginas do CSV
- `pnpm etl:posts` - Importa posts do CSV
- `pnpm etl:media` - Copia mídias e reescreve links
- `pnpm etl:links` - Reescreve links internos
- `pnpm etl:all` - Executa todo o pipeline ETL

### Banco de dados
- `pnpm db:migrate` - Executa migrations
- `pnpm db:push` - Sincroniza schema (desenvolvimento)
- `pnpm db:studio` - Abre Prisma Studio

### Desenvolvimento
- `pnpm dev` - Servidor de desenvolvimento
- `pnpm build` - Build para produção
- `pnpm start` - Servidor de produção
- `pnpm lint` - Linter

## Estrutura de Rotas

- `/` - Página inicial
- `/p` - Lista de posts
- `/p/[slug]` - Post individual
- `/paginas` - Lista de páginas (QA interno)
- `/pagina/[slug]` - Página individual

## Relatórios

Após executar os scripts ETL, verifique os relatórios em `/reports`:

- `csv-inspection.md` - Análise dos CSVs
- `import-pages.log` - Importação de páginas
- `import-posts.log` - Importação de posts
- `media-manifest.json` - Mapeamento de mídias
- `media-rewrite.log` - Reescrita de links de mídia
- `link-rewrite.log` - Reescrita de links internos

## Troubleshooting

### Erro de conexão com banco
- Verifique se PostgreSQL está rodando
- Confirme credenciais no `.env`
- Teste conexão: `psql -h localhost -U usuario -d abpmc`

### Arquivos CSV não encontrados
- Confirme os caminhos no `.env`
- Verifique se os arquivos existem nos caminhos especificados

### Erro de permissões
- Verifique permissões de leitura nos diretórios de origem
- Confirme permissões de escrita em `/public/uploads`

### Problemas de TypeScript
- Execute `pnpm install` para instalar dependências
- Os erros de lint são esperados até a instalação das dependências

## Próximos Passos (Fase 2)

1. **Deploy na Vercel**
   - Configurar variáveis de ambiente
   - Conectar banco Vercel Postgres
   - Deploy automático via Git

2. **Refinamento Visual**
   - Implementar design system
   - Substituir HTML legado por componentes React
   - Otimizar performance

3. **Funcionalidades Avançadas**
   - Sistema de busca
   - Categorias e tags
   - SEO otimizado
   - Sitemap automático

## Suporte

Para problemas ou dúvidas:
1. Verifique os logs em `/reports`
2. Consulte a documentação do Prisma
3. Revise as configurações no `.env`
