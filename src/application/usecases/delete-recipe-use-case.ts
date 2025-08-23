import { IRecipeRepository } from '../../domain/repositories/recipe-repository-interface';

export class DeleteRecipeUseCase {
  constructor(private recipeRepository: IRecipeRepository) {}

  async execute(id: string): Promise<void> {
    const recipeExists = await this.recipeRepository.findById(id);
    if (!recipeExists) {
      throw new Error('Receita não encontrada.');
    }
    await this.recipeRepository.delete(id);
  }
}