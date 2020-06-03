import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormsModule } from '@angular/forms';

import { ChatComponent } from './chat.component';
import * as fromApp from '../store/app.reducer';
import * as ChatSelectors from './store/chat.selectors';
import { SharedModule } from '../shared/shared.module';
import { Message } from './message.model';

describe('Auth Component', () => {
  let fixture: ComponentFixture<ChatComponent>;
  let mockStore: MockStore;
  let mockMessagesSelector: MemoizedSelector<fromApp.AppState, Message[]>;
  let app: ChatComponent;
  const queryMessages = () => fixture.debugElement.queryAll(By.css('.message-container div'));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
      declarations: [ChatComponent],
      imports: [SharedModule, FormsModule],
    });
    fixture = TestBed.createComponent(ChatComponent);
    mockStore = TestBed.inject(MockStore);
    app = fixture.debugElement.componentInstance;
    mockMessagesSelector = mockStore.overrideSelector(ChatSelectors.messages, [
      { message: 'test1', email: 'test1', date: 'test1', img: 'test1' },
      { message: 'test2', email: 'test2', date: 'test2', img: 'test2' }
    ]);
    fixture.detectChanges();
  });

  it('should create the chat component', () => {
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it("should display messages from store", () => {
    expect(queryMessages().length).toBe(2);
  });
  
});
