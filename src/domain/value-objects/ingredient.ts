export class Ingredient {
  public readonly name: string;

  private constructor(name: string) {
    this.name = name;
  }

  public static create(name: string): Ingredient {
    if (!name || name.trim().length === 0) {
      throw new Error('O nome do ingrediente não pode ser vazio.');
    }
    return new Ingredient(name.trim().toLowerCase());
  }
}