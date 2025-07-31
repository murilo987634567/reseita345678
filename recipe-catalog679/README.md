# 🍳 Catálogo de Receitas

Um sistema completo de catálogo de receitas desenvolvido com Next.js, TypeScript e Supabase. Permite aos usuários descobrir, compartilhar e favoritar receitas culinárias.

## ✨ Funcionalidades

### 🔐 Autenticação
- Cadastro e login de usuários
- Autenticação segura com Supabase Auth
- Gerenciamento de sessões

### 📝 Gestão de Receitas
- **Cadastro de receitas** com informações completas:
  - Título e descrição
  - Imagem da receita
  - Tempo de preparo e cozimento
  - Número de porções
  - Nível de dificuldade
  - Tipo (doce, salgado, fitness)
  - Lista de ingredientes com quantidades
  - Modo de preparo detalhado

### 🔍 Descoberta e Filtros
- **Filtros avançados** por:
  - Tipo de receita (doce, salgado, fitness)
  - Nível de dificuldade (fácil, médio, difícil)
  - Busca por texto no título e descrição
- Layout responsivo com cards informativos
- Visualização de tempo, porções e avaliações

### ❤️ Sistema de Favoritos
- Favoritar/desfavoritar receitas
- Página dedicada para receitas favoritas
- Sincronização em tempo real

### ⭐ Avaliações e Comentários
- Sistema de avaliação com estrelas (1-5)
- Comentários nas receitas
- Cálculo automático da média de avaliações
- Contagem total de avaliações

### 📱 Design Responsivo
- Interface moderna e intuitiva
- Totalmente responsivo para mobile, tablet e desktop
- Componentes reutilizáveis com shadcn/ui
- Tema consistente com Tailwind CSS

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **shadcn/ui** - Componentes de interface
- **Lucide React** - Ícones

### Backend
- **Supabase** - Backend as a Service
  - PostgreSQL Database
  - Authentication
  - Row Level Security (RLS)
  - Real-time subscriptions

### Funcionalidades do Banco
- Tabelas relacionais otimizadas
- Políticas de segurança (RLS)
- Funções e views personalizadas
- Triggers para atualizações automáticas

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no Supabase

### 1. Clone o repositório
\`\`\`bash
git clone <url-do-repositorio>
cd catalogo-receitas
\`\`\`

### 2. Instale as dependências
\`\`\`bash
npm install
\`\`\`

### 3. Configure o Supabase

1. Crie um novo projeto no [Supabase](https://supabase.com)
2. Execute os scripts SQL na seguinte ordem:
   - \`scripts/01-create-tables.sql\`
   - \`scripts/02-create-policies.sql\`
   - \`scripts/03-create-functions.sql\`
   - \`scripts/04-seed-data.sql\` (opcional - dados de exemplo)

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com suas credenciais do Supabase:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
\`\`\`

**Como obter essas informações:**

1. Acesse seu projeto no [Supabase Dashboard](https://supabase.com/dashboard)
2. Vá em **Settings** → **API**
3. Copie a **Project URL** e a **anon public** key
4. Cole no arquivo `.env.local`

**⚠️ Importante:** Nunca commite o arquivo `.env.local` no seu repositório. Ele já está incluído no `.gitignore`.

### 5. Execute o projeto
\`\`\`bash
npm run dev
\`\`\`

O projeto estará disponível em \`http://localhost:3000\`

## 📊 Estrutura do Banco de Dados

### Tabelas Principais

#### \`recipes\`
- Informações básicas das receitas
- Relacionamento com usuários
- Campos para tempo, dificuldade, tipo

#### \`ingredients\`
- Ingredientes de cada receita
- Quantidade e unidade de medida
- Relacionamento com receitas

#### \`favorites\`
- Sistema de favoritos por usuário
- Relacionamento usuário-receita

#### \`comments\`
- Comentários nas receitas
- Relacionamento com usuários e receitas

#### \`ratings\`
- Avaliações com estrelas
- Uma avaliação por usuário por receita

### Views e Funções
- \`recipes_with_ratings\` - View com média de avaliações
- \`get_recipe_with_rating()\` - Função para buscar receita com rating

## 🔒 Segurança

### Row Level Security (RLS)
- Políticas de acesso granular
- Usuários só podem editar suas próprias receitas
- Visualização pública de receitas
- Favoritos e avaliações privados por usuário

### Autenticação
- Tokens JWT seguros
- Sessões gerenciadas pelo Supabase
- Proteção de rotas sensíveis

## 📱 Páginas e Funcionalidades

### Página Inicial (\`/\`)
- Listagem de todas as receitas
- Sistema de filtros e busca
- Cards com informações resumidas

### Detalhes da Receita (\`/recipes/[id]\`)
- Informações completas da receita
- Lista de ingredientes
- Modo de preparo
- Sistema de avaliação
- Comentários
- Botão de favoritar

### Nova Receita (\`/recipes/new\`)
- Formulário completo para cadastro
- Upload de imagem
- Gestão dinâmica de ingredientes
- Validações de formulário

### Favoritos (\`/favorites\`)
- Lista de receitas favoritadas
- Acesso rápido às receitas preferidas

### Autenticação (\`/auth/login\`, \`/auth/signup\`)
- Login e cadastro de usuários
- Integração com Supabase Auth

## 🎨 Componentes Principais

### \`RecipeCard\`
- Card responsivo para exibição de receitas
- Informações resumidas e ações rápidas

### \`RecipeFilters\`
- Sistema de filtros e busca
- Interface intuitiva com dropdowns

### \`RatingStars\`
- Componente de avaliação com estrelas
- Modo interativo e somente leitura

### \`Navbar\`
- Navegação principal
- Gerenciamento de autenticação

## 🔄 Fluxo de Dados

1. **Autenticação**: Usuário faz login via Supabase Auth
2. **Listagem**: Receitas são carregadas da view \`recipes_with_ratings\`
3. **Filtros**: Aplicados no frontend para performance
4. **Detalhes**: Dados carregados via função \`get_recipe_with_rating\`
5. **Interações**: Favoritos, avaliações e comentários sincronizados em tempo real

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte o repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas
- Netlify
- Railway
- Render

## 📈 Possíveis Melhorias Futuras

- [ ] Upload de imagens direto para Supabase Storage
- [ ] Sistema de categorias mais detalhado
- [ ] Receitas em destaque
- [ ] Sistema de seguir outros usuários
- [ ] Notificações em tempo real
- [ ] PWA (Progressive Web App)
- [ ] Modo offline
- [ ] Compartilhamento social
- [ ] Sistema de tags
- [ ] Busca avançada com filtros combinados

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit suas mudanças (\`git commit -m 'Add some AmazingFeature'\`)
4. Push para a branch (\`git push origin feature/AmazingFeature\`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo \`LICENSE\` para mais detalhes.

## 📞 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**Desenvolvido com ❤️ usando Next.js e Supabase**
