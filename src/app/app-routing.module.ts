import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () =>
      import('src/app/recipes/recipes.module').then((m) => m.RecipesModule),
  },

  {
    path: 'shopping-list',
    loadChildren: () =>
      import('src/app/shoping-list/shoping-list.module').then(
        (m) => m.ShopingListModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('src/app/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('src/app/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'chat',
    loadChildren: () =>
      import('src/app/chat/chat.module').then((m) => m.ChatModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }), //preloading modules
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
