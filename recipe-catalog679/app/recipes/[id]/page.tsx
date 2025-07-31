"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Clock, Users, ChefHat, Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { RatingStars } from "@/components/rating-stars"
import { createClient } from "@/utils/supabase/client"
import type { Recipe, Ingredient, Comment } from "@/types/database"

export default function RecipeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [userRating, setUserRating] = useState<number>(0)
  const [isFavorited, setIsFavorited] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  const supabase = createClient()

  useEffect(() => {
    if (params.id) {
      fetchRecipeData()
      checkUser()
    }
  }, [params.id])

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser(user)
  }

  const fetchRecipeData = async () => {
    try {
      // Fetch recipe with rating
      const { data: recipeData, error: recipeError } = await supabase
        .rpc("get_recipe_with_rating", { recipe_uuid: params.id })
        .single()

      if (recipeError && recipeError.message !== "Not found") {
        console.error("Error fetching recipe:", recipeError)
      }

      if (recipeData) {
        setRecipe(recipeData)
      }

      // Fetch ingredients
      const { data: ingredientsData } = await supabase.from("ingredients").select("*").eq("recipe_id", params.id)

      setIngredients(ingredientsData || [])

      // Fetch comments
      const { data: commentsData } = await supabase
        .from("comments")
        .select("*")
        .eq("recipe_id", params.id)
        .order("created_at", { ascending: false })

      setComments(commentsData || [])

      // Check if favorited and get user rating
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        // Check favorite
        const { data: favoriteData } = await supabase
          .from("favorites")
          .select("id")
          .eq("user_id", user.id)
          .eq("recipe_id", params.id)
          .single()

        setIsFavorited(!!favoriteData)

        // Get user rating
        const { data: ratingData } = await supabase
          .from("ratings")
          .select("rating")
          .eq("user_id", user.id)
          .eq("recipe_id", params.id)
          .single()

        setUserRating(ratingData?.rating || 0)
      }
    } catch (error) {
      console.error("Error fetching recipe data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFavorite = async () => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    try {
      if (isFavorited) {
        await supabase.from("favorites").delete().eq("user_id", user.id).eq("recipe_id", params.id)
      } else {
        await supabase.from("favorites").insert({ user_id: user.id, recipe_id: params.id })
      }
      setIsFavorited(!isFavorited)
    } catch (error) {
      console.error("Error toggling favorite:", error)
    }
  }

  const handleRating = async (rating: number) => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    try {
      const { error } = await supabase.from("ratings").upsert({
        user_id: user.id,
        recipe_id: params.id,
        rating,
      })

      if (error) throw error
      setUserRating(rating)
      fetchRecipeData() // Refresh to get updated average rating
    } catch (error) {
      console.error("Error saving rating:", error)
    }
  }

  const handleComment = async () => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    if (!newComment.trim()) return

    try {
      const { error } = await supabase.from("comments").insert({
        user_id: user.id,
        recipe_id: params.id,
        content: newComment,
      })

      if (error) throw error
      setNewComment("")
      fetchRecipeData() // Refresh comments
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="bg-gray-200 aspect-video rounded-lg mb-8"></div>
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Receita não encontrada</h1>
          <Button onClick={() => router.push("/")}>Voltar ao início</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
            <Image
              src={recipe.image_url || "/placeholder.svg?height=400&width=600&query=recipe"}
              alt={recipe.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className={getTypeColor(recipe.type)}>{recipe.type}</Badge>
            {recipe.difficulty && <Badge className={getDifficultyColor(recipe.difficulty)}>{recipe.difficulty}</Badge>}
          </div>

          <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>

          <div className="flex items-center gap-6 mb-6">
            {recipe.prep_time && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span>{recipe.prep_time} min preparo</span>
              </div>
            )}
            {recipe.cook_time && (
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-muted-foreground" />
                <span>{recipe.cook_time} min cozimento</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-muted-foreground" />
                <span>{recipe.servings} porções</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <RatingStars rating={userRating} onRatingChange={handleRating} size="lg" />
            <span className="text-sm text-muted-foreground">Sua avaliação</span>
            <div className="flex items-center gap-2 ml-4">
              <RatingStars rating={recipe.avg_rating || 0} readonly size="md" />
              <span className="text-sm text-muted-foreground">({recipe.total_ratings} avaliações)</span>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <Button onClick={handleFavorite} variant={isFavorited ? "default" : "outline"}>
              <Heart className={`w-4 h-4 mr-2 ${isFavorited ? "fill-current" : ""}`} />
              {isFavorited ? "Favoritado" : "Favoritar"}
            </Button>
          </div>

          {recipe.description && <p className="text-lg text-muted-foreground mb-8">{recipe.description}</p>}

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Modo de Preparo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap">{recipe.instructions}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ingredientes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {ingredients.map((ingredient) => (
                  <li key={ingredient.id} className="flex justify-between">
                    <span>{ingredient.name}</span>
                    <span className="text-muted-foreground">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Comentários ({comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="Deixe seu comentário..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button onClick={handleComment} disabled={!newComment.trim()}>
                  Comentar
                </Button>
              </div>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b pb-4 last:border-b-0">
                    <p className="text-sm">{comment.content}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(comment.created_at).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
