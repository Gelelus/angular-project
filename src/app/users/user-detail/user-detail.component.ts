import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as UsersSelectors from '../store/users.selectors';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent {
  userObs = this.store.pipe(select(UsersSelectors.user));

  constructor(private store: Store<fromApp.AppState>) {}

  prittyDate(date: string) {
    return date.slice(0, 16).replace("T", " "); 
  }
}
