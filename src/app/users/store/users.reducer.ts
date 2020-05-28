import { Action, createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { SimpleUser } from '../simple-user.model';

export interface State {
  selectedUser: SimpleUser;
  users: SimpleUser[];
  usersOnPage: number;
  maxUsers: number;
  error: string;
}

export const initialState: State = {
  selectedUser: null,
  users: [],
  error: null,
  maxUsers:null,
  usersOnPage: 5,
};

const reducer = createReducer(
  initialState,
  on(UsersActions.setUsers, (state, { payload }) => ({
    ...state,
    users: payload.users,
    maxUsers: payload.maxUsers
  })),
  on(UsersActions.setUser, (state, { payload }) => ({
    ...state,
    selectedUser: payload,
  })),
  on(UsersActions.crudFail, (state, { payload }) => ({
    ...state,
    error: payload,
  }))
);

export function usersReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
