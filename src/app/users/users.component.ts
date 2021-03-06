import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as UsersActions from './store/users.actions';
import * as UsersSelectors from './store/users.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  error = this.store.pipe(select(UsersSelectors.error));
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.dispatch(UsersActions.fetchUsers());
  }
}
