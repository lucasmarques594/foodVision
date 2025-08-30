'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";

interface Recipe {
  id: string;
  ingredientes: string[];
  receita: string;
  modo_preparo: string;
  data_criacao: string;
}

export default function HomePage() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!files || files.length !== 3) {
      setError('Por favor, selecione exatamente 3 arquivos de imagem.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipe(null);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ocorreu um erro ao gerar a receita.');
      }

      setRecipe(data);
    } catch (err: unknown) { 
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12 bg-background">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
             FoodVision, IA receitas
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Envie 3 imagens de ingredientes e a IA criará uma receita para você!
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gerar Nova Receita</CardTitle>
            <CardDescription>Selecione exatamente 3 imagens (PNG ou JPG) dos seus ingredientes.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                id="image-files"
                type="file"
                multiple
                accept="image/png, image/jpeg"
                onChange={(e) => setFiles(e.target.files)}
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Gerando...' : 'Gerar Receita'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="mt-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {recipe && (
          <Card className="mt-12 w-full text-left">
            <CardHeader>
              <CardTitle className="text-2xl text-center">{recipe.receita}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <h3 className="text-lg font-semibold">Ingredientes:</h3>
                <ul className="mt-2 list-disc list-inside text-muted-foreground">
                  {recipe.ingredientes.map((ing, index) => <li key={index}>{ing}</li>)}
                </ul>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Modo de Preparo:</h3>
                <p className="mt-2 whitespace-pre-wrap leading-relaxed text-muted-foreground">{recipe.modo_preparo}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}