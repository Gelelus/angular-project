import { createSelector } from '@ngrx/store';
import { State } from './chat.reducer';

import * as fromApp from '../../store/app.reducer';

export const selectStateChat = (state: fromApp.AppState) => state.chat;

export const error = createSelector(
  selectStateChat,
  (chatState: State) => chatState.error
);

export const messages = createSelector(
  selectStateChat,
  (chatState: State) => chatState.messages
);
