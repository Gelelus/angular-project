import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import * as fromApp from '../store/app.reducer';
import * as UsersSelectors from './store/users.selectors';
import { SharedModule } from '../shared/shared.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersItemComponent } from './users-list/users-item/users-item.component';
import { RouterTestingModule } from '@angular/router/testing';


describe('Users Component', () => {
  let fixture: ComponentFixture<UsersComponent>;
  let mockStore: MockStore;
  let mockErrorSelector: MemoizedSelector<fromApp.AppState, string>;
  let app: UsersComponent;

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
      imports: [ RouterTestingModule, RouterModule,SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    mockStore = TestBed.inject(MockStore);
    app = fixture.debugElement.componentInstance;
    mockErrorSelector = mockStore.overrideSelector(UsersSelectors.error, null);
    
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

 
}); 
