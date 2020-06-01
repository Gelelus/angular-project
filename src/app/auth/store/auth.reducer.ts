import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate,
        action.payload.avatarImgUrl,
        action.payload.firstName,
        action.payload.secondName,
        action.payload.date,
        action.payload.phoneNumber
      );
      return {
        ...state,
        authError: null,
        user,
        loading: false,
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };

    case AuthActions.SIGN_START:
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };

    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
        authError: action.payload,
      };

      case AuthActions.UPDATE_AVATAR_SUCCESS:
        return {
          ...state,
          user: { ...state.user, avatarImgUrl: action.payload } as User,
        };
   

    default:
      return state;
  }
}
