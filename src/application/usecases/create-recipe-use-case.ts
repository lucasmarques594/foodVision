import { Recipe } from '../../domain/entities/recipe';
import { IAIService } from '../../infra/ai/ai-service';
import { IRecipeRepository } from '../repositories/recipe-repository-interface';

export class CreateRecipeUseCase {
  constructor(
    private recipeRepository: IRecipeRepository,
    private aiService: IAIService
  ) {}

  async execute(imageFiles: File[]): Promise<Recipe> {
    if (!imageFiles || imageFiles.length !== 3) {
      throw new Error('Exatamente 3 arquivos de imagem são necessários.');
    }

    const ingredients = await this.aiService.identifyIngredientsFromImages(imageFiles);
    if (ingredients.length === 0) {
      throw new Error('Nenhum ingrediente pôde ser identificado nas imagens.');
    }

    const { recipeName, instructions } = await this.aiService.generateRecipeFromIngredients(ingredients);
    
    const recipe = new Recipe({
      ingredients,
      recipeName,
      instructions,
    });

    return this.recipeRepository.save(recipe);
  }
}