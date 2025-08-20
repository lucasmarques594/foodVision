import { Recipe } from "../../domain/entities/Recipe";

export interface IRecipeRepository {
  save(recipe: Recipe): Promise<Recipe>;
  findAll(): Promise<Recipe[]>;
  findById(id: string): Promise<Recipe | null>;
  delete(id: string): Promise<void>;
}