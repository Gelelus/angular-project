import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }), //preloading modules
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
