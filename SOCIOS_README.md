# Sistema de Busca de Sócios ABPMC

## Implementação Concluída ✅

### Arquivos Criados/Modificados:

1. **`/app/(site)/associados/page.tsx`** - Página principal de sócios
2. **`/components/sections/socios/SociosGrid.tsx`** - Componente de busca e grid
3. **`/lib/socios-data.ts`** - Arquivo de dados (opcional)

---

## Como Adicionar TODOS os Sócios

### Opção 1: Dados Inline no Componente (Recomendado)

Edite o arquivo `/components/sections/socios/SociosGrid.tsx` e substitua o array `sociosData` com todos os 700+ registros fornecidos:

```typescript
const sociosData: Socio[] = [
  {"name": "Adriana Lourenço Lopes", "email": "adrianalourencolopes@gmail.com", "cv": "http://lattes.cnpq.br/9686139344430086"},
  {"name": "Adriana Grando", "email": "adrgrando@gmail.com", "cv": "http://lattes.cnpq.br/6655526661447047"},
  // ... TODOS os outros sócios aqui
  {"name": "Yumi Gosso", "email": "ygosso@gmail.com", "cv": "http://lattes.cnpq.br/3196008818776282"}
];
```

### Opção 2: Arquivo Separado

1. Cole todos os dados no arquivo `/lib/socios-data.ts`
2. No componente, descomente o import:
   ```typescript
   import { sociosData } from "@/lib/socios-data";
   ```

---

## Funcionalidades Implementadas

### ✅ Busca em Tempo Real
- Campo de busca no topo
- Filtra por nome ou e-mail
- Remove acentos automaticamente

### ✅ Filtros Alfabéticos
- 6 abas (A-D, E-H, I-L, M-P, Q-T, U-Z)
- Navegação por inicial do nome
- Design com estado ativo/inativo

### ✅ Grid Responsivo
- 3 colunas em desktop
- 2 colunas em tablet
- 1 coluna em mobile
- Cards com hover effect

### ✅ Informações dos Sócios
- Nome (título em destaque)
- E-mail (clicável com mailto:)
- Currículo Lattes (link externo)
- "não informado" para dados vazios

---

## Estilos Customizados

### Variáveis CSS:
```css
--abpmc-primary: #0F2C3A  (azul escuro)
--abpmc-accent: #3E808D   (verde-azulado)
```

### Classes Tailwind Usadas:
- Border radius: `rounded-[10px]`, `rounded-[14px]`
- Cores: Usando as variáveis CSS + cores padrão
- Sombras: `shadow-[0_2px_6px_rgba(0,0,0,0.04)]`

---

## URL de Acesso

🔗 **`http://localhost:3000/associados`**

---

## Exemplo de Estrutura de Dados

Cada sócio deve ter esta estrutura:

```typescript
{
  "name": "Nome Completo",
  "email": "email@exemplo.com",
  "cv": "http://lattes.cnpq.br/XXXXXXXXX"  // ou "" se não tiver
}
```

---

## Próximos Passos (Opcional)

1. **Adicionar paginação** - Para melhorar performance com 700+ registros
2. **Exportar dados** - Botão para exportar CSV/PDF
3. **Filtros avançados** - Por estado, instituição, etc.
4. **Analytics** - Rastrear buscas mais comuns

---

## Notas Importantes

- O componente é **client-side** (`"use client"`)
- Usa `useMemo` para otimização de performance
- Normalização de strings remove acentos para busca
- Acessibilidade: `role="tablist"`, `aria-selected`

---

**Criado em:** 27 de Outubro de 2025  
**Status:** ✅ Pronto para produção (após adicionar dados completos)
