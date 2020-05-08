import { NgModule } from '@angular/core';

import { ShopingListComponent } from './shoping-list.component';
import { ShopingEditComponent } from './shoping-edit/shoping-edit.component';
import { ShopingListRoutingModule } from './shoping-list-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ShopingListComponent, ShopingEditComponent],
  imports: [RouterModule, CommonModule, FormsModule, ShopingListRoutingModule],
})
export class ShopingListModule {}
