import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as AuthSelectors from '../../auth/store/auth.selectors';
import * as AuthActions from '../../auth/store/auth.actions';
import { tap } from 'rxjs/operators';

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
    this.initForm();
  }

  private initForm() {
    
    this.profileForm = new FormGroup({
      firstName: new FormControl(null, [Validators.minLength(3)]),
      secondName: new FormControl(null, [Validators.minLength(3)]),
      email: new FormControl({ value: null, disabled: true }, [
        Validators.required,
        Validators.email,
      ]),
      phoneNumber: new FormControl(null, Validators.pattern(/^\+[0-9]{3,15}$/)),
      passwords: new FormGroup(
        {
          password: new FormControl(null, [Validators.minLength(3)]),
          secondPassword: new FormControl(null, [Validators.minLength(3)]),
        },
        {
          validators: (c: AbstractControl): { invalid: boolean } => {
            if (c.get('password').value !== c.get('secondPassword').value) {
              return { invalid: true };
            }
          },
        }
      ),
    });

    this.userSub = this.store
      .pipe(
        select(AuthSelectors.user),
        tap((user) => {
          if (user) {
            this.profileForm.patchValue({
              firstName: user.firstName,
              secondName: user.secondName,
              email: user.email,
              phoneNumber: user.phoneNumber,
            });
          }
        })
      )
      .subscribe();
  }

  onSubmit() {
    this.store.dispatch(new AuthActions.UpdateAuthData(this.profileForm.value));
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
