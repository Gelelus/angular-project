import { Action, createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { SimpleUser } from '../simple-user.model';

export interface State {
  selectedUser: SimpleUser;
  users: SimpleUser[];
  error: string;
}

export const initialState: State = {
  selectedUser: null,
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
