import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';

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
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseDate>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTPlqNWQKSvmId92XTKjSNOJWhLIdUtMc',
        {
          email: email,
          password: password,
          returnSecureToken: true, //for firebase
        }
      )
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
      .post<AuthResponseDate>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTPlqNWQKSvmId92XTKjSNOJWhLIdUtMc',
        {
          email: email,
          password: password,
          returnSecureToken: true, //for firebase
        }
      )
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
    console.log(userData)
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
        this.user.next(loadedUser);
      }
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(
    email: string,
    UserId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, UserId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('UserData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occured';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'this email exist already.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
