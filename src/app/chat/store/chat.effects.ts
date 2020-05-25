import { Effect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { of, Observable, Observer } from 'rxjs';
import * as io from 'socket.io-client';

import * as ChatActions from './chat.actions';

const handleError = (errRes: any) => {
  console.log(errRes);

  return of(ChatActions.ioFail({ payload: errRes.error.error }));
};

@Injectable()
export class ChatEffects {
  private socket: SocketIOClient.Socket;
  private url = environment.DataBaseUrl;

  @Effect()
  connectToServer = this.actions$.pipe(
    ofType(ChatActions.connectToServer),
    tap(() => {
      this.socket = io.connect(this.url);
    }),
    map(() => {
      return ChatActions.listenMessage();
    }),
    catchError((errorRes) => {
      return handleError(errorRes);
    })
  );

  @Effect()
  listenMessage = this.actions$.pipe(
    ofType(ChatActions.listenMessage),
    switchMap(() => {
      return Observable.create((observer: Observer<string>) => {
        this.socket.on('new-message', (message: string) => {
          console.log(message);
          observer.next(message);
        });
      });
    }),
    map((data: string) => {
      return ChatActions.addMessage({ payload: data });
    }),
    catchError((errorRes) => {
      return handleError(errorRes);
    })
  );

  @Effect({ dispatch: false })
  sendMessageToServer = this.actions$.pipe(
    ofType(ChatActions.sendMessage),
    tap((data) => {
      this.socket.emit('new-message', data.payload);
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
