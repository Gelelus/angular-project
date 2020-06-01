import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
  maxRecipes: number;
  recipesOnPage: number;
  crudError: string;
  outChange: boolean;
}

const initialState: State = {
  recipes: [],
  maxRecipes: null,
  recipesOnPage: 7,
  crudError: null,
  outChange: false,
};

export function recipeReducer(
  state = initialState,
  action: RecipesActions.RecipesActions
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload.recipes].slice(0, state.recipesOnPage),
        outChange: false,
        maxRecipes: action.payload.maxRecipes,
      };

    case RecipesActions.SET_RECIPE:
      return {
        ...state,
        outChange: true,
        recipes: [...state.recipes, action.payload],
      };

    case RecipesActions.ADD_RECIPE:
      const recipes =
        state.recipes.length < state.recipesOnPage
          ? [...state.recipes, action.payload]
          : state.recipes;
      return {
        ...state,
        maxRecipes: state.maxRecipes + 1,
        recipes: recipes,
      };

    case RecipesActions.UPDATE_RECIPE:
      return { ...state, recipes: action.payload };

    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        maxRecipes: state.maxRecipes - 1,
        recipes: state.recipes.filter((res) => res._id !== action.payload),
      };

    case RecipesActions.CRUD_FAIL:
      return {
        ...state,
        crudError: action.payload,
      };

    default:
      return state;
  }
}
