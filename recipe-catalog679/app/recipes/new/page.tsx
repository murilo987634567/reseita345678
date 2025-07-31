"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/utils/supabase/client"

interface Ingredient {
  name: string
  quantity: string
  unit: string
}

export default function NewRecipePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    prep_time: "",
    cook_time: "",
    servings: "",
    difficulty: "",
    type: "",
    instructions: "",
    image_url: "",
  })
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: "", quantity: "", unit: "" }])

  const supabase = createClient()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
    setIngredients((prev) =>
      prev.map((ingredient, i) => (i === index ? { ...ingredient, [field]: value } : ingredient)),
    )
  }

  const addIngredient = () => {
    setIngredients((prev) => [...prev, { name: "", quantity: "", unit: "" }])
  }

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      // Insert recipe
      const { data: recipe, error: recipeError } = await supabase
        .from("recipes")
        .insert({
          ...formData,
          prep_time: formData.prep_time ? Number.parseInt(formData.prep_time) : null,
          cook_time: formData.cook_time ? Number.parseInt(formData.cook_time) : null,
          servings: formData.servings ? Number.parseInt(formData.servings) : null,
          user_id: user.id,
        })
        .select()
        .single()

      if (recipeError) throw recipeError

      // Insert ingredients
      const validIngredients = ingredients.filter((ing) => ing.name.trim())
      if (validIngredients.length > 0) {
        const { error: ingredientsError } = await supabase.from("ingredients").insert(
          validIngredients.map((ingredient) => ({
            recipe_id: recipe.id,
            ...ingredient,
          })),
        )

        if (ingredientsError) throw ingredientsError
      }

      router.push(`/recipes/${recipe.id}`)
    } catch (error) {
      console.error("Error creating recipe:", error)
      alert("Erro ao criar receita. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Nova Receita</h1>
        <p className="text-muted-foreground">Compartilhe sua receita favorita com a comunidade</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Título da Receita *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Ex: Bolo de Chocolate Fitness"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Descreva sua receita..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="image_url">URL da Imagem</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => handleInputChange("image_url", e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
                type="url"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Tipo *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doce">Doce</SelectItem>
                    <SelectItem value="salgado">Salgado</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="difficulty">Dificuldade</Label>
                <Select value={formData.difficulty} onValueChange={(value) => handleInputChange("difficulty", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a dificuldade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Fácil</SelectItem>
                    <SelectItem value="medium">Médio</SelectItem>
                    <SelectItem value="hard">Difícil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="prep_time">Tempo de Preparo (min)</Label>
                <Input
                  id="prep_time"
                  type="number"
                  value={formData.prep_time}
                  onChange={(e) => handleInputChange("prep_time", e.target.value)}
                  placeholder="30"
                />
              </div>

              <div>
                <Label htmlFor="cook_time">Tempo de Cozimento (min)</Label>
                <Input
                  id="cook_time"
                  type="number"
                  value={formData.cook_time}
                  onChange={(e) => handleInputChange("cook_time", e.target.value)}
                  placeholder="45"
                />
              </div>

              <div>
                <Label htmlFor="servings">Porções</Label>
                <Input
                  id="servings"
                  type="number"
                  value={formData.servings}
                  onChange={(e) => handleInputChange("servings", e.target.value)}
                  placeholder="4"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Ingredientes
              <Button type="button" onClick={addIngredient} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Label>Ingrediente</Label>
                  <Input
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                    placeholder="Ex: Farinha de trigo"
                  />
                </div>
                <div className="w-24">
                  <Label>Quantidade</Label>
                  <Input
                    value={ingredient.quantity}
                    onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
                    placeholder="2"
                  />
                </div>
                <div className="w-24">
                  <Label>Unidade</Label>
                  <Input
                    value={ingredient.unit}
                    onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
                    placeholder="xícaras"
                  />
                </div>
                {ingredients.length > 1 && (
                  <Button type="button" variant="outline" size="icon" onClick={() => removeIngredient(index)}>
                    <Minus className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modo de Preparo</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="instructions">Instruções *</Label>
            <Textarea
              id="instructions"
              value={formData.instructions}
              onChange={(e) => handleInputChange("instructions", e.target.value)}
              placeholder="Descreva passo a passo como preparar a receita..."
              rows={8}
              required
            />
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? "Salvando..." : "Salvar Receita"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/")}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}
