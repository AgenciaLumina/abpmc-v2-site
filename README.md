# ABPMC v2 - Migração de Conteúdo

Projeto de migração do site da ABPMC com foco em velocidade e segurança de dados.

## Setup Inicial (macOS)

⚠️ **Importante**: Os caminhos contêm espaços, sempre usar aspas nos comandos.

1. **Instalar dependências:**
```bash
cd "/Volumes/Dock Station/abpmcdev/abpmc-v2"
pnpm install
```

2. **Configurar banco de dados:**
```bash
cp .env.example .env
# Editar DATABASE_URL no .env com suas credenciais PostgreSQL
pnpm db:migrate
```

3. **Executar ETL completo:**
```bash
pnpm etl:all
```

4. **Iniciar desenvolvimento:**
```bash
pnpm dev
```

## Estrutura do Projeto

```
/app
  /(site)        -> rotas públicas
    /p           -> posts
    /pagina      -> páginas
  /api
    /etl         -> endpoints utilitários (opcional)
/lib             -> conexão DB, utilitários ETL/render
/prisma          -> schema/migrations/seeds
/scripts         -> ETL CSV/SQL, mídia, relatórios
/reports         -> relatórios de inspeção/import
/public
  /uploads       -> imagens copiadas do export estático
  /estatico      -> espelho para consulta do legado
```

## Rotas Disponíveis

- `/p` - Lista de posts
- `/p/[slug]` - Post individual
- `/paginas` - Lista de páginas (QA interno)
- `/pagina/[slug]` - Página individual
- `/estatico` - Consulta ao export estático (QA)

## Scripts ETL

- `etl:inspect` - Inspeciona CSVs e gera relatórios
- `etl:pages` - Importa páginas do CSV
- `etl:posts` - Importa posts do CSV  
- `etl:media` - Copia mídias e reescreve links
- `etl:links` - Reescreve links internos
- `etl:all` - Executa todo o pipeline ETL

## Fase Atual: Conteúdo Primeiro

Esta versão mantém fidelidade ao HTML legado com sanitização, preparando base para futura refatoração visual em React/Tailwind.

## Critérios de Aceite

- [x] Setup do projeto Next.js + TypeScript + Prisma
- [ ] CSVs inspecionados com relatório de colunas
- [ ] Páginas e posts importados no PostgreSQL (≥95%)
- [ ] Mídias copiadas e links reescritos
- [ ] Rotas renderizando HTML original sanitizado
- [ ] Listas funcionais para QA
- [ ] Relatórios documentando imports

## Preparação para Vercel

- Configuração compatível (sem custom server)
- Sem dependências de FS de escrita em runtime
- Documentação para Fase 2 (redesign visual)
