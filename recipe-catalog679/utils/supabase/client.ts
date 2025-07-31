// Mock data for demo purposes
const mockRecipes = [
  {
    id: "1",
    title: "Bolo de Chocolate Fitness",
    description: "Delicioso bolo de chocolate sem açúcar, perfeito para quem está na dieta",
    image_url: "/placeholder.svg?height=300&width=400",
    prep_time: 15,
    cook_time: 30,
    servings: 8,
    difficulty: "easy",
    type: "fitness",
    instructions: "Misture todos os ingredientes secos. Adicione os líquidos e mexa bem. Asse por 30 minutos a 180°C.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: "demo-user",
    avg_rating: 4.5,
    total_ratings: 12,
  },
  {
    id: "2",
    title: "Lasanha de Berinjela",
    description: "Lasanha saudável substituindo a massa por berinjela",
    image_url: "/placeholder.svg?height=300&width=400",
    prep_time: 30,
    cook_time: 45,
    servings: 6,
    difficulty: "medium",
    type: "salgado",
    instructions:
      "Corte as berinjelas em fatias. Monte as camadas alternando berinjela, molho e queijo. Asse por 45 minutos.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: "demo-user",
    avg_rating: 4.8,
    total_ratings: 8,
  },
  {
    id: "3",
    title: "Brigadeiro Gourmet",
    description: "Brigadeiro tradicional com toque especial",
    image_url: "/placeholder.svg?height=300&width=400",
    prep_time: 10,
    cook_time: 15,
    servings: 20,
    difficulty: "easy",
    type: "doce",
    instructions:
      "Misture leite condensado, chocolate em pó e manteiga. Cozinhe mexendo sempre até desgrudar da panela.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: "demo-user",
    avg_rating: 4.9,
    total_ratings: 15,
  },
  {
    id: "4",
    title: "Salada Caesar Fitness",
    description: "Versão saudável da clássica salada caesar",
    image_url: "/placeholder.svg?height=300&width=400",
    prep_time: 15,
    cook_time: 0,
    servings: 2,
    difficulty: "easy",
    type: "fitness",
    instructions: "Misture todos os ingredientes do molho. Adicione às folhas e sirva imediatamente.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: "demo-user",
    avg_rating: 4.3,
    total_ratings: 7,
  },
  {
    id: "5",
    title: "Torta de Limão",
    description: "Torta cremosa de limão com base crocante",
    image_url: "/placeholder.svg?height=300&width=400",
    prep_time: 25,
    cook_time: 40,
    servings: 10,
    difficulty: "medium",
    type: "doce",
    instructions: "Prepare a massa, faça o creme de limão e monte a torta. Leve ao forno por 40 minutos.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: "demo-user",
    avg_rating: 4.7,
    total_ratings: 11,
  },
  {
    id: "6",
    title: "Risotto de Cogumelos",
    description: "Risotto cremoso com mix de cogumelos frescos",
    image_url: "/placeholder.svg?height=300&width=400",
    prep_time: 20,
    cook_time: 35,
    servings: 4,
    difficulty: "hard",
    type: "salgado",
    instructions: "Refogue os cogumelos, adicione o arroz e vá acrescentando o caldo aos poucos, mexendo sempre.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: "demo-user",
    avg_rating: 4.6,
    total_ratings: 9,
  },
]

const mockIngredients = [
  { id: "1", recipe_id: "1", name: "Farinha de aveia", quantity: "2", unit: "xícaras" },
  { id: "2", recipe_id: "1", name: "Cacau em pó", quantity: "1/2", unit: "xícara" },
  { id: "3", recipe_id: "1", name: "Adoçante", quantity: "1", unit: "xícara" },
  { id: "4", recipe_id: "1", name: "Ovos", quantity: "3", unit: "unidades" },

  { id: "5", recipe_id: "2", name: "Berinjelas grandes", quantity: "2", unit: "unidades" },
  { id: "6", recipe_id: "2", name: "Molho de tomate", quantity: "500", unit: "ml" },
  { id: "7", recipe_id: "2", name: "Queijo mussarela", quantity: "300", unit: "g" },
  { id: "8", recipe_id: "2", name: "Carne moída", quantity: "500", unit: "g" },

  { id: "9", recipe_id: "3", name: "Leite condensado", quantity: "1", unit: "lata" },
  { id: "10", recipe_id: "3", name: "Chocolate em pó", quantity: "3", unit: "colheres de sopa" },
  { id: "11", recipe_id: "3", name: "Manteiga", quantity: "1", unit: "colher de sopa" },
  { id: "12", recipe_id: "3", name: "Chocolate granulado", quantity: "100", unit: "g" },

  { id: "13", recipe_id: "4", name: "Alface romana", quantity: "1", unit: "pé" },
  { id: "14", recipe_id: "4", name: "Peito de frango grelhado", quantity: "200", unit: "g" },
  { id: "15", recipe_id: "4", name: "Parmesão ralado", quantity: "50", unit: "g" },
  { id: "16", recipe_id: "4", name: "Iogurte grego", quantity: "3", unit: "colheres de sopa" },

  { id: "17", recipe_id: "5", name: "Biscoito maisena", quantity: "200", unit: "g" },
  { id: "18", recipe_id: "5", name: "Manteiga", quantity: "100", unit: "g" },
  { id: "19", recipe_id: "5", name: "Leite condensado", quantity: "1", unit: "lata" },
  { id: "20", recipe_id: "5", name: "Suco de limão", quantity: "1/2", unit: "xícara" },

  { id: "21", recipe_id: "6", name: "Arroz arbóreo", quantity: "300", unit: "g" },
  { id: "22", recipe_id: "6", name: "Mix de cogumelos", quantity: "400", unit: "g" },
  { id: "23", recipe_id: "6", name: "Caldo de legumes", quantity: "1", unit: "litro" },
  { id: "24", recipe_id: "6", name: "Vinho branco", quantity: "1/2", unit: "xícara" },
]

const mockComments = [
  {
    id: "1",
    recipe_id: "1",
    user_id: "demo-user",
    content: "Ficou delicioso! Muito fácil de fazer e super saudável.",
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "2",
    recipe_id: "2",
    user_id: "demo-user-2",
    content: "Perfeita para quem quer comer bem sem culpa. Aprovadíssima!",
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    id: "3",
    recipe_id: "3",
    user_id: "demo-user-3",
    content: "O melhor brigadeiro que já fiz! Vou fazer sempre assim.",
    created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
  },
  {
    id: "4",
    recipe_id: "4",
    user_id: "demo-user",
    content: "Ótima opção para o almoço. Leve e nutritiva!",
    created_at: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
  },
  {
    id: "5",
    recipe_id: "5",
    user_id: "demo-user-2",
    content: "Torta maravilhosa! O equilíbrio entre doce e azedo está perfeito.",
    created_at: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
  },
]

// Create a mock Supabase client for demo purposes
function createMockSupabaseClient() {
  let mockUser: any = null
  let mockFavorites: string[] = []
  const mockRatings: { [key: string]: number } = {}

  return {
    auth: {
      getUser: () => Promise.resolve({ data: { user: mockUser }, error: null }),
      signInWithPassword: ({ email, password }: any) => {
        if (email && password) {
          mockUser = { id: "demo-user", email }
          return Promise.resolve({ data: { user: mockUser }, error: null })
        }
        return Promise.resolve({ data: { user: null }, error: { message: "Invalid credentials" } })
      },
      signUp: ({ email, password }: any) => {
        if (email && password) {
          mockUser = { id: "demo-user", email }
          return Promise.resolve({ data: { user: mockUser }, error: null })
        }
        return Promise.resolve({ data: { user: null }, error: { message: "Invalid data" } })
      },
      signOut: () => {
        mockUser = null
        return Promise.resolve({ error: null })
      },
      onAuthStateChange: (callback: any) => {
        // Mock auth state change
        setTimeout(() => callback(mockUser ? "SIGNED_IN" : "SIGNED_OUT", mockUser ? { user: mockUser } : null), 100)
        return { data: { subscription: { unsubscribe: () => {} } } }
      },
    },
    from: (table: string) => ({
      select: (columns?: string) => ({
        eq: (column: string, value: any) => ({
          single: () => {
            if (table === "recipes" && column === "id") {
              const recipe = mockRecipes.find((r) => r.id === value)
              return Promise.resolve({ data: recipe, error: recipe ? null : { message: "Not found" } })
            }
            if (table === "favorites" && column === "user_id") {
              const favorites = mockFavorites.map((id) => ({ recipe_id: id }))
              return Promise.resolve({ data: favorites, error: null })
            }
            if (table === "ingredients" && column === "recipe_id") {
              const ingredients = mockIngredients.filter((i) => i.recipe_id === value)
              return Promise.resolve({ data: ingredients, error: null })
            }
            if (table === "comments" && column === "recipe_id") {
              const comments = mockComments.filter((c) => c.recipe_id === value)
              return Promise.resolve({ data: comments, error: null })
            }
            return Promise.resolve({ data: null, error: null })
          },
          order: (column: string, options?: any) => {
            if (table === "recipes") {
              return Promise.resolve({ data: mockRecipes, error: null })
            }
            if (table === "comments") {
              const comments = mockComments.filter((c) => c.recipe_id === value)
              return Promise.resolve({ data: comments, error: null })
            }
            return Promise.resolve({ data: [], error: null })
          },
        }),
        order: (column: string, options?: any) => {
          if (table === "recipes" || table === "recipes_with_ratings") {
            return Promise.resolve({ data: mockRecipes, error: null })
          }
          return Promise.resolve({ data: [], error: null })
        },
      }),
      insert: (data: any) => ({
        select: () => ({
          single: () => {
            const newItem = { id: Math.random().toString(), ...data }
            if (table === "recipes") {
              mockRecipes.push(newItem)
            }
            return Promise.resolve({ data: newItem, error: null })
          },
        }),
      }),
      delete: () => ({
        eq: (column: string, value: any) => {
          if (table === "favorites") {
            mockFavorites = mockFavorites.filter((id) => id !== value)
          }
          return Promise.resolve({ error: null })
        },
      }),
      upsert: (data: any) => {
        if (table === "ratings") {
          mockRatings[data.recipe_id] = data.rating
        }
        if (table === "favorites") {
          if (!mockFavorites.includes(data.recipe_id)) {
            mockFavorites.push(data.recipe_id)
          }
        }
        return Promise.resolve({ error: null })
      },
    }),
    rpc: (functionName: string, params: any) => {
      if (functionName === "get_recipe_with_rating") {
        const recipe = mockRecipes.find((r) => r.id === params.recipe_uuid)
        return {
          single: () => Promise.resolve({ data: recipe, error: recipe ? null : { message: "Not found" } }),
        }
      }
      return Promise.resolve({ data: null, error: null })
    },
  }
}

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If environment variables are not set, return mock client for demo
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("🚀 Demo Mode: Using mock data. Configure Supabase environment variables for full functionality.")
    return createMockSupabaseClient() as any
  }

  // Only import the real Supabase client if we have the environment variables
  try {
    const { createBrowserClient } = require("@supabase/ssr")
    return createBrowserClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.warn("🚀 Falling back to Demo Mode due to Supabase import error")
    return createMockSupabaseClient() as any
  }
}

// Export mock data for components that need it
export const mockData = {
  recipes: mockRecipes,
  ingredients: mockIngredients,
  comments: mockComments,
}
