import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit, OnDestroy {
  
  userSub: Subscription;
  profileForm: FormGroup;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    let firstName = '';
    let secondName = '';
    let email = '';
    let phoneNumber = '';

    this.userSub = this.store
      .pipe(
        select('auth'),
        map((authState) => authState.user)
      )
      .subscribe((user) => {
        if (user) {
          
          firstName = user.firstName;
          secondName = user.secondName;
          email = user.email;
          phoneNumber = user.phoneNumber;

          this.profileForm = new FormGroup({
            firstName: new FormControl(firstName),
            secondName: new FormControl(secondName),
            email: new FormControl({value: email, disabled: true}),
            phoneNumber: new FormControl(phoneNumber),
            password: new FormControl(null),
            secondPassword: new FormControl(null),
          });
        }
      });

    
    
  }

  onSubmit() {
    console.log('submit');
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
