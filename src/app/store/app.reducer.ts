import { ActionReducerMap } from '@ngrx/store';

import * as fromShopingList from '../shoping-list/store/shoping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipes/store/recipe.reducer';
import * as fromProfile from '../profile/store/profile.reducer';
import * as fromUsers from '../users/store/users.reducer'

export interface AppState {
  shopingList: fromShopingList.State;
  auth: fromAuth.State;
  recipes: fromRecipes.State;
  profile: fromProfile.State;
  users:fromUsers.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shopingList: fromShopingList.shopingListReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipes.recipeReducer,
  profile: fromProfile.profileReducer,
  users: fromUsers.usersReducer
};
