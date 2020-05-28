import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ChatComponent } from './chat.component';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  declarations: [ChatComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: ChatComponent, canActivate: [AuthGuard] },
    ]),
    SharedModule,
    FormsModule,
  ],
  providers: [],
})
export class ChatModule {}
