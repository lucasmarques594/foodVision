import { IRecipeRepository } from '../../application/repositories/recipe-repository-interface';
import { Recipe } from '../../domain/entities/recipe';
import { pool } from './connection';

interface RecipeRow {
  id: string;
  recipe_name: string;
  ingredients: string[];
  instructions: string;
  created_at: Date;
}

export class PgRecipeRepository implements IRecipeRepository {
  
  private mapRowToRecipe(row: RecipeRow): Recipe {
    return new Recipe({
      recipeName: row.recipe_name,
      ingredients: row.ingredients,
      instructions: row.instructions,
      createdAt: row.created_at,
    }, row.id);
  }

  async save(recipe: Recipe): Promise<Recipe> {
    const query = `
      INSERT INTO recipes (id, recipe_name, ingredients, instructions, created_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [
      recipe.id,
      recipe.recipeName,
      recipe.ingredients,
      recipe.instructions,
      recipe.createdAt,
    ];

    const result = await pool.query<RecipeRow>(query, values);
    return this.mapRowToRecipe(result.rows[0]);
  }

  async findAll(): Promise<Recipe[]> {
    const result = await pool.query<RecipeRow>('SELECT * FROM recipes ORDER BY created_at DESC;');
    return result.rows.map(this.mapRowToRecipe);
  }

  async findById(id: string): Promise<Recipe | null> {
    const result = await pool.query<RecipeRow>('SELECT * FROM recipes WHERE id = $1;', [id]);
    if (result.rowCount === 0) {
      return null;
    }
    return this.mapRowToRecipe(result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    await pool.query('DELETE FROM recipes WHERE id = $1;', [id]);
  }
}