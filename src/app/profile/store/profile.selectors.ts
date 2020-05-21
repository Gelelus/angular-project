import { createSelector } from '@ngrx/store';
import { State } from './profile.reducer';

import * as fromApp from '../../store/app.reducer';

export const selectStateProfile = (state: fromApp.AppState) => state.profile;

export const orders = createSelector(
  selectStateProfile,
  (ProfileState: State) => ProfileState.orders
);

export const recipes = createSelector(
  selectStateProfile,
  (ProfileState: State) => ProfileState.recipes
);

export const ordersLength = createSelector(
  selectStateProfile,
  (ProfileState: State) =>
    ProfileState.orders ? ProfileState.orders.length : 0
);
