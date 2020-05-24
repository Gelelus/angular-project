import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from './chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  message = '';
  messages: string[] = [];
  sub: Subscription;

  constructor(private chatService: ChatService) {}

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
 
  ngOnInit() {
    this.sub = this.chatService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
