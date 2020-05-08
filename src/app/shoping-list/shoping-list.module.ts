import { NgModule } from '@angular/core';

import { ShopingListComponent } from './shoping-list.component';
import { ShopingEditComponent } from './shoping-edit/shoping-edit.component';
import { ShopingListRoutingModule } from './shoping-list-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ShopingListComponent, ShopingEditComponent],
  imports: [RouterModule, SharedModule, FormsModule, ShopingListRoutingModule],
})
export class ShopingListModule {}
