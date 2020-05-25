import { Action, createReducer, on } from '@ngrx/store';
import * as ChatActions from './chat.actions';

export interface State {
  messages: string[];
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
