import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { UsersListComponent } from './users-list.component';
import * as fromApp from '../../store/app.reducer';
import * as UsersSelectors from '../store/users.selectors';
import { SharedModule } from '../../shared/shared.module';
import { SimpleUser } from '../simple-user.model';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersItemComponent } from './users-item/users-item.component';

describe('UserListComponent', () => {
  const mockUser: SimpleUser = {
    email: 'string',
    _id: 'string',
    avatarImg: 'string',
    firstName: 'string',
    secondName: 'string',
    date: 'string',
    phoneNumber: 'string',
    recipes: ['string'],
  };

  const mockParms = {
    users: [mockUser],
    maxUsers: 1,
    usersOnPage: 1,
  };
  let fixture: ComponentFixture<UsersListComponent>;
  let mockStore: MockStore;
  let mockParmsSelector: MemoizedSelector<
    fromApp.AppState,
    { users: SimpleUser[]; maxUsers: number; usersOnPage: number }
  >;
  let app: UsersListComponent;
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
      declarations: [UsersListComponent, UsersItemComponent],
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([
          { path: 'users', component: UsersListComponent },
        ]),
      ],
    });
    fixture = TestBed.createComponent(UsersListComponent);
    app = fixture.debugElement.componentInstance;
    mockStore = TestBed.inject(MockStore);
    mockParmsSelector = mockStore.overrideSelector(
      UsersSelectors.usersParams,
      mockParms
    );
    fixture.detectChanges();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  it('should create user-list component', () => {
    expect(app).toBeTruthy();
  });

  it('method onFilterChange should add query params to route', fakeAsync(() => {
    const query = { orderBy: 'date', searchString: 'name', order: 1 };
    app.onFilterChange(query);
    tick();
    expect(location.path()).toBe(
      `/users?sortName=${query.orderBy}&sortOrder=${query.order}&matchName=email&matchString=${query.searchString}`
    );
  }));

  it('method onChangePage should add query params to route', fakeAsync(() => {
    const query = { startItem: 1, previousPage: 1, limit: 1 };
    app.onChangePage(query);
    tick();
    expect(location.path()).toBe(
      `/users?startItem=${query.startItem}&limit=${query.limit}`
    );
  }));
});
