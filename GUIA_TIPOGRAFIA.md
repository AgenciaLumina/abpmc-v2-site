# 📝 Guia de Tipografia - ABPMC V2

## 🎨 Sistema de Tipografia Padronizado

### Fonte Principal
**Font Family:** `font-outfit` (Outfit - Google Fonts)

---

## 📏 HIERARQUIA DE TÍTULOS

### H1 - Título Principal de Página
```tsx
className="text-4xl md:text-5xl font-bold text-[#0B2E47]"
```
- **Tamanho Mobile:** 36px (text-4xl)
- **Tamanho Desktop:** 48px (text-5xl)
- **Peso:** Bold (700)
- **Cor:** #0B2E47 (azul escuro)
- **Uso:** Títulos principais de páginas, hero sections

**Exemplo:**
```tsx
<h1 className="text-4xl md:text-5xl font-bold text-[#0B2E47]">
  Bem-vindo à ABPMC
</h1>
```

---

### H2 - Título de Seção
```tsx
className="text-3xl md:text-4xl font-semibold text-[#0B2E47]"
```
- **Tamanho Mobile:** 30px (text-3xl)
- **Tamanho Desktop:** 36px (text-4xl)
- **Peso:** Semibold (600)
- **Cor:** #0B2E47
- **Uso:** Títulos de seções principais

**Exemplo:**
```tsx
<h2 className="text-3xl md:text-4xl font-semibold text-[#0B2E47] mb-6">
  Nossos Serviços
</h2>
```

---

### H3 - Subtítulo de Seção
```tsx
className="text-2xl md:text-3xl font-semibold text-[#0B2E47]"
```
- **Tamanho Mobile:** 24px (text-2xl)
- **Tamanho Desktop:** 30px (text-3xl)
- **Peso:** Semibold (600)
- **Cor:** #0B2E47
- **Uso:** Subtítulos de seções, cards principais

**Exemplo:**
```tsx
<h3 className="text-2xl md:text-3xl font-semibold text-[#0B2E47]">
  Categoria de Associação
</h3>
```

---

### H4 - Título de Card/Componente
```tsx
className="text-xl md:text-2xl font-semibold text-[#0B2E47]"
```
- **Tamanho Mobile:** 20px (text-xl)
- **Tamanho Desktop:** 24px (text-2xl)
- **Peso:** Semibold (600)
- **Cor:** #0B2E47
- **Uso:** Títulos de cards, componentes menores

**Exemplo:**
```tsx
<h4 className="text-xl md:text-2xl font-semibold text-[#0B2E47]">
  Dados Pessoais
</h4>
```

---

### H5 - Título Pequeno
```tsx
className="text-lg md:text-xl font-semibold text-[#0B2E47]"
```
- **Tamanho Mobile:** 18px (text-lg)
- **Tamanho Desktop:** 20px (text-xl)
- **Peso:** Semibold (600)
- **Cor:** #0B2E47
- **Uso:** Títulos de listas, itens menores

---

### H6 - Título Mínimo
```tsx
className="text-base md:text-lg font-semibold text-[#0B2E47]"
```
- **Tamanho Mobile:** 16px (text-base)
- **Tamanho Desktop:** 18px (text-lg)
- **Peso:** Semibold (600)
- **Cor:** #0B2E47
- **Uso:** Títulos muito pequenos, labels destacados

---

## 📄 TEXTO CORPO

### Parágrafo Grande (Lead)
```tsx
className="text-lg md:text-xl text-gray-700 leading-relaxed"
```
- **Tamanho Mobile:** 18px (text-lg)
- **Tamanho Desktop:** 20px (text-xl)
- **Peso:** Regular (400)
- **Cor:** #374151 (gray-700)
- **Line Height:** relaxed (1.625)
- **Uso:** Introduções, destaques

---

### Parágrafo Normal
```tsx
className="text-base md:text-lg text-gray-700 leading-relaxed"
```
- **Tamanho Mobile:** 16px (text-base)
- **Tamanho Desktop:** 18px (text-lg)
- **Peso:** Regular (400)
- **Cor:** #374151 (gray-700)
- **Line Height:** relaxed (1.625)
- **Uso:** Texto principal, conteúdo geral

---

### Parágrafo Pequeno
```tsx
className="text-sm md:text-base text-gray-600"
```
- **Tamanho Mobile:** 14px (text-sm)
- **Tamanho Desktop:** 16px (text-base)
- **Peso:** Regular (400)
- **Cor:** #4B5563 (gray-600)
- **Uso:** Descrições secundárias, legendas

---

### Texto Muito Pequeno
```tsx
className="text-xs md:text-sm text-gray-500"
```
- **Tamanho Mobile:** 12px (text-xs)
- **Tamanho Desktop:** 14px (text-sm)
- **Peso:** Regular (400)
- **Cor:** #6B7280 (gray-500)
- **Uso:** Notas de rodapé, metadados, timestamps

---

## 🎯 COMPONENTES ESPECÍFICOS

### Labels de Formulário
```tsx
className="block text-sm font-medium text-gray-700 mb-2"
```
- **Tamanho:** 14px (text-sm)
- **Peso:** Medium (500)
- **Cor:** #374151 (gray-700)

---

### Botões
```tsx
// Botão Grande
className="text-base md:text-lg font-semibold"

// Botão Normal
className="text-sm md:text-base font-medium"

// Botão Pequeno
className="text-xs md:text-sm font-medium"
```

---

### Links
```tsx
// Link Normal
className="text-base text-[#22949e] hover:text-[#1d7a82] underline"

// Link Pequeno
className="text-sm text-[#22949e] hover:text-[#1d7a82]"
```

---

### Badges/Tags
```tsx
className="text-xs md:text-sm font-medium px-2 py-1 rounded-full"
```

---

### Breadcrumbs
```tsx
className="text-sm text-gray-600"
```

---

### Mensagens de Erro
```tsx
className="text-sm text-red-600"
```

---

### Mensagens de Sucesso
```tsx
className="text-sm text-green-600"
```

---

## 🎨 CORES DE TEXTO

### Cores Principais
- **Primária (Títulos):** `text-[#0B2E47]` - Azul escuro
- **Secundária (Links):** `text-[#22949e]` - Turquesa
- **Texto Corpo:** `text-gray-700` - Cinza escuro
- **Texto Secundário:** `text-gray-600` - Cinza médio
- **Texto Terciário:** `text-gray-500` - Cinza claro

### Cores de Estado
- **Sucesso:** `text-green-600`
- **Erro:** `text-red-600`
- **Aviso:** `text-yellow-600`
- **Info:** `text-blue-600`

### Cores Especiais
- **Branco:** `text-white` - Sobre fundos escuros
- **Destaque:** `text-[#01C2CE]` - Turquesa claro

---

## 📐 LINE HEIGHT (Altura de Linha)

### Títulos
```tsx
className="leading-tight"  // 1.25
```

### Texto Normal
```tsx
className="leading-relaxed"  // 1.625
```

### Texto Longo
```tsx
className="leading-loose"  // 2
```

---

## 🔤 FONT WEIGHT (Peso da Fonte)

- **Light:** `font-light` (300) - Raramente usado
- **Regular:** `font-normal` (400) - Texto corpo
- **Medium:** `font-medium` (500) - Labels, botões pequenos
- **Semibold:** `font-semibold` (600) - Títulos, botões
- **Bold:** `font-bold` (700) - Títulos principais

---

## 📱 RESPONSIVIDADE

### Padrão Mobile-First
Sempre definir tamanho mobile primeiro, depois desktop:

```tsx
// ✅ CORRETO
className="text-base md:text-lg"

// ❌ ERRADO
className="text-lg md:text-base"
```

### Breakpoints
- **Mobile:** < 768px (sem prefixo)
- **Tablet:** ≥ 768px (md:)
- **Desktop:** ≥ 1024px (lg:)
- **Desktop Grande:** ≥ 1280px (xl:)

---

## 🎯 EXEMPLOS PRÁTICOS

### Hero Section
```tsx
<section className="py-20 px-6">
  <h1 className="text-4xl md:text-5xl font-bold text-[#0B2E47] mb-4">
    Título Principal
  </h1>
  <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
    Descrição introdutória com texto maior para destacar.
  </p>
</section>
```

---

### Card de Conteúdo
```tsx
<div className="bg-white rounded-lg p-6">
  <h3 className="text-2xl md:text-3xl font-semibold text-[#0B2E47] mb-3">
    Título do Card
  </h3>
  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
    Conteúdo principal do card com informações relevantes.
  </p>
  <span className="text-sm text-gray-600">
    Informação secundária ou metadata
  </span>
</div>
```

---

### Formulário
```tsx
<form>
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Nome Completo
    </label>
    <input
      type="text"
      className="w-full px-4 py-3 text-base border rounded-lg"
      placeholder="Digite seu nome"
    />
    <p className="text-xs text-gray-500 mt-1">
      Seu nome como aparece no documento
    </p>
  </div>
</form>
```

---

### Tabela Admin
```tsx
<table>
  <thead>
    <tr>
      <th className="text-xs font-medium text-gray-500 uppercase">
        Coluna
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="text-sm text-gray-900">
        Conteúdo
      </td>
    </tr>
  </tbody>
</table>
```

---

## ✅ CHECKLIST DE PADRONIZAÇÃO

Ao criar ou revisar componentes, verificar:

- [ ] Títulos usam a hierarquia correta (H1-H6)
- [ ] Tamanhos são responsivos (mobile → desktop)
- [ ] Cores seguem a paleta definida
- [ ] Line height apropriado para o tipo de texto
- [ ] Font weight correto para o contexto
- [ ] Contraste adequado (acessibilidade)
- [ ] Consistência com outros componentes similares

---

## 🚫 O QUE EVITAR

❌ Tamanhos de fonte fixos (sem responsividade)
❌ Cores de texto personalizadas fora da paleta
❌ Misturar diferentes escalas de tamanho
❌ Usar bold demais (poluição visual)
❌ Line height muito apertado em textos longos
❌ Tamanhos muito pequenos (< 12px)
❌ Contraste insuficiente (texto claro em fundo claro)

---

## 📚 REFERÊNCIAS RÁPIDAS

### Escala de Tamanhos Tailwind
- `text-xs`: 12px
- `text-sm`: 14px
- `text-base`: 16px
- `text-lg`: 18px
- `text-xl`: 20px
- `text-2xl`: 24px
- `text-3xl`: 30px
- `text-4xl`: 36px
- `text-5xl`: 48px

### Classes Úteis
- `truncate`: Corta texto com ...
- `line-clamp-2`: Limita a 2 linhas
- `uppercase`: MAIÚSCULAS
- `capitalize`: Primeira Letra Maiúscula
- `italic`: Itálico

---

**Última Atualização:** 28/10/2025  
**Versão:** 1.0.0  
**Status:** ✅ Padronizado
