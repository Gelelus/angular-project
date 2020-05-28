import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import * as fromApp from '../../store/app.reducer';
import * as UsersSelectors from '../store/users.selectors';
import * as UsersActions from '../store/users.actions';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent {
  usersParamsObs = this.store.pipe(select(UsersSelectors.usersParams));

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onFilterChange(event: {
    orderBy: string;
    searchString: string;
    order: number;
  }) {
    let query: {
      matchName?: string;
      matchString?: string;
      sortName: string;

      sortOrder: number;
    } = {
      sortName:
        event.orderBy !== 'name' || !event.orderBy ? event.orderBy : 'email',
      sortOrder: event.order || 1,
    };

    if (event.searchString !== '') {
      query.matchName = 'email';
      query.matchString = event.searchString;
    }
    
    this.router
      .navigate(['/users'], {
        queryParams: query,
      })
      .then(() => {
        this.store.dispatch(UsersActions.fetchUsers());
      });
  }

  onChangePage(event: {
    startItem: number;
    previousPage: number;
    limit: number;
  }) {
    if (event.previousPage !== -1) {
      this.router
        .navigate(['/users'], {
          queryParams: {
            startItem: event.startItem,
            limit: event.limit,
          },
          queryParamsHandling: 'merge',
        })
        .then(() => {
          this.store.dispatch(UsersActions.fetchUsers());
        });
    }
  }
  InitialPage(recipesOnPage: number) {
    return (
      Math.floor(
        +this.route.snapshot.queryParamMap.get('startItem') / recipesOnPage
      ) + 1
    );
  }
}
