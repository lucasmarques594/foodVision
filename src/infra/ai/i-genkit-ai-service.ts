export interface IGenkitAIService {
  identifyIngredientsFromImages(images: File[]): Promise<string[]>;
  generateRecipeFromIngredients(ingredients: string[]): Promise<{ recipeName: string; instructions: string }>;
}