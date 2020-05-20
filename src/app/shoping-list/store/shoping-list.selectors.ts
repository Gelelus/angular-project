import { createSelector } from '@ngrx/store';
import { State } from './shoping-list.reducer';

import * as fromApp from '../../store/app.reducer';

export const selectStateShopingList = (state: fromApp.AppState) => state.shopingList;

export const ingredients = createSelector(
  selectStateShopingList,
  (ShopingListState: State) => ShopingListState.ingredients
);


