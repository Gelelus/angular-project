import { Action } from '@ngrx/store';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Order } from '../user-orders/order.model';

export const ADD_ORDERS = '[Profile] ADD_ORDERS ';
export const ADD_USER_RECIPES = '[Profile] ADD_USER_RECIPES';
export const FETCH_ORDERS = '[Profile] FETCH_ORDERS';
export const CRUD_FAIL = '[Profile] CRUD_FAIL'

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

export class CrudFail implements Action {
  readonly type = CRUD_FAIL;
  constructor(public payload: string) {}
}

export type ProfileActions = AddOrders | AddUserRecipes | FetchOrders | CrudFail;
