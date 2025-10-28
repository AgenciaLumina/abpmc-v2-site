#!/bin/bash

# Script para gerar estrutura completa do admin dashboard

echo "🚀 Gerando estrutura completa do Admin Dashboard..."

# Criar diretórios de APIs
mkdir -p app/api/admin/posts
mkdir -p app/api/admin/pages
mkdir -p app/api/admin/associados
mkdir -p app/api/admin/transacoes
mkdir -p app/api/admin/categorias
mkdir -p app/api/admin/documentos
mkdir -p app/api/admin/planos
mkdir -p app/api/admin/configuracoes

# Criar diretórios de componentes admin
mkdir -p components/admin
mkdir -p components/admin/forms
mkdir -p components/admin/tables
mkdir -p components/admin/modals

# Criar diretórios de uploads
mkdir -p public/uploads/posts
mkdir -p public/uploads/pages
mkdir -p public/uploads/documentos

echo "✅ Estrutura de diretórios criada!"
echo ""
echo "📋 Estrutura criada:"
echo "   - APIs: app/api/admin/*"
echo "   - Componentes: components/admin/*"
echo "   - Uploads: public/uploads/*"
echo ""
echo "📝 Próximos passos:"
echo "   1. Implementar APIs REST"
echo "   2. Criar componentes reutilizáveis"
echo "   3. Implementar páginas do admin"
echo "   4. Adicionar validações"
echo "   5. Testar funcionalidades"
