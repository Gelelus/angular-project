import { createAction, props } from '@ngrx/store';

const SEND_MESSAGE = '[Chat] SEND_MESSAGE';
const ADD_MESSAGE = '[Chat] ADD_MESSAGE';
const CONNECT_TO_SERVER = '[Chat] CONNECT_TO_SERVER';
const LISTEN_MESSAGE = '[Chat] LISTEN_MESSAGE';
const IO_FAIL = '[Chat] IO_MESSAGE';
const DISCONNECT_SERVER = '[Chat] DISCONNECT_SERVER'

export const sendMessage = createAction(
  SEND_MESSAGE,
  props<{ payload: string }>()
);
export const addMessage = createAction(
  ADD_MESSAGE,
  props<{ payload: string }>()
);
export const listenMessage = createAction(LISTEN_MESSAGE);
export const connectToServer = createAction(CONNECT_TO_SERVER);
export const disconnectServer = createAction(DISCONNECT_SERVER);
export const ioFail = createAction(IO_FAIL, props<{ payload: string }>());
