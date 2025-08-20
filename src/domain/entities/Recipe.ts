import { randomUUID } from 'crypto';

export class Recipe {
  public readonly id: string;
  public ingredients: string[];
  public recipeName: string;
  public instructions: string;
  public createdAt: Date;

  constructor(
    props: {
      ingredients: string[];
      recipeName: string;
      instructions: string;
      createdAt?: Date;
    },
    id?: string
  ) {
    this.id = id ?? randomUUID();
    this.ingredients = props.ingredients;
    this.recipeName = props.recipeName;
    this.instructions = props.instructions;
    this.createdAt = props.createdAt ?? new Date();
  }
}