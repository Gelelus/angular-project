import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
      const url = window.location.href;
      let httpParams = new HttpParams()
        .set('startItem', '0')
        .append('limit', '5');
      if (url.includes('?')) {
        httpParams = new HttpParams({ fromString: url.split('?')[1] });
      }
      return this.http.get<{ recipes: Recipe[]; maxRecipes: number }>(
        environment.DataBaseUrl + 'recipes',
        {
          params: httpParams,
        }
      );
    }),
    map((postData) => {
      return {
        recipes: postData.recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        }),
        maxRecipes: postData.maxRecipes,
      };
    }),
    map((data) => {
      return new RecipesActions.SetRecipes(data);
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
      const postData = new FormData();
      postData.append('description', actionData.payload.description);
      postData.append('image', actionData.payload.image, 'image');
      postData.append(
        'ingredients',
        JSON.stringify(actionData.payload.ingredients)
      );
      postData.append('name', actionData.payload.name);

      return this.http.post<Recipe>(
        environment.DataBaseUrl + 'recipes',
        postData
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
      let postData;
      if (actionData.payload.image) {
        postData = new FormData();
        postData.append('description', actionData.payload.description);
        postData.append('image', actionData.payload.image, 'image');
        postData.append(
          'ingredients',
          JSON.stringify(actionData.payload.ingredients)
        );
        postData.append('name', actionData.payload.name);
        postData.append('_id', actionData.payload._id);
      } else {
        postData = {
          _id: actionData.payload._id,
          name: actionData.payload.name,
          description: actionData.payload.description,
          ingredients: actionData.payload.ingredients,
        };
      }
      return this.http.put<Recipe>(
        environment.DataBaseUrl + 'recipes',
        postData
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
