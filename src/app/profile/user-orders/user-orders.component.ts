import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as ProfileSelectors from '../store/profile.selectors';
import * as ProfileActions from '../store/profile.actions';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent {
  ordersObs = this.store.pipe(select(ProfileSelectors.orders));

  constructor(private store: Store<fromApp.AppState>) {}

  onOrderRecived(id: string) {
    this.store.dispatch(new ProfileActions.DeleteOrderOnDb(id));
  }
}
