import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shoping-list/shoping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

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
      [new Ingredient('banan', 1), new Ingredient('ukrop', 20)]
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

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next([...this.recipes]);
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next([...this.recipes]);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next([...this.recipes]);
  }
}
