import { createSelector } from '@ngrx/store';
import { State } from './users.reducer';

import * as fromApp from '../../store/app.reducer';

export const selectStateUsers = (state: fromApp.AppState) => state.users;

export const error = createSelector(
  selectStateUsers,
  (usersState: State) => usersState.error
);
