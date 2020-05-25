import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as ChatSelectors from './store/chat.selectors';
import * as ChatActions from './store/chat.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  message = '';
  messagesObs = this.store.pipe(select(ChatSelectors.messages));

  constructor(private store: Store<fromApp.AppState>) {}

  sendMessage() {
    this.store.dispatch(ChatActions.sendMessage({ payload: this.message }));
    this.message = '';
  }

  ngOnInit() {
    this.store.dispatch(ChatActions.connectToServer());
  }

  ngOnDestroy() {
    this.store.dispatch(ChatActions.disconnectServer());
  }
}
