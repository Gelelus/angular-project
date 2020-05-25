import * as io from 'socket.io-client';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';

export class ChatService {
  private url = environment.DataBaseUrl;
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io(this.url);
  }

  public sendMessage(message: string) {
    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
    return Observable.create((observer: Observer<string>) => {
      this.socket.on('new-message', (message: string) => {
        console.log(message);
        observer.next(message);
      });
    });
  };
}
