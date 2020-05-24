import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as UsersActions from '../store/users.actions';
import * as UsersSelectors from '../store/users.selectors';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {

  usersObs = this.store.pipe(select(UsersSelectors.users)) 

  constructor(private store: Store<fromApp.AppState>) {}

}
