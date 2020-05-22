import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as UsersActions from './store/users.action';
import * as UsersSelectors from './store/users.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  error = this.store.pipe(select(UsersSelectors.error));
  constructor(private store: Store<fromApp.AppState>) {}

  onGenerateError() {
    this.store.dispatch(UsersActions.crudFail({ payload: 'error' }));
  }
}
