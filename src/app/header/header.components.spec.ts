import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { HeaderComponent } from './header.component';
import * as fromApp from '../store/app.reducer';
import * as AuthSelectors from '../auth/store/auth.selectors';
import { SharedModule } from '../shared/shared.module';
import { environment } from 'src/environments/environment';

describe('Header Component', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let mockStore: MockStore;
  let mockImageAndAuthSelector: MemoizedSelector<
    fromApp.AppState,
    { auth: boolean; avatarImgUrl: string }
  >;
  const queryImg = () => fixture.debugElement.query(By.css('img'));
  const queryAuth = () => fixture.debugElement.queryAll(By.css('.auth'));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
      declarations: [HeaderComponent],
      imports: [SharedModule],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    mockStore = TestBed.inject(MockStore);
    mockImageAndAuthSelector = mockStore.overrideSelector(
      AuthSelectors.imageAndAuth,
      { auth: true, avatarImgUrl: 'string' }
    );
    fixture.detectChanges();
  });

  it('should create the header', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should display 5 elements with class auth when auth is true', () => {
    expect(queryAuth().length).toBe(5);
  });

  it('should use img src from store', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(queryImg().nativeElement.src).toBe(
      environment.DataBaseUrl + app.userImgUrl
    );
  });

  it('should display 1 element with class auth when auth is false', () => {
    mockImageAndAuthSelector.setResult({ auth: false, avatarImgUrl: 'string' });
    mockStore.refreshState();
    fixture.detectChanges();
    expect(queryAuth().length).toBe(1);
  });

  
});
