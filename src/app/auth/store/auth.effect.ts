import { Actions, ofType, Effect } from '@ngrx/effects';
import {
  switchMap,
  catchError,
  map,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import { Store, select } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseDate {
  idToken: string;
  email: string;
  expiresIn: string;
  localId: string;
  avatarUrl: string;
  date: string;
  firstName: string;
  secondName: string;
  phoneNumber: string;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string,
  avatarUrl: string,
  firstName: string,
  secondName: string,
  date: string,
  phoneNumber: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(
    email,
    userId,
    token,
    expirationDate,
    avatarUrl,
    firstName,
    secondName,
    date,
    phoneNumber
  );
  localStorage.setItem('UserData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
    redirect: true,
    avatarImgUrl: avatarUrl,
    firstName: firstName,
    secondName: secondName,
    date: date,
    phoneNumber: phoneNumber,
  });
};

const handleError = (errRes: any) => {
  console.log(errRes);

  return of(new AuthActions.AuthenticateFail(errRes.error.error));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGN_START),
    switchMap((signupAction: AuthActions.SignStart) => {
      return this.http
        .post<AuthResponseDate>(environment.DataBaseUrl + 'users', {
          email: signupAction.payload.email,
          password: signupAction.payload.password,
        })
        .pipe(
          tap((resData) => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map((resData) => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken,
              resData.avatarUrl,
              resData.firstName,
              resData.secondName,
              resData.date,
              resData.phoneNumber
            );
          }),
          catchError((errorRes) => {
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseDate>(environment.DataBaseUrl + 'users/login', {
          email: authData.payload.email,
          password: authData.payload.password,
        })
        .pipe(
          tap((resData) => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map((resData) => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken,
              resData.avatarUrl,
              resData.firstName,
              resData.secondName,
              resData.date,
              resData.phoneNumber
            );
          }),
          catchError((errorRes) => {
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect()
  authUpdateData = this.actions$.pipe(
    ofType(AuthActions.UPDATE_AUTH_DATA),
    switchMap((authData: AuthActions.UpdateAuthData) => {
      return this.http
        .put<AuthResponseDate>(
          environment.DataBaseUrl + 'users',
          authData.payload
        )
        .pipe(
          tap((resData) => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map((resData) => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken,
              resData.avatarUrl,
              resData.firstName,
              resData.secondName,
              resData.date,
              resData.phoneNumber
            );
          }),
          catchError((errorRes) => {
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect()
  updateImg = this.actions$.pipe(
    ofType(AuthActions.UPDATE_AUTH_DATA_AVATAR),
    switchMap((authDataImg: AuthActions.UpdateAuthDataAvatar) => {
      const postData = new FormData();
      postData.append('image', authDataImg.payload, 'image');

      return this.http
        .put<{ imgUrl: string }>(
          environment.DataBaseUrl + 'users/avatar',
          postData
        )
        .pipe(
          withLatestFrom(this.store.pipe(select(AuthSelectors.user))),
          map(([resData, user]) => {
            const Updateuser = { ...user, avatarImgUrl: resData.imgUrl };
            localStorage.setItem('UserData', JSON.stringify(Updateuser));
            return new AuthActions.UpdateAvatarSuccess(resData.imgUrl);
          }),
          catchError((errorRes) => {
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
        avatarImgUrl: string;
        firstName: string;
        secondName: string;
        date: string;
        phoneNumber: string;
      } = JSON.parse(localStorage.getItem('UserData'));

      if (!userData) {
        return { type: 'none' };
      } else {
        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate),
          userData.avatarImgUrl,
          userData.firstName,
          userData.secondName,
          userData.date,
          userData.phoneNumber
        );

        if (loadedUser.token) {
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);

          return new AuthActions.AuthenticateSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
            redirect: false,
            avatarImgUrl: loadedUser.avatarImgUrl,
            firstName: loadedUser.firstName,
            secondName: loadedUser.secondName,
            date: loadedUser.date,
            phoneNumber: loadedUser.phoneNumber,
          });
        }
        return { type: 'none' };
      }
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('UserData');
      this.router.navigate(['/auth']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}
}
