# 📋 PLANO DE MIGRAÇÃO COMPLETA - ABPMC v2

**Data:** 27/10/2025  
**Objetivo:** Finalizar importação de todos os dados do site antigo

---

## 🔍 STATUS ATUAL DO PROJETO

### **✅ O QUE JÁ TEMOS:**

#### **Schema Prisma:**
- ✅ Model `Content` (para posts/páginas)
- ✅ Model `Term` (para categorias/tags)
- ✅ Model `ContentTerm` (relacionamento conteúdo ↔ categorias)
- ✅ Model `Associado` (para sócios com campos Lattes e visibilidade)
- ✅ Enum `ContentType` (POST, PAGE)
- ✅ Enum `Taxonomy` (category, post_tag)

#### **Scripts:**
- ✅ `scripts/importar-todos-direto.ts` (apenas 52 sócios)
- ❌ Script de migração de posts (FALTA)
- ❌ Script de migração de encontros (FALTA)

#### **Páginas:**
- ✅ `/noticias` - Listagem (com 6 posts mock)
- ✅ `/noticias/[slug]` - Post individual (dinâmico)
- ❌ `/socios` ou `/associados` - Página pública (FALTA)
- ❌ `/encontros/[ano]` - Histórico de encontros (FALTA)

#### **Dados:**
- 🟡 **Sócios:** 52 no script, faltam ~650 (total 700+)
- 🟡 **Posts:** 6 mock, faltam ~300 reais do site antigo
- ❌ **Encontros:** 0 importados, faltam 34 (1992-2025)

---

## 🎯 PLANO DE EXECUÇÃO

### **ETAPA 1: SÓCIOS** 🔴 PRIORIDADE MÁXIMA

#### **1.1 Verificar Status no Banco**
```bash
# Contar sócios já importados
npx prisma studio
# Ou via SQL
```

#### **1.2 Executar Importação dos 52 Sócios**
```bash
npx ts-node scripts/importar-todos-direto.ts
```

**Resultado esperado:**
- ✅ 52 sócios no banco de dados
- ✅ Senha padrão: `MudarSenha@2025`
- ✅ Todos com `visivelNoSite: true`
- ✅ Currículo Lattes vinculado

#### **1.3 Criar Página Pública de Sócios**
**Arquivo:** `/app/(site)/socios/page.tsx`

**Layout:**
- HeaderInterno
- Grid responsivo (3-4 colunas)
- Card por sócio: Nome + Link Lattes
- Ordenação alfabética
- Filtro de busca por nome

**Exemplo de card:**
```tsx
<div className="bg-white border border-[#e6e8ef] rounded-xl p-6 hover:shadow-lg transition">
  <h3 className="font-semibold text-[#0B2E47] mb-2">
    {socio.nome}
  </h3>
  {socio.curriculoLattes && (
    <a href={socio.curriculoLattes} target="_blank" 
       className="text-[#2b4e6d] hover:text-[#22949e] text-sm">
      📄 Currículo Lattes →
    </a>
  )}
</div>
```

#### **1.4 Aguardar Dados Completos**
⚠️ **Usuário precisa fornecer:**
- Array JavaScript completo com 700+ sócios
- Formato: `[{name, email, cv}, ...]`
- Colar no arquivo `scripts/importar-todos-direto.ts` (linha 7)

---

### **ETAPA 2: POSTS/NOTÍCIAS** 🟡 ALTA PRIORIDADE

#### **2.1 Analisar Posts do Site Antigo**

**Sitemap identificou ~300 posts:**
- Nota de falecimentos
- Comunicados institucionais
- Notícias de eventos
- Homenagens
- Editais
- Convocações

#### **2.2 Criar Categorias no Banco**

**Categorias necessárias:**
```typescript
const categorias = [
  "Institucional",
  "Eventos",
  "Publicações",
  "Editais",
  "Comunicados",
  "Homenagens",
  "Notas de Falecimento",
];
```

**Script de criação:**
```bash
# Criar arquivo: scripts/criar-categorias.ts
npx ts-node scripts/criar-categorias.ts
```

#### **2.3 Criar Script de Migração de Posts**

**Arquivo:** `scripts/migrar-posts-antigos.ts`

**Funcionalidades:**
1. Ler sitemap de posts do site antigo
2. Para cada post:
   - Fetch do conteúdo HTML
   - Extrair: título, data, categoria, conteúdo
   - Gerar slug a partir do título
   - Limpar HTML (remover scripts, estilos inline)
3. Criar no banco usando `Content.create()`
4. Vincular categorias via `ContentTerm.create()`

**Estrutura:**
```typescript
{
  type: "POST",
  title: "Título do post",
  slug: "titulo-do-post",
  html: "<p>Conteúdo...</p>",
  excerpt: "Resumo...",
  publishedAt: new Date("2021-08-02"),
  status: "publish",
  terms: {
    create: [
      {
        term: {
          connect: { slug: "institucional" }
        }
      }
    ]
  }
}
```

#### **2.4 Migração Gradual**
Devido ao volume (~300 posts), fazer em lotes:
- Lote 1: 50 posts mais recentes
- Lote 2: 100 posts
- Lote 3: Restante

#### **2.5 Atualizar Página de Notícias**

**Modificar:** `/app/(site)/noticias/page.tsx`

**Antes:** Dados mock de `lib/posts-data.ts`  
**Depois:** Dados reais do banco via API

```typescript
// Criar: /app/api/posts/route.ts
export async function GET() {
  const posts = await prisma.content.findMany({
    where: { type: "POST" },
    include: {
      terms: {
        include: { term: true }
      }
    },
    orderBy: { publishedAt: "desc" },
    take: 12,
  });
  
  return Response.json(posts);
}
```

---

### **ETAPA 3: ENCONTROS HISTÓRICOS** 🟡 MÉDIA PRIORIDADE

#### **3.1 Estrutura de Dados**

**34 Encontros (1992-2025):**
- I a XXXIV Encontros Brasileiros de Psicologia e Medicina Comportamental
- Dados: ano, local, tema, palestrantes, anais

#### **3.2 Criar Template de Encontro**

**Arquivo:** `/app/(site)/encontros/[ano]/page.tsx`

**Layout padrão:**
```tsx
export default function EncontroPage({ params }: { params: { ano: string } }) {
  // Buscar dados do encontro por ano
  const encontro = getEncontroByAno(params.ano);
  
  return (
    <>
      <HeaderInterno titulo={`${encontro.numero}º Encontro ABPMC - ${encontro.ano}`} />
      
      <main className="bg-white">
        {/* Info do Encontro */}
        <section className="py-20 px-6 md:px-16">
          <div className="max-w-5xl mx-auto space-y-8">
            
            <div className="bg-white border border-[#e6e8ef] rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-[#0B2E47] mb-4">
                {encontro.tema}
              </h2>
              <div className="grid md:grid-cols-2 gap-6 text-lg">
                <div>
                  <p className="text-[#5a6575]">
                    <strong>Local:</strong> {encontro.local}
                  </p>
                  <p className="text-[#5a6575]">
                    <strong>Data:</strong> {encontro.data}
                  </p>
                </div>
                <div>
                  <p className="text-[#5a6575]">
                    <strong>Participantes:</strong> {encontro.participantes}
                  </p>
                </div>
              </div>
            </div>

            {/* Anais */}
            {encontro.anaisUrl && (
              <div className="bg-gradient-to-br from-[#f8f9fa] to-[#e8eef3] rounded-2xl p-8 text-center">
                <h3 className="text-xl font-semibold text-[#0B2E47] mb-4">
                  Anais do Encontro
                </h3>
                <a 
                  href={encontro.anaisUrl}
                  target="_blank"
                  className="inline-block bg-[#2b4e6d] hover:bg-[#22949e] text-white px-8 py-3 rounded-full"
                >
                  📄 Baixar Anais
                </a>
              </div>
            )}

          </div>
        </section>
      </main>
    </>
  );
}
```

#### **3.3 Criar Arquivo de Dados**

**Arquivo:** `/lib/encontros-data.ts`

```typescript
export const encontros = [
  {
    numero: "I",
    ano: "1992",
    tema: "Primeiro Encontro Brasileiro de Psicoterapia e Medicina Comportamental",
    local: "UERJ, Rio de Janeiro",
    data: "20 a 22 de novembro de 1992",
    participantes: "~150",
    anaisUrl: null,
  },
  {
    numero: "II",
    ano: "1993",
    tema: "...",
    local: "...",
    data: "...",
    participantes: "...",
    anaisUrl: "https://...",
  },
  // ... até XXXIV (2025)
];
```

#### **3.4 Página de Listagem**

**Arquivo:** `/app/(site)/encontros/historico/page.tsx`

Timeline dos 34 encontros com links para páginas individuais.

---

## 📊 CHECKLIST DE EXECUÇÃO

### **SPRINT 1 - SÓCIOS** ⏳
- [ ] Verificar quantos sócios já estão no banco
- [ ] Executar script de importação dos 52
- [ ] Criar página `/socios` (listagem pública)
- [ ] Criar API `/api/socios` (listar públicos)
- [ ] Testar visualização pública
- [ ] Solicitar dados completos dos 700+ ao usuário

### **SPRINT 2 - CATEGORIAS E POSTS** ⏳
- [ ] Criar script de categorias
- [ ] Executar criação de 7 categorias base
- [ ] Criar script de migração de posts
- [ ] Testar com 10 posts primeiro
- [ ] Migrar lote 1 (50 posts recentes)
- [ ] Criar API `/api/posts`
- [ ] Atualizar página `/noticias` para usar API
- [ ] Verificar vinculação de categorias

### **SPRINT 3 - ENCONTROS** ⏳
- [ ] Coletar dados dos 34 encontros
- [ ] Criar arquivo `lib/encontros-data.ts`
- [ ] Criar template `/encontros/[ano]/page.tsx`
- [ ] Criar página `/encontros/historico`
- [ ] Popular com dados de 1992 a 2025
- [ ] Testar rotas dinâmicas

---

## 🚀 PRÓXIMOS PASSOS IMEDIATOS

1. **AGORA:** Criar página pública de sócios
2. **AGORA:** Executar importação dos 52 sócios
3. **DEPOIS:** Criar scripts de categorias e posts
4. **POR ÚLTIMO:** Template de encontros

---

## ⚠️ DEPENDÊNCIAS DO USUÁRIO

### **Para Completar 100%:**

1. **Array completo de 700+ sócios**
   - Formato: `[{name, email, cv}, ...]`
   - Com emails válidos
   - Currículos Lattes quando disponíveis

2. **Confirmação de categorias de posts**
   - Lista final de categorias a usar
   - Pode adicionar mais além das 7 sugeridas

3. **Dados dos 34 encontros**
   - Anos, locais, temas, datas
   - Links para anais (quando disponíveis)
   - Pode ser fornecido gradualmente

---

**Status:** Pronto para iniciar Etapa 1 (Sócios)  
**Próxima ação:** Criar página `/socios` e API
