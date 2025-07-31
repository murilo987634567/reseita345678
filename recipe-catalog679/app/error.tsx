"use client"

import { useEffect } from "react"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const isSupabaseConfigError = error.message.includes("Supabase environment variables")

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            {isSupabaseConfigError ? "Configuração Necessária" : "Algo deu errado"}
          </CardTitle>
          <CardDescription>
            {isSupabaseConfigError
              ? "O projeto precisa ser configurado com as credenciais do Supabase"
              : "Ocorreu um erro inesperado na aplicação"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isSupabaseConfigError ? (
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Como configurar:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-700">
                  <li>
                    Crie uma conta no{" "}
                    <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">
                      Supabase
                    </a>
                  </li>
                  <li>Crie um novo projeto</li>
                  <li>Vá em Settings → API</li>
                  <li>Copie a Project URL e a anon key</li>
                  <li>
                    Crie um arquivo <code className="bg-yellow-100 px-1 rounded">.env.local</code> na raiz do projeto
                  </li>
                  <li>Adicione as variáveis de ambiente conforme o README.md</li>
                </ol>
              </div>
              <div className="bg-gray-50 border rounded-lg p-4">
                <h4 className="font-medium mb-2">Exemplo do arquivo .env.local:</h4>
                <pre className="text-sm bg-gray-100 p-2 rounded overflow-x-auto">
                  {`NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-aqui`}
                </pre>
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              <p>Detalhes do erro: {error.message}</p>
            </div>
          )}

          <Button onClick={reset} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Tentar novamente
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
