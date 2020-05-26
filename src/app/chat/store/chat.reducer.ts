import { Action, createReducer, on } from '@ngrx/store';

import * as ChatActions from './chat.actions';
import { Message } from '../message.model';

export interface State {
  messages: Message[];
  error: string;
}

export const initialState: State = {
  messages: [],
  error: null,
};

const reducer = createReducer(
  initialState,
  on(ChatActions.addMessage, (state, { payload }) => ({
    ...state,
    messages: [...state.messages, payload],
  })),
 
  on(ChatActions.ioFail, (state, { payload }) => ({
    ...state,
    error: payload,
  }))
);

export function chatReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
