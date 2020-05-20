import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from '../auth/auth.guard';
import { ProfileComponent } from './profile.component';
import { SettingComponent } from './setting/setting.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserRecipesComponent } from './user-recipes/user-recipes.component';


const routes: Routes = [
    {
      path: '',
      component: ProfileComponent,
      canActivate: [AuthGuard],
      children: [
        { path: 'setting', component: SettingComponent },
        { path: 'orders', component: UserOrdersComponent },
        { path: 'recipes', component: UserRecipesComponent },
      ],
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
