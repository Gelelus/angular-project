import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersItemComponent } from './users-list/users-item/users-item.component';

@NgModule({
  declarations: [UsersComponent, UsersListComponent, UserDetailComponent, UsersItemComponent],
  imports: [RouterModule, UsersRoutingModule, SharedModule],
})
export class UsersModule {}
