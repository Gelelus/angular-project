import { Action } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = '[Shoping List] ADD_INGREDIENT';
export const ADD_INGREDIENTS = '[Shoping List] ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = '[Shoping List] UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = '[Shoping List] DELETE_INGREDIENT';
export const START_EDIT = '[Shoping List] START_EDIT';
export const STOP_EDIT = '[Shoping List] STOP_EDIT';
export const STORE_INGREDIENT = '[Shoping List] STORE_INGREDIENT';
export const STORE_SUCCESS = '[Shoping List] STORE_SUCCESS';
export const STORE_FAIL = '[Shoping List] STORE_FAIL';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class StoreIngredient implements Action {
  readonly type = STORE_INGREDIENT;
}

export class StoreSuccess implements Action {
  readonly type = STORE_SUCCESS;
}

export class StoreFail implements Action {
  readonly type = STORE_FAIL;
  constructor(public payload: string) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit
  | StoreIngredient
  | StoreSuccess
  | StoreFail;
