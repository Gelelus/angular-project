import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from '../auth/auth.guard';
import { ProfileComponent } from './profile.component';
import { SettingComponent } from './setting/setting.component';


const routes: Routes = [
    {
      path: '',
      component: ProfileComponent,
      canActivate: [AuthGuard],
      children: [
        { path: '', component: SettingComponent },
        { path: 'setting', component: SettingComponent },
      ],
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
