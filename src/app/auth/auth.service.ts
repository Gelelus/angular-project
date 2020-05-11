import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseDate {
  kind: string;
  idToken: string;
  email: string;
  refredhToken: string;
  expiresIn: string;
  localId: string;
  registre?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTime: any;   //как вариант перенести все в эффекты 

  constructor(private store: Store<fromApp.AppState>) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTime = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
      this.tokenExpirationTime = null;
    }
  }
}
