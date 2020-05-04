import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shoping-list/shoping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'first',
      'first the best',
      'https://minimalistbaker.com/wp-content/uploads/2020/01/PERFECT-Roasted-Potatoes-NO-boiling-FAST-crispy-edges-tender-inside-recipe-minimalistbaker-potatoes-plantbased-glutenfree_-6.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Frecnch', 20)]
    ),
    new Recipe(
      'second',
      'second the best',
      'https://minimalistbaker.com/wp-content/uploads/2020/01/PERFECT-Roasted-Potatoes-NO-boiling-FAST-crispy-edges-tender-inside-recipe-minimalistbaker-potatoes-plantbased-glutenfree_-6.jpg',
      [new Ingredient('zopka', 1), new Ingredient('pop', 20)]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return [...this.recipes];
  }

  getRecipe(index: number) {
    return [...this.recipes][index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredientsArray(ingredients);
  }
}
