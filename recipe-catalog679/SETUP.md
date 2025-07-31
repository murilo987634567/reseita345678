# 🚀 Guia de Configuração - Catálogo de Receitas

## 📋 Pré-requisitos

- **Node.js 18+** - [Download aqui](https://nodejs.org/)
- **npm ou yarn** - Vem com o Node.js
- **VS Code** - [Download aqui](https://code.visualstudio.com/)
- **Conta no Supabase** - [Criar conta](https://supabase.com)

## 🛠️ Configuração Passo a Passo

### 1. Clone ou Baixe o Projeto

\`\`\`bash
# Se você tem o projeto em um repositório Git
git clone <url-do-repositorio>
cd catalogo-receitas

# OU crie uma nova pasta e copie todos os arquivos
mkdir catalogo-receitas
cd catalogo-receitas
\`\`\`

### 2. Instale as Dependências

\`\`\`bash
# Usando npm
npm install

# OU usando yarn
yarn install
\`\`\`

### 3. Configure o Supabase

#### 3.1. Crie um Projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Crie uma nova organização (se necessário)
4. Clique em "New Project"
5. Preencha os dados:
   - **Name**: Catálogo de Receitas
   - **Database Password**: Crie uma senha forte
   - **Region**: Escolha a mais próxima (Brazil East)
6. Clique em "Create new project"

#### 3.2. Execute os Scripts SQL
1. No dashboard do Supabase, vá em **SQL Editor**
2. Execute os scripts na seguinte ordem:

**Script 1 - Criar Tabelas:**
\`\`\`sql
-- Cole o conteúdo do arquivo scripts/01-create-tables.sql
\`\`\`

**Script 2 - Políticas de Segurança:**
\`\`\`sql
-- Cole o conteúdo do arquivo scripts/02-create-policies.sql
\`\`\`

**Script 3 - Funções:**
\`\`\`sql
-- Cole o conteúdo do arquivo scripts/03-create-functions.sql
\`\`\`

**Script 4 - Dados de Exemplo (Opcional):**
\`\`\`sql
-- Cole o conteúdo do arquivo scripts/04-seed-data.sql
\`\`\`

#### 3.3. Obtenha as Credenciais
1. No dashboard do Supabase, vá em **Settings** → **API**
2. Copie:
   - **Project URL**
   - **anon public key**

### 4. Configure as Variáveis de Ambiente

1. Copie o arquivo de exemplo:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

2. Edite o arquivo `.env.local` e adicione suas credenciais:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
\`\`\`

### 5. Execute o Projeto

\`\`\`bash
# Inicie o servidor de desenvolvimento
npm run dev

# OU
yarn dev
\`\`\`

### 6. Acesse a Aplicação

Abra seu navegador e acesse: [http://localhost:3000](http://localhost:3000)

## 🎯 Funcionalidades Disponíveis

### ✅ Modo Demo (Sem Supabase)
Se você não configurar o Supabase, a aplicação funcionará em modo demo com:
- 6 receitas de exemplo
- Todos os filtros funcionais
- Interface completa
- Dados simulados

### ✅ Modo Completo (Com Supabase)
Com o Supabase configurado, você terá:
- Autenticação real
- Cadastro de receitas
- Sistema de favoritos
- Avaliações e comentários
- Dados persistentes

## 🔧 Scripts Disponíveis

\`\`\`bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar versão de produção
npm run start

# Linting
npm run lint
\`\`\`

## 📁 Estrutura do Projeto

\`\`\`
catalogo-receitas/
├── app/                    # Páginas Next.js (App Router)
│   ├── auth/              # Páginas de autenticação
│   ├── recipes/           # Páginas de receitas
│   ├── favorites/         # Página de favoritos
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes React
│   ├── ui/               # Componentes de interface
│   ├── navbar.tsx        # Barra de navegação
│   ├── recipe-card.tsx   # Card de receita
│   └── ...
├── utils/                # Utilitários
│   └── supabase/         # Configuração do Supabase
├── types/                # Tipos TypeScript
├── scripts/              # Scripts SQL
└── lib/                  # Bibliotecas auxiliares
\`\`\`

## 🚨 Solução de Problemas

### Erro: "Module not found"
\`\`\`bash
# Reinstale as dependências
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Erro: "Supabase environment variables"
- Verifique se o arquivo `.env.local` existe
- Confirme se as variáveis estão corretas
- Reinicie o servidor (`npm run dev`)

### Erro: "Database connection"
- Verifique se executou todos os scripts SQL
- Confirme se o projeto Supabase está ativo
- Verifique as credenciais no `.env.local`

### Porta 3000 ocupada
\`\`\`bash
# Use uma porta diferente
npm run dev -- -p 3001
\`\`\`

## 📞 Suporte

Se encontrar problemas:
1. Verifique se seguiu todos os passos
2. Consulte os logs no terminal
3. Verifique o console do navegador (F12)
4. Confirme se todas as dependências foram instaladas

## 🎉 Pronto!

Agora você tem um sistema completo de catálogo de receitas funcionando localmente! 

Explore as funcionalidades:
- ✅ Navegue pelas receitas
- ✅ Use os filtros de busca
- ✅ Veja detalhes das receitas
- ✅ Cadastre-se e faça login
- ✅ Adicione suas próprias receitas
- ✅ Favorite receitas
- ✅ Deixe comentários e avaliações
