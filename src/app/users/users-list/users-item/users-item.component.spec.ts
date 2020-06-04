import { By } from '@angular/platform-browser';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { SimpleUser } from '../../simple-user.model';
import { environment } from 'src/environments/environment';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersItemComponent } from "./users-item.component";

describe('UserItemComponent', () => {
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
    let fixture: ComponentFixture<UsersItemComponent>;
    let app: UsersItemComponent;
    
    
    const queryImg = () => fixture.debugElement.query(By.css('img'));
    const queryHead = () => fixture.debugElement.query(By.css('.list-group-item-heading'));
    const queryEmail = () => fixture.debugElement.query(By.css('.list-group-item-text'));
    const queryRecipes = () => fixture.debugElement.query(By.css('.label-info'))

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ UsersItemComponent ],
        imports: [SharedModule]
      });
  
      fixture = TestBed.createComponent(UsersItemComponent);
      app = fixture.componentInstance;  
    });
    
    it('should create users-item component', () => {
        expect(app).toBeTruthy();
      });

    it('should display all user information correctly', async(() => {
      app.user = mockUser;
      fixture.detectChanges();

      fixture.whenStable().then(() => { 
        expect(queryImg().nativeElement.src).toBe(
            environment.DataBaseUrl + mockUser.avatarImg
          );
        expect(queryEmail().nativeElement.textContent.trim()).toBe(mockUser.email);  
        expect(queryRecipes().nativeElement.textContent.trim()).toBe(mockUser.recipes.length + ' recipes');  
        expect(queryHead().nativeElement.textContent.trim()).toBe(mockUser.firstName + " " + mockUser.secondName);  
      });
    }));
  })  