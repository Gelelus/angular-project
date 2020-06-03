import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { UserDetailComponent } from './user-detail.component';
import * as fromApp from '../../store/app.reducer';
import * as UsersSelectors from '../store/users.selectors';
import { SharedModule } from '../../shared/shared.module';
import { environment } from 'src/environments/environment';
import { SimpleUser } from '../simple-user.model';

describe('UserDetailComponent', () => {
  const mockUser : SimpleUser = {
    email: 'string',
    _id: 'string',
    avatarImg: 'string',
    firstName: 'string',
    secondName: 'string',
    date: 'string',
    phoneNumber: 'string',
    recipes: ['string'],
  };
  let fixture: ComponentFixture<UserDetailComponent>;
  let mockStore: MockStore;
  let mockUserSelector: MemoizedSelector<
    fromApp.AppState,
    SimpleUser
  >;

  const queryContainer = () => fixture.debugElement.query(By.css('.user-container'));
  const queryImg = () => fixture.debugElement.query(By.css('img'));
  const queryPhone = () => fixture.debugElement.query(By.css('.user-phone'));
  const queryEmail = () => fixture.debugElement.query(By.css('.user-email'));
  const queryDate = () => fixture.debugElement.query(By.css('.user-date'));
  const queryRecipes = () => fixture.debugElement.query(By.css('.user-recipes'));
  const queryName = () => fixture.debugElement.query(By.css('.user-name'));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
      declarations: [UserDetailComponent],
      imports: [SharedModule],
    });
    fixture = TestBed.createComponent(UserDetailComponent);
    mockStore = TestBed.inject(MockStore);
    mockUserSelector = mockStore.overrideSelector(UsersSelectors.user, mockUser);
    fixture.detectChanges();
  });

  it('should create user-detail component', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should use img src from store', () => {

    fixture.detectChanges();
    expect(queryImg().nativeElement.src).toBe(
      environment.DataBaseUrl + mockUser.avatarImg
    );
  });

  it('should display user phone number from store', () => {

    fixture.detectChanges();
    expect(queryPhone().nativeElement.textContent.trim()).toBe(mockUser.phoneNumber);
  });

  it('should display user email from store', () => {
  
    fixture.detectChanges();
    expect(queryEmail().nativeElement.textContent.trim()).toBe(mockUser.email);
  });

  it('should display user date from store', () => {
    
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(queryDate().nativeElement.textContent.trim()).toBe(app.prittyDate(mockUser.date));
  });

  it('should display recipes length from store', () => {
    
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(+queryRecipes().nativeElement.textContent).toBe(mockUser.recipes.length);
  });

  it('should display user name from store', () => {
    fixture.detectChanges();
    expect(queryName().nativeElement.textContent.trim()).toBe(mockUser.firstName + ' ' + mockUser.secondName);
  });


  it('should display nothing when user not exist', () => {
    mockUserSelector.setResult(null);
    mockStore.refreshState();
    fixture.detectChanges();
    expect(queryContainer()).toBe(null);
  });

});
