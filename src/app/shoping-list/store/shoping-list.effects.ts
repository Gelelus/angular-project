import { Effect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { withLatestFrom, switchMap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as ShopingListActions from './shoping-list.actions';
import * as ShopingListSelectors from './shoping-list.selectors';
import { of } from 'rxjs';

const handleError = (errRes: any) => {
  console.log(errRes);

  return of(new ShopingListActions.StoreFail(errRes.error.error));
};

@Injectable()
export class ShopingListEffects {
  @Effect()
  storeOrder = this.actions$.pipe(
    ofType(ShopingListActions.STORE_INGREDIENT),
    withLatestFrom(this.store.pipe(select(ShopingListSelectors.ingredients))),
    switchMap(([actionData, ingredients]) => {
      return this.http.post(environment.DataBaseUrl + 'orders', ingredients);
    }),
    map(() => {
      return new ShopingListActions.StoreSuccess();
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
