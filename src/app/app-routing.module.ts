import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
  {
    path: 'shopping-list',
    loadChildren: './shoping-list/shoping-list.module#ShopingListModule',
  },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
];

@NgModule({
  imports: [ 
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }), //preloading modules
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
