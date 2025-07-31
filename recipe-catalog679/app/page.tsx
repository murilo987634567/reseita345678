"use client"

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RecipeCard } from "@/components/recipe-card"
import { RecipeFilters } from "@/components/recipe-filters"
import { createClient } from "@/utils/supabase/client"
import type { Recipe } from "@/types/database"

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    fetchRecipes()
    fetchFavorites()
  }, [])

  useEffect(() => {
    filterRecipes()
  }, [recipes, searchTerm, selectedType, selectedDifficulty])

  const fetchRecipes = async () => {
    try {
      const { data, error } = await supabase
        .from("recipes_with_ratings")
        .select("*")
        .order("created_at", { ascending: false })

      if (error && error.message !== "Not found") {
        console.error("Error fetching recipes:", error)
      }

      setRecipes(data || [])
    } catch (error) {
      console.error("Error fetching recipes:", error)
      setRecipes([])
    } finally {
      setLoading(false)
    }
  }

  const fetchFavorites = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase.from("favorites").select("recipe_id").eq("user_id", user.id)

      if (error) throw error
      setFavorites(new Set(data?.map((f) => f.recipe_id) || []))
    } catch (error) {
      console.error("Error fetching favorites:", error)
      setFavorites(new Set())
    }
  }

  const filterRecipes = () => {
    let filtered = recipes

    if (searchTerm) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedType) {
      filtered = filtered.filter((recipe) => recipe.type === selectedType)
    }

    if (selectedDifficulty) {
      filtered = filtered.filter((recipe) => recipe.difficulty === selectedDifficulty)
    }

    setFilteredRecipes(filtered)
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Catálogo de Receitas</h1>
          <p className="text-muted-foreground">Descubra receitas incríveis e compartilhe suas criações culinárias</p>
        </div>
        <Link href="/recipes/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Receita
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <RecipeFilters
          onSearchChange={setSearchTerm}
          onTypeChange={setSelectedType}
          onDifficultyChange={setSelectedDifficulty}
          selectedType={selectedType}
          selectedDifficulty={selectedDifficulty}
        />
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {recipes.length === 0
              ? "Nenhuma receita encontrada. Seja o primeiro a compartilhar uma receita!"
              : "Nenhuma receita encontrada com os filtros aplicados."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorited={favorites.has(recipe.id)}
              onFavoriteChange={handleFavoriteChange}
            />
          ))}
        </div>
      )}
    </div>
  )
}
