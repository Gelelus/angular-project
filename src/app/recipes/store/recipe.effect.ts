import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  switchMap,
  map,
  withLatestFrom,
  catchError,
  tap,
} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';

import * as RecipesActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipesSelectors from './recipe.selectors';

const handleError = (errRes: any) => {
  console.log(errRes);

  return of(new RecipesActions.CrudFail(errRes.error.error));
};

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap((actionData: RecipesActions.FetchRecipes) => {
      const url = window.location.href;
      let httpParams = null;
      if (url.includes('?')) {
        httpParams = new HttpParams({ fromString: url.split('?')[1] });
      }
      
      return this.http.get<{ recipes: Recipe[]; maxRecipes: number }>(
        environment.DataBaseUrl + 'recipes',
        {
          params: httpParams || {
            startItem: actionData.payload.startItem.toString(),
            limit: actionData.payload.limit.toString(),
          },
        }
      );
    }),
    map((postData) => {
      return {
        recipes: postData.recipes,
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
  addRecipeToDataBase = this.actions$.pipe(
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
      return new RecipesActions.AddRecipe(recipe);
    }),
    catchError((errorRes) => {
      return handleError(errorRes);
    })
  );

  @Effect()
  updateRecipeOnDataBase = this.actions$.pipe(
    ofType(RecipesActions.UPDATE_RECIPE_ON_DB),
    switchMap((actionData: RecipesActions.UpdateRecipeOnDataBase) => {
      let postData: any;
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
    withLatestFrom(this.store.pipe(select(RecipesSelectors.recipes))),
    map(([recipeNew, recipes]) => {
      const updatedRecipes = [...recipes].map((recipe) => {
        if (recipe._id === recipeNew._id) {
          return recipeNew;
        } else {
          return recipe;
        }
      });

      return new RecipesActions.UpdateRecipe(updatedRecipes);
    }),
    catchError((errorRes) => {
      return handleError(errorRes);
    })
  );

  @Effect()
  deleteRecipeOnDataBase = this.actions$.pipe(
    ofType(RecipesActions.DELETE_RECIPE_ON_DB),
    switchMap((actionData: RecipesActions.DeleteRecipeOnDataBase) => {
      return this.http.delete<{ id: string }>(
        environment.DataBaseUrl + `recipes/${actionData.payload}`
      );
    }),
    map((recipeId) => {
      return new RecipesActions.DeleteRecipe(recipeId.id);
    }),
    catchError((errorRes) => {
      return handleError(errorRes);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
