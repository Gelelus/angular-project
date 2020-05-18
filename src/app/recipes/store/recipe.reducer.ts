import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
  maxRecipes: number;
}

const initialState: State = {
  recipes: [],
  maxRecipes: null
};

export function recipeReducer(
  state = initialState,
  action: RecipesActions.RecipesActions
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload.recipes],
        maxRecipes: action.payload.maxRecipes
      };

    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        maxRecipes: state.maxRecipes+1,
        recipes: [...state.recipes, action.payload],
      };

    case RecipesActions.UPDATE_RECIPE:
      const updatedRecipes = [...state.recipes].map((recipe) => {
        if (recipe._id === action.payload._id) {
          return action.payload;
        } else {
          return recipe;
        }
      });
      return { ...state, recipes: updatedRecipes };

    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        maxRecipes: state.maxRecipes-1,
        recipes: state.recipes.filter((res) => res._id !== action.payload),
      };

    default:
      return state;
  }
}
