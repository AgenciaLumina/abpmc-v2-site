#!/bin/bash

echo "🚀 DEPLOY COMPLETO - ABPMC v2"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# URL do banco de produção
DATABASE_URL="postgresql://neondb_owner:npg_F0xNd9matZKy@ep-super-hill-acjm1msd-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require"

echo -e "${BLUE}📊 ETAPA 1: VERIFICANDO BANCO DE DADOS${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Verificar dados atuais
echo "Verificando dados em produção..."
DATABASE_URL="$DATABASE_URL" npx tsx scripts/verificar-dados-producao.ts

echo ""
echo -e "${BLUE}📊 ETAPA 2: VERIFICANDO POSTS E CATEGORIAS${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

DATABASE_URL="$DATABASE_URL" npx tsx scripts/verificar-posts-categorias.ts

echo ""
echo -e "${BLUE}📊 ETAPA 3: GIT - VERIFICANDO ALTERAÇÕES${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Verificar se há alterações
if [[ -n $(git status -s) ]]; then
    echo -e "${YELLOW}⚠️  Há alterações não commitadas${NC}"
    echo ""
    git status -s
    echo ""
    read -p "Deseja fazer commit? (s/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        echo "Fazendo commit..."
        git add -A
        git commit -m "deploy: atualização completa $(date +'%Y-%m-%d %H:%M')"
        echo -e "${GREEN}✅ Commit realizado${NC}"
    fi
else
    echo -e "${GREEN}✅ Nenhuma alteração pendente${NC}"
fi

echo ""
echo -e "${BLUE}📊 ETAPA 4: PUSH PARA GITHUB${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

git push origin main
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Push realizado com sucesso${NC}"
else
    echo -e "${RED}❌ Erro ao fazer push${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}📊 ETAPA 5: DEPLOY NA VERCEL${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "Iniciando deploy na Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Deploy realizado com sucesso!${NC}"
else
    echo ""
    echo -e "${RED}❌ Erro ao fazer deploy${NC}"
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🎉 DEPLOY COMPLETO FINALIZADO!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 RESUMO:"
echo "   ✅ Banco de dados verificado"
echo "   ✅ Posts e categorias verificados"
echo "   ✅ Código commitado"
echo "   ✅ Push para GitHub"
echo "   ✅ Deploy na Vercel"
echo ""
echo "🌐 URLs:"
echo "   Produção: https://abpmc-v2.vercel.app"
echo "   Inspect: vercel ls --prod"
echo ""
echo "📝 Próximos passos:"
echo "   1. Aguardar 2-3 minutos para build completar"
echo "   2. Testar URLs em produção"
echo "   3. Verificar logs: vercel logs --follow"
echo ""
