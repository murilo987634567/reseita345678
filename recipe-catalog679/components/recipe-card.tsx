"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Clock, Users, Star, Heart } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Recipe } from "@/types/database"
import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

interface RecipeCardProps {
  recipe: Recipe
  isFavorited?: boolean
  onFavoriteChange?: () => void
}

export function RecipeCard({ recipe, isFavorited = false, onFavoriteChange }: RecipeCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const getTypeColor = (type: string) => {
    switch (type) {
      case "doce":
        return "bg-pink-100 text-pink-800"
      case "salgado":
        return "bg-orange-100 text-orange-800"
      case "fitness":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      if (isFavorited) {
        await supabase.from("favorites").delete().eq("user_id", user.id).eq("recipe_id", recipe.id)
      } else {
        await supabase.from("favorites").insert({ user_id: user.id, recipe_id: recipe.id })
      }

      onFavoriteChange?.()
    } catch (error) {
      console.error("Error toggling favorite:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/recipes/${recipe.id}`}>
        <div className="relative aspect-video">
          <Image
            src={recipe.image_url || "/placeholder.svg?height=200&width=300&query=recipe"}
            alt={recipe.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge className={getTypeColor(recipe.type)}>{recipe.type}</Badge>
            {recipe.difficulty && <Badge className={getDifficultyColor(recipe.difficulty)}>{recipe.difficulty}</Badge>}
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/recipes/${recipe.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">{recipe.title}</h3>
        </Link>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{recipe.description}</p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {recipe.prep_time && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.prep_time}min</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{recipe.servings} porções</span>
            </div>
          )}
          {recipe.avg_rating !== undefined && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{recipe.avg_rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          variant={isFavorited ? "default" : "outline"}
          size="sm"
          onClick={handleFavorite}
          disabled={isLoading}
          className="ml-auto"
        >
          <Heart className={`w-4 h-4 mr-1 ${isFavorited ? "fill-current" : ""}`} />
          {isFavorited ? "Favoritado" : "Favoritar"}
        </Button>
      </CardFooter>
    </Card>
  )
}
