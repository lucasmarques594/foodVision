
import { IRecipeRepository } from '../../domain/repositories/recipe-repository-interface';


export class CreateRecipeUseCase {
  constructor(
    private recipeRepository: IRecipeRepository,

  ) {}
}