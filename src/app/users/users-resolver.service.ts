import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as fromApp from '../store/app.reducer';
import * as UsersActions from './store/users.actions';
import { take } from 'rxjs/operators';

import { SimpleUser } from './simple-user.model';

@Injectable({ providedIn: 'root' })
export class UsersResolverService implements Resolve<{ payload: SimpleUser }> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    this.store.dispatch(
      UsersActions.fetchUser({ payload: route.paramMap.get('id') })
    );
    return this.actions$.pipe(ofType(UsersActions.setUser), take(1));
  }
}
