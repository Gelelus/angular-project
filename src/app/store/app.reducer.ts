import * as fromShopingList from '../shoping-list/store/shoping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer'
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shopingList: fromShopingList.State;
    auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shopingList: fromShopingList.shopingListReducer,
  auth: fromAuth.authReducer
}