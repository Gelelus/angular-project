import * as ProfileActions from './profile.actions';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Order } from '../user-orders/order.model';

export interface State {
  orders: Order[];
  recipes: Recipe[];
  error: string
}

const initialState: State = {
  orders: null,
  recipes: null,
  error: null
};

export function profileReducer(
  state = initialState,
  action: ProfileActions.ProfileActions
) {
  switch (action.type) {
    case ProfileActions.ADD_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    case ProfileActions.ADD_USER_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };

    case ProfileActions.CRUD_FAIL:
    return {
      ...state,
      error: action.payload,
    };

    default:
      return state;
  }
}
