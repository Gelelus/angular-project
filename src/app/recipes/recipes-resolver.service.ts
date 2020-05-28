import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Recipe } from './recipe.model';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from './store/recipe.actions';
import * as RecipesSelectors from './store/recipe.selectors';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(
      take(1),
      select(RecipesSelectors.selectStateRecipes),
      switchMap((state) => {
        if (state.recipes.length === 0 || state.outChange) {
          this.store.dispatch(
            new RecipesActions.FetchRecipes({
              startItem: 0,
              limit: state.recipesOnPage,
            })
          );
          return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
          );
        } else {
          return of(state.recipes);
        }
      })
    );
  }
}
