import { createSelector } from '@ngrx/store';
import { State } from './auth.reducer';

import * as fromApp from '../../store/app.reducer';

export const selectStateAuth = (state: fromApp.AppState) => state.auth;

export const user = createSelector(selectStateAuth, (auth: State) => auth.user);
