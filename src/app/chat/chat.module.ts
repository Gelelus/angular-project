import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ChatComponent } from './chat.component';


@NgModule({
  declarations: [ChatComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: ChatComponent }]),
    SharedModule,
    FormsModule,
  ],
  providers: [],
})
export class ChatModule {}
