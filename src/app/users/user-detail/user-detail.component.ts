import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as UsersSelectors from '../store/users.selectors';
import * as fromApp from '../../store/app.reducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent {
  userObs = this.store.pipe(select(UsersSelectors.user));
  serverUrl = environment.DataBaseUrl;
  
  constructor(private store: Store<fromApp.AppState>) {}
}
