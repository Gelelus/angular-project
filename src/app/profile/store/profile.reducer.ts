import * as ProfileActions from './profile.actions';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from 'src/app/recipes/recipe.model';

export interface State {
  orders: Ingredient[];
  recipes: Recipe[];
}

const initialState: State = {
  orders: null,
  recipes: null,
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

    default:
      return state;
  }
}
