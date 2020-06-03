import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';


import { AuthInterceptorService } from './auth-interceptor.service';
import * as fromApp from '../store/app.reducer';
import * as AuthSelectors from './store/auth.selectors';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

describe(`AuthHttpInterceptor`, () => {
  let store: MockStore;
  let httpMock: HttpTestingController;
  let user: MemoizedSelector<fromApp.AppState, User>;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore(),
        HttpClient,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true,
        },
      ],
    });

    store = TestBed.inject(MockStore);
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    user = store.overrideSelector(AuthSelectors.user, {
      token: 'token',
    } as User);
  });

  it('should add an Authorization header if user exist', () => {
    http.get(environment.DataBaseUrl + 'users').subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(`${environment.DataBaseUrl}users`);

    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe(
      'Bearer token'
    );
  });

  it("shouldn't add an Authorization header if user not exist", () => {
    user.setResult(null);
    http.get(environment.DataBaseUrl + 'users').subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(`${environment.DataBaseUrl}users`);

    expect(httpRequest.request.headers.has('Authorization')).toEqual(false);
  });
});
