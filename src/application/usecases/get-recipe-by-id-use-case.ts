import { Recipe } from '../../domain/entities/recipe';
import { IRecipeRepository } from '../repositories/recipe-repository-interface';

export class GetRecipeByIdUseCase {
  constructor(private recipeRepository: IRecipeRepository) {}

  async execute(id: string): Promise<Recipe | null> {
    return this.recipeRepository.findById(id);
  }
}