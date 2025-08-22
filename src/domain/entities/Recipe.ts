import { randomUUID } from 'crypto';
import { Ingredient } from '../value-objects/ingredient';


export class Recipe {
  public readonly id: string;
  public ingredients: Ingredient[];
  public recipeName: string;
  public instructions: string;
  public createdAt: Date;

  private constructor(
    props: {
      ingredients: Ingredient[];
      recipeName: string;
      instructions: string;
      createdAt: Date;
    },
    id: string
  ) {
    this.id = id;
    this.ingredients = props.ingredients;
    this.recipeName = props.recipeName;
    this.instructions = props.instructions;
    this.createdAt = props.createdAt;
  }

  public static create(props: {
    ingredients: Ingredient[];
    recipeName: string;
    instructions: string;
  }): Recipe {
    if (!props.ingredients || props.ingredients.length === 0) {
      throw new Error('Uma receita deve ter pelo menos um ingrediente.');
    }
    
    const id = randomUUID();
    const createdAt = new Date();
    
    return new Recipe({ ...props, createdAt }, id);
  }

  public static reconstitute(props: {
    id: string;
    ingredients: Ingredient[];
    recipeName: string;
    instructions: string;
    createdAt: Date;
  }): Recipe {
    return new Recipe(props, props.id);
  }
}