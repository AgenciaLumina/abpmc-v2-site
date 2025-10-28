# Auditoria de Links do Menu - Status e Correções

## 🔴 PROBLEMA IDENTIFICADO

Mudamos links de `/pagina/[slug]` para `/[slug]` mas as páginas existem no banco de dados e são acessadas via rota dinâmica `/pagina/[slug]`.

## ✅ LINKS CORRIGIDOS

### INSTITUCIONAL
- ✅ **Quem somos**: `/pagina/quem-somos` - CORRIGIDO (era `/quem-somos`)
- ✅ **Diretoria**: `/diretoria` - OK (tem página própria)
- ✅ **Convocações**: `/convocacoes` - OK (página criada)
- ✅ **Editais**: `/editais` - OK (página criada)
- ✅ **Estatuto**: `/estatuto` - OK (tem página própria)
- ✅ **Transparência**: `/transparencia` - OK (página criada)

## ⚠️ LINKS A VERIFICAR

### COMISSÕES (precisam verificar se existem no banco ou se são páginas criadas)

**Páginas que CRIAMOS (devem funcionar):**
- ✅ `/comissao-abpmc-historia` - Criada
- ✅ `/comissao-abpmc-comunidade` - Criada
- ✅ `/comissoes-acreditacao` - Copiada

**Páginas que FALTAM CRIAR:**
- ⏳ `/comissao-de-assuntos-profissionais-legais-e-eticos` - PENDENTE
- ⏳ `/comissao-de-comunicacao` - PENDENTE
- ⏳ `/comissao-de-desenvolvimento-atipico` - PENDENTE
- ⏳ `/comissao-de-estudantes` - PENDENTE
- ⏳ `/comissao-de-jornadas-e-eventos-regionais` - PENDENTE

### EDITORA (subitens)
- ✅ `/editora` - OK (tem página própria)
- ⏳ `/anais-do-encontro-brasileiro` - PENDENTE
- ✅ Boletim Contexto - EXTERNO (OK)
- ⏳ `/livros-e-cartilhas` - PENDENTE
- ✅ Revista RBTCC - EXTERNO (OK)

### MEGA MENU - Associação
- ✅ `/associe-se` - OK (renomeado de /anuidades)
- ✅ `/socios` - OK (tem página própria)

### MEGA MENU - Afiliação
- ✅ `/afilie-se` - OK (página criada)
- ✅ `/afiliados` - OK (página criada)

### MEGA MENU - Documentos
- ✅ ABPMC-COVID19 - EXTERNO (OK)
- ✅ `/comportamento-em-foco` - OK (tem página própria)
- ✅ `/documentos-da-abpmc` - OK (página criada)

### MEGA MENU - Eventos
- ⚠️ `/categorias/encontros-anuais` - VERIFICAR (rota de categoria)
- ⚠️ `/categorias/eventos` - VERIFICAR (rota de categoria)

### MEGA MENU - História
- ⚠️ `/categorias/artigos-historicos` - VERIFICAR (rota de categoria)
- ✅ `/documentos-historicos` - OK (página criada)
- ⚠️ `/categorias/historias-e-personagens` - VERIFICAR (rota de categoria)

### MEGA MENU - Projetos
- ✅ `/projetos-comunidade` - OK (página criada)
- ✅ `/sustentabilidade` - OK (página criada)

### MEGA MENU - Imprensa
- ✅ `/releases` - OK (página criada)

### OUTROS
- ⚠️ `/categorias/noticias` - VERIFICAR (rota de categoria)
- ✅ `/contato` - OK (tem página própria)

## 📊 ESTATÍSTICAS

- **Total de links**: ~35
- **Links funcionando**: ~20 (57%)
- **Links pendentes (páginas a criar)**: 7 (20%)
- **Links de categoria (verificar)**: 5 (14%)
- **Links externos**: 3 (9%)

## 🔧 AÇÕES NECESSÁRIAS

### 1. CRIAR PÁGINAS FALTANTES (7)
- `/comissao-de-assuntos-profissionais-legais-e-eticos`
- `/comissao-de-comunicacao`
- `/comissao-de-desenvolvimento-atipico`
- `/comissao-de-estudantes`
- `/comissao-de-jornadas-e-eventos-regionais`
- `/anais-do-encontro-brasileiro`
- `/livros-e-cartilhas`

### 2. VERIFICAR ROTAS DE CATEGORIA (5)
Verificar se `/categorias/[slug]` está funcionando:
- `/categorias/encontros-anuais`
- `/categorias/eventos`
- `/categorias/artigos-historicos`
- `/categorias/historias-e-personagens`
- `/categorias/noticias`

### 3. VERIFICAR PÁGINAS NO BANCO DE DADOS
Algumas páginas podem existir no banco e precisar de `/pagina/[slug]`:
- Verificar se comissões existem no banco
- Se sim, usar `/pagina/comissao-*` em vez de `/comissao-*`

## 🎯 RECOMENDAÇÕES

1. **Criar as 7 páginas pendentes** usando o template padrão
2. **Verificar rota de categorias** - testar se `/categorias/[slug]` funciona
3. **Auditoria no banco de dados** - verificar quais páginas existem
4. **Criar redirects** - para URLs antigas que mudaram
5. **Testar todos os links** - clicar em cada item do menu

## 📝 PRÓXIMOS PASSOS

1. ✅ Corrigir "Quem somos" para `/pagina/quem-somos`
2. ⏳ Criar 7 páginas de comissões e editora faltantes
3. ⏳ Verificar rotas de categoria
4. ⏳ Testar todos os links manualmente
5. ⏳ Criar documento final com todos os links validados

---

**Data**: Outubro 2025  
**Status**: Em andamento - 57% dos links funcionando
