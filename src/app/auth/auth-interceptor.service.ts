import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';


import * as fromApp from '../store/app.reducer';
import * as  AuthSelectors from './store/auth.selectors'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    
    private store: Store<fromApp.AppState>
  ) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    return this.store.pipe(
      select(AuthSelectors.user),
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          setHeaders: { Authorization: 'Bearer ' + user.token },
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
