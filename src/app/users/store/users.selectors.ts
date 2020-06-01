import { createSelector } from '@ngrx/store';
import { State } from './users.reducer';

import * as fromApp from '../../store/app.reducer';

export const selectStateUsers = (state: fromApp.AppState) => state.users;

export const error = createSelector(
  selectStateUsers,
  (usersState: State) => usersState.error
);

export const users = createSelector(
  selectStateUsers,
  (usersState: State) => usersState.users
);

export const usersParams = createSelector(
  selectStateUsers,
  (usersState: State) => ({
    users: usersState.users,
    maxUsers: usersState.maxUsers,
    usersOnPage: usersState.usersOnPage,
  })
);

export const user = createSelector(
  selectStateUsers,
  (usersState: State) => usersState.selectedUser
);
