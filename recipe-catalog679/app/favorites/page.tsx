"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"
import { RecipeCard } from "@/components/recipe-card"
import { createClient } from "@/utils/supabase/client"
import type { Recipe } from "@/types/database"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Recipe[]>([])
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      router.push("/auth/login")
      return
    }
    setUser(user)
    fetchFavorites()
  }

  const fetchFavorites = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from("favorites")
        .select(`
          recipe_id,
          recipes!inner (
            id,
            title,
            description,
            image_url,
            prep_time,
            cook_time,
            servings,
            difficulty,
            type,
            instructions,
            created_at,
            updated_at,
            user_id
          )
        `)
        .eq("user_id", user.id)

      if (error) throw error

      const favoriteRecipes = data?.map((item) => item.recipes).filter(Boolean) || []
      const favoriteRecipeIds = new Set(data?.map((item) => item.recipe_id) || [])

      setFavorites(favoriteRecipes as Recipe[])
      setFavoriteIds(favoriteRecipeIds)
    } catch (error) {
      console.error("Error fetching favorites:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFavoriteChange = () => {
    fetchFavorites()
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-video rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Heart className="w-8 h-8 fill-red-500 text-red-500" />
          Receitas Favoritas
        </h1>
        <p className="text-muted-foreground">Suas receitas favoritas em um só lugar</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-lg mb-4">Você ainda não tem receitas favoritas</p>
          <p className="text-muted-foreground">Explore o catálogo e favorite suas receitas preferidas!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorited={favoriteIds.has(recipe.id)}
              onFavoriteChange={handleFavoriteChange}
            />
          ))}
        </div>
      )}
    </div>
  )
}
