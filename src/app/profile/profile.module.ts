import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { SettingComponent } from './setting/setting.component';
import { ProfileRoutingModule } from './profile-routing.module';


@NgModule({
  declarations: [ProfileComponent, SettingComponent],
  imports: [
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
  ],
})
export class ProfileModule {}
