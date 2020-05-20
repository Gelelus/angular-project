import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as ProfileSelectors from '../store/profile.selectors';


@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  ordersObs = this.store.pipe(select(ProfileSelectors.orders))

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    
  }

}
