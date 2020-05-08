import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopingListComponent } from './shoping-list.component';

const routes = [{ path: 'shopping-list', component: ShopingListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopingListRoutingModule {}
