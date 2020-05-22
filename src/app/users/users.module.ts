import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';

@NgModule({
  declarations: [UsersComponent, UsersListComponent],
  imports: [RouterModule, UsersRoutingModule, SharedModule],
})
export class UsersModule {}
