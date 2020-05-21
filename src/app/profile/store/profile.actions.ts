import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from 'src/app/recipes/recipe.model';

export const ADD_ORDERS = '[Profile] ADD_ORDERS ';
export const ADD_USER_RECIPES = '[Profile] ADD_USER_RECIPES';

export class AddOrders implements Action {
  readonly type = ADD_ORDERS;
  constructor(public payload: Ingredient[]) {}
}

export class AddUserRecipes implements Action {
  readonly type = ADD_USER_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export type ProfileActions = AddOrders | AddUserRecipes;
