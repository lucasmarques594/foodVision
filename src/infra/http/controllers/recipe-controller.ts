import { CreateRecipeUseCase } from '../../../application/usecases/create-recipe-use-case';
import { DeleteRecipeUseCase } from '../../../application/usecases/delete-recipe-use-case';
import { GetRecipeByIdUseCase } from '../../../application/usecases/get-recipe-by-id-use-case';
import { ListRecipesUseCase } from '../../../application/usecases/list-recipe-use-case';
import { Recipe } from '../../../domain/entities/recipe';

export class RecipeController {
  constructor(
    private readonly createRecipeUseCase: CreateRecipeUseCase,
    private readonly listRecipesUseCase: ListRecipesUseCase,
    private readonly getRecipeByIdUseCase: GetRecipeByIdUseCase,
    private readonly deleteRecipeUseCase: DeleteRecipeUseCase
  ) {}

  private formatRecipeToDTO(recipe: Recipe) {
    return {
      id: recipe.id,
      ingredientes: recipe.ingredients.map(i => i.name),
      receita: recipe.recipeName,
      modo_preparo: recipe.instructions,
      data_criacao: recipe.createdAt.toISOString(),
    };
  }

  async create(ctx: { body: { files: File[] }; set: { status?: number | string } }) {
    try {
      const recipe = await this.createRecipeUseCase.execute(ctx.body.files);
      ctx.set.status = 201;
      return this.formatRecipeToDTO(recipe);
    } catch (error: any) {
      ctx.set.status = error.message.includes('necessários') ? 400 : 500;
      return { error: error.message };
    }
  }

  async list() {
    const recipes = await this.listRecipesUseCase.execute();
    return recipes.map(this.formatRecipeToDTO);
  }

  async getById(ctx: { params: { id: string }; set: { status?: number | string } }) {
    const recipe = await this.getRecipeByIdUseCase.execute(ctx.params.id);

    if (!recipe) {
      ctx.set.status = 404;
      return { error: 'Receita não encontrada.' };
    }
    return this.formatRecipeToDTO(recipe);
  }

  async delete(ctx: { params: { id: string }; set: { status?: number | string } }) {
    try {
      await this.deleteRecipeUseCase.execute(ctx.params.id);
      ctx.set.status = 204;
      return;
    } catch (error: any) {
      ctx.set.status = 404;
      return { error: error.message };
    }
  }
}