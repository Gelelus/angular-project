import { Action } from '@ngrx/store';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Order } from '../user-orders/order.model';

export const ADD_ORDERS = '[Profile] ADD_ORDERS ';
export const ADD_USER_RECIPES = '[Profile] ADD_USER_RECIPES';
export const FETCH_ORDERS = '[Profile] FETCH_ORDERS';
export const DELETE_ORDER = '[Profile] DELETE_ORDER';
export const DELETE_ORDER_ON_DB = '[Profile] DELETE_ORDER_ON_DB';
export const CRUD_FAIL = '[Profile] CRUD_FAIL';
export const FETCH_RECIPES = '[Profile] FETCH_RECIPES';

export class AddOrders implements Action {
  readonly type = ADD_ORDERS;
  constructor(public payload: Order[]) {}
}

export class AddUserRecipes implements Action {
  readonly type = ADD_USER_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class FetchOrders implements Action {
  readonly type = FETCH_ORDERS;
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class CrudFail implements Action {
  readonly type = CRUD_FAIL;
  constructor(public payload: string) {}
}

export class DeleteOrder implements Action {
  readonly type = DELETE_ORDER;
  constructor(public payload: string) {}
}

export class DeleteOrderOnDb implements Action {
  readonly type = DELETE_ORDER_ON_DB;
  constructor(public payload: string) {}
}

export type ProfileActions =
  | AddOrders
  | AddUserRecipes
  | FetchOrders
  | CrudFail
  | DeleteOrder
  | DeleteOrderOnDb
  | FetchRecipes;
