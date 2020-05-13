import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[Recipes] SET_RECIPES';
export const FETCH_RECIPES = '[Recipes] FETCH_RECIPES';

export const ADD_RECIPE = '[Recipes] ADD_RECIPE';
export const ADD_RECIPE_TO_DB = '[Recipes] ADD_RECIPE_TO_DB';
export const UPDATE_RECIPE = '[Recipes] UPDATE_RECIPE';
export const UPDATE_RECIPE_ON_DB = '[Recipes] UPDATE_RECIPE_ON_DB';
export const DELETE_RECIPE = '[Recipes] DELETE_RECIPE';
export const DELETE_RECIPE_ON_DB = '[Recipes] DELETE_RECIPE_ON_DB';
export const STORE_RECIPES = '[Recipes] STORE_RECIPES';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class AddRecipeToDataBase implements Action {
  readonly type = ADD_RECIPE_TO_DB;
  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: Recipe ) {}
}

export class UpdateRecipeOnDataBase implements Action {
  readonly type = UPDATE_RECIPE_ON_DB;
  constructor(public payload: Recipe ) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: string) {}
}

export class DeleteRecipeOnDataBase implements Action {
  readonly type = DELETE_RECIPE_ON_DB;
  constructor(public payload: string) {}
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export type RecipesActions =
  | SetRecipes
  | FetchRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | StoreRecipes
  | AddRecipeToDataBase
  | UpdateRecipeOnDataBase
  | DeleteRecipeOnDataBase;
