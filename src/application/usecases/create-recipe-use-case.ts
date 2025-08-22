import { Recipe } from '../../domain/entities/recipe';
import { Ingredient } from '../../domain/value-objects/ingredient';
import { IRecipeRepository } from '../../domain/repositories/recipe-repository-interface';
import { IGenkitAIService } from '../../infra/ai/i-genkit-ai-service';

export class CreateRecipeUseCase {
  constructor(
    private recipeRepository: IRecipeRepository,
    private aiService: IGenkitAIService
  ) {}

  async execute(imageFiles: File[]): Promise<Recipe> {
    if (!imageFiles || imageFiles.length !== 3) {
      throw new Error('Exatamente 3 arquivos de imagem são necessários.');
    }

    const ingredientNames = await this.aiService.identifyIngredientsFromImages(imageFiles);
    if (ingredientNames.length === 0) {
      throw new Error('Nenhum ingrediente pôde ser identificado nas imagens.');
    }

    const ingredients = ingredientNames.map(name => Ingredient.create(name));

    const { recipeName, instructions } = await this.aiService.generateRecipeFromIngredients(ingredientNames);
    
    const recipe = Recipe.create({
      ingredients,
      recipeName,
      instructions,
    });

    return this.recipeRepository.save(recipe);
  }
}