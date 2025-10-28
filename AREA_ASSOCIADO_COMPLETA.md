# Área do Associado - Implementação Completa

## 📋 ESTRUTURA ATUAL

```
app/associado/
├── dashboard/          ✅ Existe (página principal)
├── minha-anuidade/     ⚠️  Verificar (renovação e histórico)
├── perfil/             ❌ Criar (editar informações)
├── conteudos/          ❌ Criar (conteúdos exclusivos)
├── downloads/          ❌ Criar (documentos e certificados)
├── bloqueado/          ✅ Existe (página de bloqueio)
└── layout.tsx          ✅ Existe
```

---

## 🎯 PÁGINAS A IMPLEMENTAR

### 1. Dashboard (`/associado/dashboard`) ✅
**Status:** Implementado

**Funcionalidades:**
- ✅ Saudação personalizada
- ✅ Alertas de vencimento
- ✅ Cards de resumo (status, plano, vencimento)
- ✅ Últimas transações
- ✅ Ações rápidas

---

### 2. Minha Anuidade (`/associado/minha-anuidade`)
**Status:** Precisa verificar/completar

**Funcionalidades Necessárias:**
- ✅ Informações do plano atual
- ✅ Data de vencimento
- ✅ Dias restantes
- ✅ Valor da anuidade
- ✅ Histórico completo de pagamentos
- ✅ Botão de renovação
- ✅ Download de comprovantes
- ✅ Status de cada pagamento
- ✅ Próxima cobrança

**Informações a Exibir:**
```typescript
interface AnuidadeInfo {
  planoAtual: {
    nome: string;
    valor: number;
    duracaoDias: number;
    recorrente: boolean;
  };
  vencimento: {
    data: Date;
    diasRestantes: number;
    status: "ativo" | "vencendo" | "vencido";
  };
  historico: Transacao[];
  proximaCobranca: {
    data: Date;
    valor: number;
    automatica: boolean;
  };
}
```

---

### 3. Meu Perfil (`/associado/perfil`) ❌
**Status:** Criar

**Funcionalidades:**
- ✅ Visualizar dados pessoais
- ✅ Editar informações
  - Nome
  - Email
  - Telefone
  - CPF (somente leitura)
  - Endereço completo
  - Currículo Lattes
- ✅ Alterar senha
- ✅ Foto de perfil (upload)
- ✅ Preferências de notificação
- ✅ Visibilidade no site (sim/não)

**Campos Editáveis:**
```typescript
interface PerfilAssociado {
  // Dados Pessoais
  nome: string;
  email: string;
  telefone: string;
  cpf: string; // readonly
  
  // Endereço
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  
  // Profissional
  curriculoLattes: string;
  visivelNoSite: boolean;
  
  // Segurança
  senha: string; // form separado
  
  // Preferências
  receberEmails: boolean;
  receberNotificacoes: boolean;
}
```

---

### 4. Conteúdos Exclusivos (`/associado/conteudos`) ❌
**Status:** Criar

**Funcionalidades:**
- ✅ Listar conteúdos restritos
- ✅ Filtrar por categoria
  - Artigos
  - Vídeos
  - Webinars
  - Materiais de Eventos
- ✅ Buscar conteúdo
- ✅ Ver detalhes do conteúdo
- ✅ Download de materiais
- ✅ Marcar como favorito
- ✅ Histórico de visualizações

**Categorias de Conteúdo:**
- 📄 Artigos Científicos
- 🎥 Vídeos e Webinars
- 📊 Apresentações de Eventos
- 📚 Materiais Didáticos
- 🎓 Cursos e Workshops
- 📋 Atas e Documentos

---

### 5. Downloads (`/associado/downloads`) ❌
**Status:** Criar

**Funcionalidades:**
- ✅ Listar documentos disponíveis
- ✅ Categorias:
  - Certificados
  - Comprovantes de Pagamento
  - Documentos da Associação
  - Materiais de Eventos
- ✅ Download direto
- ✅ Histórico de downloads
- ✅ Buscar documentos

**Tipos de Documentos:**
```typescript
interface Documento {
  id: number;
  titulo: string;
  descricao: string;
  categoria: "certificado" | "comprovante" | "documento" | "material";
  arquivo: string; // URL
  tamanho: number; // bytes
  formato: string; // PDF, DOC, etc
  dataUpload: Date;
  downloads: number;
}
```

---

### 6. Alterar Senha (`/associado/alterar-senha`) ❌
**Status:** Criar

**Funcionalidades:**
- ✅ Formulário de alteração
- ✅ Validação de senha atual
- ✅ Requisitos de senha:
  - Mínimo 8 caracteres
  - Letra maiúscula
  - Letra minúscula
  - Número
  - Caractere especial
- ✅ Confirmação de nova senha
- ✅ Indicador de força da senha
- ✅ Email de confirmação

---

## 🔄 FLUXOS PRINCIPAIS

### Fluxo 1: Renovar Anuidade
```
1. Associado acessa /associado/minha-anuidade
2. Vê informações do plano e vencimento
3. Clica em "Renovar Anuidade"
4. Escolhe método de pagamento:
   - Mercado Pago (cartão/PIX)
   - Boleto
   - Transferência bancária
5. Confirma pagamento
6. Recebe comprovante por email
7. Status atualizado automaticamente
```

### Fluxo 2: Editar Perfil
```
1. Associado acessa /associado/perfil
2. Clica em "Editar Informações"
3. Atualiza dados (telefone, endereço, etc.)
4. Salva alterações
5. Recebe confirmação
6. Dados atualizados no sistema
```

### Fluxo 3: Acessar Conteúdo Exclusivo
```
1. Associado acessa /associado/conteudos
2. Navega pelas categorias
3. Clica em conteúdo de interesse
4. Visualiza/baixa material
5. Conteúdo marcado como visualizado
6. Pode favoritar para acesso rápido
```

### Fluxo 4: Baixar Certificado
```
1. Associado acessa /associado/downloads
2. Filtra por "Certificados"
3. Encontra certificado desejado
4. Clica em "Download"
5. PDF é baixado
6. Download registrado no histórico
```

### Fluxo 5: Alterar Senha
```
1. Associado acessa /associado/perfil
2. Clica em "Alterar Senha"
3. Informa senha atual
4. Informa nova senha (2x)
5. Valida requisitos
6. Confirma alteração
7. Recebe email de confirmação
8. Nova senha ativa imediatamente
```

---

## 📊 APIs NECESSÁRIAS

### Perfil
```typescript
GET    /api/associado/perfil           // Dados do perfil
PUT    /api/associado/perfil           // Atualizar perfil
POST   /api/associado/perfil/foto      // Upload foto
PUT    /api/associado/alterar-senha    // Alterar senha
```

### Anuidade
```typescript
GET    /api/associado/anuidade         // Info da anuidade
GET    /api/associado/transacoes       // Histórico
POST   /api/associado/renovar          // Iniciar renovação
GET    /api/associado/comprovante/[id] // Download comprovante
```

### Conteúdos
```typescript
GET    /api/associado/conteudos        // Listar conteúdos
GET    /api/associado/conteudos/[id]   // Detalhes
POST   /api/associado/favoritos        // Adicionar favorito
GET    /api/associado/favoritos        // Listar favoritos
```

### Downloads
```typescript
GET    /api/associado/documentos       // Listar documentos
GET    /api/associado/documentos/[id]  // Download
GET    /api/associado/certificados     // Listar certificados
```

---

## 🎨 COMPONENTES NECESSÁRIOS

### 1. ProfileForm
```typescript
interface ProfileFormProps {
  initialData: PerfilAssociado;
  onSubmit: (data: PerfilAssociado) => Promise<void>;
  loading?: boolean;
}
```

### 2. PasswordChangeForm
```typescript
interface PasswordChangeFormProps {
  onSubmit: (data: { senhaAtual: string; novaSenha: string }) => Promise<void>;
  loading?: boolean;
}
```

### 3. PaymentCard
```typescript
interface PaymentCardProps {
  transacao: Transacao;
  onDownloadComprovante?: () => void;
}
```

### 4. ContentCard
```typescript
interface ContentCardProps {
  conteudo: ConteudoRestrito;
  onView?: () => void;
  onFavorite?: () => void;
  isFavorited?: boolean;
}
```

### 5. DocumentCard
```typescript
interface DocumentCardProps {
  documento: Documento;
  onDownload: () => void;
}
```

### 6. RenewalButton
```typescript
interface RenewalButtonProps {
  plano: Plano;
  vencimento: Date;
  onRenew: () => void;
}
```

---

## 💳 INTEGRAÇÃO DE PAGAMENTO

### Mercado Pago
```typescript
// Fluxo de renovação
1. Criar preferência de pagamento
2. Redirecionar para checkout
3. Webhook recebe confirmação
4. Atualizar status do associado
5. Enviar email de confirmação
6. Gerar comprovante
```

### Configuração Necessária
```typescript
interface MercadoPagoConfig {
  accessToken: string;
  publicKey: string;
  webhookUrl: string;
  successUrl: string;
  failureUrl: string;
  pendingUrl: string;
}
```

---

## 📧 NOTIFICAÇÕES POR EMAIL

### Emails Automáticos
1. **Boas-vindas** - Ao criar conta
2. **Pagamento Aprovado** - Confirmação de pagamento
3. **Anuidade Vencendo** - 30, 15 e 7 dias antes
4. **Anuidade Vencida** - No dia do vencimento
5. **Renovação Concluída** - Após renovar
6. **Alteração de Senha** - Confirmação de segurança
7. **Atualização de Perfil** - Confirmação de alterações

---

## 🔐 SEGURANÇA

### Validações
- ✅ Autenticação obrigatória
- ✅ Verificação de sessão
- ✅ CSRF protection
- ✅ Rate limiting
- ✅ Validação de inputs
- ✅ Sanitização de dados

### Permissões
- ✅ Associado só acessa próprios dados
- ✅ Não pode alterar CPF
- ✅ Não pode alterar role
- ✅ Não pode alterar status
- ✅ Pode alterar dados pessoais
- ✅ Pode alterar senha

---

## 📱 RESPONSIVIDADE

### Breakpoints
- Mobile: 375px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

### Adaptações Mobile
- Menu hamburger
- Cards empilhados
- Tabelas com scroll horizontal
- Botões full-width
- Formulários simplificados

---

## 🚀 PRIORIDADE DE IMPLEMENTAÇÃO

### Fase 1 (Crítico) - 4-6 horas
1. ✅ Página Meu Perfil
2. ✅ Editar informações pessoais
3. ✅ Alterar senha
4. ✅ API de perfil

### Fase 2 (Importante) - 3-4 horas
5. ✅ Página Minha Anuidade (completar)
6. ✅ Histórico de pagamentos
7. ✅ Download de comprovantes
8. ✅ Botão de renovação

### Fase 3 (Desejável) - 4-5 horas
9. ✅ Página Conteúdos Exclusivos
10. ✅ Página Downloads
11. ✅ Sistema de favoritos
12. ✅ Histórico de visualizações

### Fase 4 (Opcional) - 2-3 horas
13. ✅ Upload de foto de perfil
14. ✅ Preferências de notificação
15. ✅ Dashboard personalizado

---

## 📝 CHECKLIST DE IMPLEMENTAÇÃO

### Páginas
- [ ] Meu Perfil (/associado/perfil)
- [ ] Editar Perfil (/associado/perfil/editar)
- [ ] Alterar Senha (/associado/alterar-senha)
- [ ] Minha Anuidade (completar)
- [ ] Conteúdos Exclusivos (/associado/conteudos)
- [ ] Downloads (/associado/downloads)

### APIs
- [ ] GET /api/associado/perfil
- [ ] PUT /api/associado/perfil
- [ ] PUT /api/associado/alterar-senha
- [ ] GET /api/associado/anuidade
- [ ] GET /api/associado/transacoes
- [ ] POST /api/associado/renovar
- [ ] GET /api/associado/conteudos
- [ ] GET /api/associado/documentos

### Componentes
- [ ] ProfileForm
- [ ] PasswordChangeForm
- [ ] PaymentCard
- [ ] ContentCard
- [ ] DocumentCard
- [ ] RenewalButton
- [ ] UploadPhoto

### Funcionalidades
- [ ] Editar dados pessoais
- [ ] Alterar senha com validação
- [ ] Ver histórico de pagamentos
- [ ] Download de comprovantes
- [ ] Renovar anuidade
- [ ] Acessar conteúdos exclusivos
- [ ] Baixar documentos
- [ ] Sistema de favoritos

### Integrações
- [ ] Mercado Pago (renovação)
- [ ] Email (notificações)
- [ ] Upload de arquivos (foto)
- [ ] Geração de PDF (comprovantes)

---

## 🎯 RESULTADO ESPERADO

### Para o Associado
- ✅ Área completa e funcional
- ✅ Fácil navegação
- ✅ Informações claras
- ✅ Renovação simples
- ✅ Acesso a conteúdos
- ✅ Controle total dos dados

### Para a ABPMC
- ✅ Gestão automatizada
- ✅ Menos trabalho manual
- ✅ Dados organizados
- ✅ Comunicação eficiente
- ✅ Satisfação do associado
- ✅ Retenção aumentada

---

**Status:** Planejamento completo  
**Tempo estimado:** 15-20 horas  
**Data:** 28/10/2025  
**Próximo:** Implementação das páginas e APIs
