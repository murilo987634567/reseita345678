export interface Recipe {
  id: string
  title: string
  description: string | null
  image_url: string | null
  prep_time: number | null
  cook_time: number | null
  servings: number | null
  difficulty: "easy" | "medium" | "hard" | null
  type: "doce" | "salgado" | "fitness"
  instructions: string
  created_at: string
  updated_at: string
  user_id: string
  avg_rating?: number
  total_ratings?: number
}

export interface Ingredient {
  id: string
  recipe_id: string
  name: string
  quantity: string | null
  unit: string | null
}

export interface Comment {
  id: string
  recipe_id: string
  user_id: string
  content: string
  created_at: string
}

export interface Rating {
  id: string
  recipe_id: string
  user_id: string
  rating: number
  created_at: string
}

export interface Favorite {
  id: string
  user_id: string
  recipe_id: string
  created_at: string
}
