import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import * as AuthSelectors from './store/auth.selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  authParamsObs = this.store.pipe(select(AuthSelectors.authParams));

  constructor(private store: Store<fromApp.AppState>) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({ email, password }));
    } else {
      this.store.dispatch(new AuthActions.SignStart({ email, password }));
    }

    authForm.reset();
  }
}
