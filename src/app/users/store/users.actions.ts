import { createAction, props } from '@ngrx/store';
import { SimpleUser } from '../simple-user.model';

const SET_USERS = '[Users] SET_USERS';
const SET_USER = '[Users] SET_USER';
const FETCH_USERS = '[Users] FETCH_USERS ';
const FETCH_USER = '[Users] FETCH_USER';
const CRUD_FAIL = '[Users] CRUD_FAIL';

export const setUsers = createAction(
  SET_USERS,
  props<{ payload: { users: SimpleUser[]; maxUsers: number } }>()
);
export const setUser = createAction(SET_USER, props<{ payload: SimpleUser }>());
export const fetchUsers = createAction(FETCH_USERS);
export const fetchUser = createAction(FETCH_USER, props<{ payload: string }>());
export const crudFail = createAction(CRUD_FAIL, props<{ payload: string }>());
