# Guia do Componente ActionButton

## 📋 Descrição

Componente padronizado para todos os botões de ação do site, incluindo:
- Botões "Clique aqui para ler mais"
- Botões de download
- Botões "Ver mais"
- Links externos

## 🎨 Design Padrão

- **Cor de fundo**: `#0066FF` (azul vibrante)
- **Hover**: `#0052CC` (azul mais escuro)
- **Texto**: Branco
- **Bordas**: Arredondadas (`rounded-lg`)
- **Sombra**: `shadow-md` com hover `shadow-lg`
- **Animação**: Elevação suave no hover (`-translate-y-0.5`)
- **Padding**: `px-6 py-3`
- **Ícones**: SVG inline com 5x5 (w-5 h-5)

## 📦 Importação

```tsx
import ActionButton from '@/components/ui/ActionButton'
```

## 🔧 Uso Básico

### 1. Botão "Clique aqui para ler mais" (padrão)

```tsx
<ActionButton href="/pagina/detalhes" />
```

### 2. Botão de Download

```tsx
<ActionButton 
  href="/documentos/arquivo.pdf" 
  variant="download"
  icon="download"
  text="Baixar PDF"
  external
/>
```

### 3. Botão Ver Mais Customizado

```tsx
<ActionButton 
  href="/artigos/123" 
  variant="view-more"
  text="Ler artigo completo"
  icon="eye"
/>
```

### 4. Link Externo

```tsx
<ActionButton 
  href="https://exemplo.com" 
  text="Visitar site externo"
  external
/>
```

## 🎯 Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `href` | `string` | **obrigatório** | URL de destino |
| `text` | `string` | varia por variant | Texto do botão |
| `variant` | `'primary' \| 'download' \| 'view-more'` | `'primary'` | Estilo do botão |
| `icon` | `'download' \| 'arrow' \| 'eye'` | `'arrow'` | Ícone exibido |
| `external` | `boolean` | `false` | Se true, abre em nova aba |

## 🎨 Variantes

### Primary (padrão)
- Texto padrão: "Clique aqui para ler mais"
- Ícone padrão: seta para direita
- Uso: Links internos gerais

### Download
- Texto padrão: "Baixar documento"
- Ícone recomendado: download
- Uso: Downloads de PDFs, documentos

### View More
- Texto padrão: "Clique aqui para ler mais"
- Ícone recomendado: eye ou arrow
- Uso: Expandir conteúdo, ver detalhes

## 🎭 Ícones Disponíveis

### Arrow (→)
Seta para direita - navegação padrão

### Download (⬇)
Ícone de download com documento

### Eye (👁)
Ícone de visualização

## 💡 Exemplos de Uso Real

### Lista de Documentos

```tsx
<div className="space-y-4">
  <div className="flex justify-between items-center p-4 bg-white rounded-lg">
    <span>Banner em homenagem aos 18 anos da ABPMC</span>
    <ActionButton 
      href="/documentos/banner-18-anos.pdf" 
      variant="download"
      icon="download"
      text="Baixar"
      external
    />
  </div>
  
  <div className="flex justify-between items-center p-4 bg-white rounded-lg">
    <span>Homenagem feita pelos monitores do VI Encontro</span>
    <ActionButton 
      href="/pagina/homenagem-vi-encontro" 
      text="Clique aqui para ler mais"
    />
  </div>
</div>
```

### Cards de Artigos

```tsx
<div className="bg-white p-6 rounded-xl shadow-md">
  <h3 className="text-xl font-bold mb-2">Título do Artigo</h3>
  <p className="text-gray-600 mb-4">Resumo do artigo...</p>
  <ActionButton 
    href="/artigos/123" 
    variant="view-more"
    icon="arrow"
  />
</div>
```

### Seção de Downloads

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <ActionButton 
    href="/downloads/estatuto.pdf" 
    variant="download"
    text="Estatuto da ABPMC"
    external
  />
  <ActionButton 
    href="/downloads/regimento.pdf" 
    variant="download"
    text="Regimento Interno"
    external
  />
</div>
```

## 🔄 Migração de Código Existente

### Antes (inconsistente):

```tsx
// Variação 1
<a href="/link" className="bg-blue-500 text-white px-4 py-2 rounded">
  Ver mais
</a>

// Variação 2
<button className="bg-[#0066FF] px-6 py-3 rounded-lg text-white">
  Clique aqui para ler mais
</button>

// Variação 3
<Link href="/download.pdf" className="text-blue-600 underline">
  Baixar documento
</Link>
```

### Depois (padronizado):

```tsx
<ActionButton href="/link" text="Ver mais" />

<ActionButton href="/pagina" />

<ActionButton 
  href="/download.pdf" 
  variant="download"
  external
/>
```

## ✅ Benefícios

1. **Consistência Visual**: Todos os botões de ação seguem o mesmo padrão
2. **Manutenção Fácil**: Alterações de estilo em um único lugar
3. **Acessibilidade**: Estrutura semântica correta (Link vs a tag)
4. **Performance**: Next.js Link para navegação otimizada
5. **Reutilização**: Menos código duplicado

## 🎯 Onde Usar

- ✅ Páginas de documentos históricos
- ✅ Listas de artigos e publicações
- ✅ Downloads de PDFs e arquivos
- ✅ Links "Saiba mais" / "Leia mais"
- ✅ Botões de navegação em cards
- ✅ Links para páginas de detalhes
- ✅ Seções de eventos e notícias

## 🚫 Onde NÃO Usar

- ❌ Botões de formulário (submit, reset)
- ❌ Botões de ação (deletar, editar, salvar)
- ❌ Navegação principal (menu, header)
- ❌ Botões de modal (fechar, cancelar)

Para esses casos, use componentes específicos ou botões HTML nativos.

## 🎨 Customização Avançada

Se precisar de uma cor diferente para um caso específico:

```tsx
<ActionButton 
  href="/especial" 
  text="Ação Especial"
  className="!bg-green-600 hover:!bg-green-700"
/>
```

Nota: Use `!` para sobrescrever as classes padrão do Tailwind.

## 📱 Responsividade

O componente é totalmente responsivo:
- Mobile: Mantém padding adequado
- Tablet/Desktop: Efeitos hover funcionam perfeitamente
- Touch devices: Área de toque adequada (min 44x44px)

## ♿ Acessibilidade

- ✅ Contraste adequado (WCAG AA)
- ✅ Área de clique suficiente
- ✅ Estados hover/focus visíveis
- ✅ Semântica correta (Link/a tag)
- ✅ Suporte a navegação por teclado

---

**Criado em**: Outubro 2025  
**Versão**: 1.0  
**Manutenção**: Agência Lumina
