import { Action, createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.action';
import { SimpleUser } from '../simple-user.model';

export interface State {
  selectUser: SimpleUser;
  users: SimpleUser[];
  error: string;
}

export const initialState: State = {
  selectUser: null,
  users: [],
  error: null,
};

const reducer = createReducer(
  initialState,
  on(UsersActions.setUsers, (state, { payload }) => ({
    ...state,
    users: payload,
  })),
  on(UsersActions.setUser, (state, { payload }) => ({
    ...state,
    user: payload,
  })),
  on(UsersActions.crudFail, (state, { payload }) => ({
    ...state,
    error: payload,
  }))
);

export function usersReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
