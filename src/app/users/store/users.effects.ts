import { Effect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';

import * as UsersActions from './users.actions';
import { SimpleUser } from '../simple-user.model';

const handleError = (errRes: any) => {
  console.log(errRes);

  return of(UsersActions.crudFail({ payload: errRes.error.error }));
};

@Injectable()
export class UsersEffects {
  @Effect()
  fetchUsers = this.actions$.pipe(
    ofType(UsersActions.fetchUsers),
    switchMap(() => {
      const url = window.location.href;
      let httpParams: HttpParams = null;
      if (url.includes('?')) {
        httpParams = new HttpParams({ fromString: url.split('?')[1] });
       
      }
      return this.http.get<{ users: SimpleUser[]; maxUsers: number }>(
        environment.DataBaseUrl + 'users',
        {
          params: httpParams,
        }
      );
    }),
    map((data) => {
      return UsersActions.setUsers({ payload: data });
    }),
    catchError((errorRes) => {
      return handleError(errorRes);
    })
  );

  @Effect()
  fetchUser = this.actions$.pipe(
    ofType(UsersActions.fetchUser),
    switchMap((actionData) => {
      return this.http.get<SimpleUser>(
        environment.DataBaseUrl + 'users/' + actionData.payload
      );
    }),
    map((data) => {
      return UsersActions.setUser({ payload: data });
    }),
    catchError((errorRes) => {
      return handleError(errorRes);
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
