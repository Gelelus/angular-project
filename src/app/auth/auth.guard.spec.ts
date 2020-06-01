import { TestBed } from '@angular/core/testing';
import { MemoizedSelector } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import * as fromApp from '../store/app.reducer';
import * as AuthSelectors from './store/auth.selectors';
import { User } from './user.model';

describe('Auth Guard', () => {
  let guard: AuthGuard;
  let store: MockStore;
  let router: Router;
  let user: MemoizedSelector<fromApp.AppState, User>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, provideMockStore()],
      imports: [RouterTestingModule],
    });

    store = TestBed.inject(MockStore);
    guard = TestBed.inject(AuthGuard);
    router = TestBed.get(Router);
    user = store.overrideSelector(AuthSelectors.user, null);
    
  });

  it('should return false if the user not exist', () => {
    const expected = cold('(a|)', { a: router.createUrlTree(['/auth']) });

    expect(guard.canActivate()).toBeObservable(expected);
  });

  it('should return true if the user exist', () => {
    const expected = cold('(a|)', { a: true });

    user.setResult({} as User);

    expect(guard.canActivate()).toBeObservable(expected);
  });
});
