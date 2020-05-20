import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public _id: string;
  public name: string;
  public description: string;
  public imagePath?: string;
  public ingredients: Ingredient[];
  public image?: File;
  constructor(
    name: string,
    desc: string,
    Ingredients: Ingredient[],
    imagePath: string,
  ) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = Ingredients;
  }
}
