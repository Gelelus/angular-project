import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public name: string;
  public decription: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(
    name: string,
    desc: string,
    imagePath: string,
    Ingredients: Ingredient[]
  ) {
    this.name = name;
    this.decription = desc;
    this.imagePath = imagePath;
    this.ingredients = Ingredients;
  }
}
