import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import * as fromApp from '../store/app.reducer';
import * as AuthSelectors from '../auth/store/auth.selectors';
import { SharedModule } from '../shared/shared.module';

describe('Auth Component', () => {
  let fixture: ComponentFixture<AuthComponent>;
  let mockStore: MockStore;
  let mockAuthParamsSelector: MemoizedSelector<
    fromApp.AppState,
    { isLoading: boolean; error: string }
  >;
  let app: AuthComponent;
  const queryError = () => fixture.debugElement.query(By.css('.alert p'));
  const querySpinner = () =>
    fixture.debugElement.query(By.css('.spinner-container'));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
      declarations: [AuthComponent],
      imports: [SharedModule, FormsModule],
    });
    fixture = TestBed.createComponent(AuthComponent);
    mockStore = TestBed.inject(MockStore);
    app = fixture.debugElement.componentInstance;
    mockAuthParamsSelector = mockStore.overrideSelector(
      AuthSelectors.authParams,
      { isLoading: false, error: null }
    );
    fixture.detectChanges();
  });

  it('should create the auth component', () => {
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it("shouldn't display error message if no error", () => {
    expect(queryError()).toBe(null);
  });

  it("shouldn't display spinner if isLoading equal false", () => {
    expect(querySpinner()).toBe(null);
  });

  it('should display error message if error exist', () => {
    mockAuthParamsSelector.setResult({ isLoading: false, error: 'error' });
    mockStore.refreshState();
    fixture.detectChanges();
    expect(queryError().nativeElement.textContent).toBe('error');
  });

  it('should display spinner if isLoading equal true', () => {
    mockAuthParamsSelector.setResult({ isLoading: true, error: null });
    mockStore.refreshState();
    fixture.detectChanges();
    expect(querySpinner()).toBeTruthy();
  });

  it('onSwitchMode method should switch isLoginMode', () => {
    fixture.detectChanges();
    const initialMode = app.isLoginMode;
    app.onSwitchMode();
    expect(app.isLoginMode).toEqual(!initialMode);
    app.onSwitchMode();
    expect(app.isLoginMode).toEqual(initialMode);
  });
});
