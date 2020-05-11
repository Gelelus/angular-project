import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';

import { User } from './user.model';
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
  // user = new BehaviorSubject<User>(null);
  private tokenExpirationTime: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseDate>(environment.DataBaseUrl + 'users', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseDate>(environment.DataBaseUrl + 'users/login', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('UserData'));

    if (!userData) {
      return;
    } else {
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        // this.user.next(loadedUser);
        this.store.dispatch(
          new AuthActions.Login({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
          })
        );
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    }
  }

  logout() {
    // this.user.next(null);
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('UserData');
    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTime = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    UserId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    // this.user.next(user);
    const user = new User(email, UserId, token, expirationDate)
    this.store.dispatch(
      new AuthActions.Login({
        email: email,
        userId: UserId,
        token: token,
        expirationDate: expirationDate,
      })
    );

    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('UserData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    //незабыть апнуть
    //let errorMessage = 'An error occured';

    return throwError(errorRes.message);
  }
}
