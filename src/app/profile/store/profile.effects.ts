import { Effect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as ProfileActions from './profile.actions';
import { Order } from '../user-orders/order.model';



const handleError = (errRes: any) => {
  console.log(errRes);
  return of(new ProfileActions.CrudFail(errRes.error.error));
};

@Injectable()
export class ProfileEffects {
  @Effect()
  fetchOrders = this.actions$.pipe(
    ofType(ProfileActions.FETCH_ORDERS),
    switchMap(() => {
      return this.http.get<Order[]>(environment.DataBaseUrl + 'users/get/orders');
    }),
    map((orders) => {
      return new ProfileActions.AddOrders(orders);
    }),
    catchError((errorRes) => {
      return handleError(errorRes);
    })
  );

  @Effect()
  deleteOrder = this.actions$.pipe(
    ofType(ProfileActions.DELETE_ORDER_ON_DB),
    switchMap((ActionData: ProfileActions.DeleteOrderOnDb)=>{
      return this.http.delete<{ id: string }>(environment.DataBaseUrl + 'orders/' + ActionData.payload)
    }),
    map((orderId) => {
      return new ProfileActions.DeleteOrder(orderId.id);
    }),
    catchError((errorRes) => {
      return handleError(errorRes);
    })
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
