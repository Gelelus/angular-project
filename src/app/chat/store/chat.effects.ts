import { Effect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, tap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { of, Observable, Observer } from 'rxjs';
import * as io from 'socket.io-client';

import * as fromApp from '../../store/app.reducer';
import * as ChatActions from './chat.actions';
import * as AuthSelectors from '../../auth/store/auth.selectors';
import { Message } from '../message.model';

const handleError = (errRes: any) => {
  console.log(errRes);

  return of(ChatActions.ioFail({ payload: errRes.error.error }));
};

@Injectable()
export class ChatEffects {
  private socket: SocketIOClient.Socket;

  @Effect()
  connectToServer = this.actions$.pipe(
    ofType(ChatActions.connectToServer),
    switchMap(() => {
      return this.store;
    }),
    select(AuthSelectors.user),
    take(1),
    tap((user) => {
        this.socket = io.connect(environment.DataBaseUrl, {
          query: { token: user.token },
        });    
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
      return Observable.create((observer: Observer<Message>) => {
        this.socket.on('new-message', (message: Message) => {
          observer.next(message);
        });
      });
    }),
    map((data: Message) => {
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


  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) {}
}
