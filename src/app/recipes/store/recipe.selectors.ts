import { createSelector } from '@ngrx/store';
import { State } from './recipe.reducer';

import * as fromApp from '../../store/app.reducer';

export const selectStateRecipes = (state: fromApp.AppState) => state.recipes;

export const findRecipeById = createSelector(
  selectStateRecipes,
  (recipe: State, props: { id: string }) =>
    recipe.recipes.find((recipe) => recipe._id === props.id)
);

export const recipes = createSelector(
  selectStateRecipes,
  (recipe: State) => recipe.recipes
);

export const error = createSelector(
  selectStateRecipes,
  (recipe: State) => recipe.crudError
);

export const limit = createSelector(
  selectStateRecipes,
  (recipe: State) => recipe.recipesOnPage
)

export const recipesParms = createSelector(
  selectStateRecipes,
  (recipeState: State) => {
    return {
      recipes: recipeState.recipes,
      maxRecipes: recipeState.maxRecipes,
      recipesOnPage: recipeState.recipesOnPage,
    };
  }
);
