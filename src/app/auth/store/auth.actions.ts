import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] LOGIN_START';
export const SIGN_START = '[Auth] SIGN_START';
export const AUTHENTICATE_SUCCESS = '[Auth] AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAIL = '[Auth] AUTHENTICATE_FAIL';
export const AUTO_LOGIN = '[Auth] AUTO_LOGIN';
export const LOGOUT = '[Auth] LOGOUT';
export const UPDATE_AUTH_DATA = '[Auth] UPDATE_AUTH_DATA';

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
      avatarImgUrl: string;
      firstName: string;
      secondName: string;
      date: string;
      phoneNumber: string;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(
    public payload: {
      email: string;
      password: string;
    }
  ) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {}
}

export class SignStart implements Action {
  readonly type = SIGN_START;

  constructor(
    public payload: {
      email: string;
      password: string;
    }
  ) {}
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class UpdateAuthData implements Action {
  readonly type = UPDATE_AUTH_DATA;
  constructor(
    public payload: {
      firstName: string;
      passwords: { password: string; secondPassword: string };
      phoneNumber: string;
      secondName: string;
    }
  ) {}
}

export type AuthActions =
  | AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthenticateFail
  | SignStart
  | AutoLogin
  | UpdateAuthData;
