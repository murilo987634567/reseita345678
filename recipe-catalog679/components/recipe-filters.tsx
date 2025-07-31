"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface RecipeFiltersProps {
  onSearchChange: (search: string) => void
  onTypeChange: (type: string | null) => void
  onDifficultyChange: (difficulty: string | null) => void
  selectedType: string | null
  selectedDifficulty: string | null
}

export function RecipeFilters({
  onSearchChange,
  onTypeChange,
  onDifficultyChange,
  selectedType,
  selectedDifficulty,
}: RecipeFiltersProps) {
  const [search, setSearch] = useState("")

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onSearchChange(value)
  }

  const types = [
    { value: "doce", label: "Doce" },
    { value: "salgado", label: "Salgado" },
    { value: "fitness", label: "Fitness" },
  ]

  const difficulties = [
    { value: "easy", label: "Fácil" },
    { value: "medium", label: "Médio" },
    { value: "hard", label: "Difícil" },
  ]

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar receitas..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Tipo
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onTypeChange(null)}>Todos os tipos</DropdownMenuItem>
            {types.map((type) => (
              <DropdownMenuItem key={type.value} onClick={() => onTypeChange(type.value)}>
                {type.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Dificuldade
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onDifficultyChange(null)}>Todas as dificuldades</DropdownMenuItem>
            {difficulties.map((difficulty) => (
              <DropdownMenuItem key={difficulty.value} onClick={() => onDifficultyChange(difficulty.value)}>
                {difficulty.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {selectedType && (
          <Badge variant="secondary" className="cursor-pointer" onClick={() => onTypeChange(null)}>
            {types.find((t) => t.value === selectedType)?.label} ×
          </Badge>
        )}

        {selectedDifficulty && (
          <Badge variant="secondary" className="cursor-pointer" onClick={() => onDifficultyChange(null)}>
            {difficulties.find((d) => d.value === selectedDifficulty)?.label} ×
          </Badge>
        )}
      </div>
    </div>
  )
}
