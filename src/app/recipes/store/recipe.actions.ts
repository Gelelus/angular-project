import { Action } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const SET_RECIPES = '[Recipes] SET_RECIPES';
export const SET_RECIPE = '[Recipes] SET_RECIPE';
export const FETCH_RECIPES = '[Recipes] FETCH_RECIPES';
export const ADD_RECIPE = '[Recipes] ADD_RECIPE';
export const ADD_RECIPE_TO_DB = '[Recipes] ADD_RECIPE_TO_DB';
export const UPDATE_RECIPE = '[Recipes] UPDATE_RECIPE';
export const UPDATE_RECIPE_ON_DB = '[Recipes] UPDATE_RECIPE_ON_DB';
export const DELETE_RECIPE = '[Recipes] DELETE_RECIPE';
export const DELETE_RECIPE_ON_DB = '[Recipes] DELETE_RECIPE_ON_DB';
export const STORE_RECIPES = '[Recipes] STORE_RECIPES';
export const CRUD_FAIL = '[Recipes] CRUD_FAIL';
export const FETCH_RECIPE = '[Recipes] FETCH_RECIPE';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: { recipes: Recipe[]; maxRecipes: number }) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
  constructor(public payload: { startItem: number; limit: number }) {}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class SetRecipe implements Action {
  readonly type = SET_RECIPE;
  constructor(public payload: Recipe) {}
}

export class AddRecipeToDataBase implements Action {
  readonly type = ADD_RECIPE_TO_DB;
  constructor(
    public payload: {
      description: string;
      image: File;
      ingredients: Ingredient[];
      name: string;
    }
  ) {}
}

export class FetchRecipe implements Action {
  readonly type = FETCH_RECIPE;
  constructor(public payload: string) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: Recipe[]) {}
}

export class UpdateRecipeOnDataBase implements Action {
  readonly type = UPDATE_RECIPE_ON_DB;
  constructor(public payload: Recipe) {}
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

export class CrudFail implements Action {
  readonly type = CRUD_FAIL;
  constructor(public payload: string) {}
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
  | DeleteRecipeOnDataBase
  | CrudFail
  | FetchRecipe
  | SetRecipe;
