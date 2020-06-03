import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {Location} from "@angular/common";

import { UsersComponent } from './users.component';
import * as fromApp from '../store/app.reducer';
import * as UsersSelectors from './store/users.selectors';
import { SharedModule } from '../shared/shared.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersItemComponent } from './users-list/users-item/users-item.component';
import { routes } from './users-routing.module';

describe('Users Component', () => {
  let fixture: ComponentFixture<UsersComponent>;
  let mockStore: MockStore;
  let mockErrorSelector: MemoizedSelector<fromApp.AppState, string>;
  let app: UsersComponent;
  let location: Location;
  let router: Router;
  const queryError = () => fixture.debugElement.query(By.css('.alert p'));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
      declarations: [
        UsersComponent,
        UsersListComponent,
        UserDetailComponent,
        UsersItemComponent,
      ],
      imports: [SharedModule, RouterTestingModule.withRoutes(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    mockStore = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    location = TestBed.get(Location);

    app = fixture.debugElement.componentInstance;
    mockErrorSelector = mockStore.overrideSelector(UsersSelectors.error, null);
    router.initialNavigation();
    
  });

  it('should create the users component', () => {
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it("shouldn't display error message if no error", () => {
    expect(queryError()).toBe(null);
  });

  it('should display error message if error exist', () => {
    mockErrorSelector.setResult('error');
    mockStore.refreshState();
    fixture.detectChanges();
    expect(queryError().nativeElement.textContent).toBe('error');
  });

  it('navigate to "" takes you to /', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/');
  }));
}); 
