import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import * as RecipesActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import { Store, select } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(environment.DataBaseUrl + 'recipes');
    }),
    map((recipes) => {
      return recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        };
      });
    }),
    map((recipes) => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.pipe(select('recipes'))),
    switchMap(([actionData, recipesState]) => {
      return this.http.put(
        environment.DataBaseUrl + 'recipes/update',
        recipesState.recipes
      );
    })
  );

  @Effect()
  AddRecipeToDataBase = this.actions$.pipe(
    ofType(RecipesActions.ADD_RECIPE_TO_DB),
    switchMap((actionData: RecipesActions.AddRecipeToDataBase) => {
      return this.http.post<Recipe>(
        environment.DataBaseUrl + 'recipes',
        actionData.payload
      );
    }),
    map((recipe) => {
      console.log(recipe); //добавить handle errors
      return new RecipesActions.AddRecipe(recipe);
    })
  );

  @Effect()
  UpdateRecipeOnDataBase = this.actions$.pipe(
    ofType(RecipesActions.UPDATE_RECIPE_ON_DB),
    switchMap((actionData: RecipesActions.UpdateRecipeOnDataBase) => {
      return this.http.put<Recipe>(
        environment.DataBaseUrl + 'recipes',
        actionData.payload
      );
    }),
    map((recipe) => {
      console.log(recipe); //добавить handle errors
      return new RecipesActions.UpdateRecipe(recipe);
    })
  );

  @Effect()
  DeleteRecipeOnDataBase = this.actions$.pipe(
    ofType(RecipesActions.DELETE_RECIPE_ON_DB),
    switchMap((actionData: RecipesActions.DeleteRecipeOnDataBase) => {
      return this.http.delete<{ id: string }>(
        environment.DataBaseUrl + `recipes/${actionData.payload}`
      );
    }),
    map((recipeId) => {
      console.log(recipeId); //добавить handle errors
      return new RecipesActions.DeleteRecipe(recipeId.id);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
