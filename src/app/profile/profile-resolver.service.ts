import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { take } from 'rxjs/operators';


import { Recipe } from '../recipes/recipe.model';

@Injectable({ providedIn: 'root' })
export class ProfileResolverService implements Resolve<{ payload: Recipe }> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    this.store.dispatch(
      new RecipeActions.FetchRecipe(route.paramMap.get('id'))
    );
    return this.actions$.pipe(ofType(RecipeActions.SET_RECIPE), take(1));
  }
}
