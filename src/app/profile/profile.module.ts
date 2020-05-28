import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { SettingComponent } from './setting/setting.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { UserRecipesComponent } from './user-recipes/user-recipes.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { OrderItemComponent } from './user-orders/order-item/order-item.component';
import { RecipesModule } from '../recipes/recipes.module';

@NgModule({
  declarations: [
    ProfileComponent,
    SettingComponent,
    UserRecipesComponent,
    UserOrdersComponent,
    OrderItemComponent,
  ],
  imports: [
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    RecipesModule
  ],
})
export class ProfileModule {}
