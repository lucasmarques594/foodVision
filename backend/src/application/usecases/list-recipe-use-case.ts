import { Recipe } from '../../domain/entities/recipe';
import { IRecipeRepository } from '../../domain/repositories/recipe-repository-interface';

export class ListRecipesUseCase {
  constructor(private recipeRepository: IRecipeRepository) {}

  async execute(): Promise<Recipe[]> {
    return this.recipeRepository.findAll();
  }
}