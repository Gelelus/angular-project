import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as AuthSelectors from '../auth/store/auth.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  imgAvatarUrl: string;
  name: string;
  registratedDate: string;
  profileForm: FormGroup;
  userSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.userSub = this.store
      .pipe(select(AuthSelectors.user))
      .subscribe((user) => {
        if (user) {
          this.imgAvatarUrl = environment.DataBaseUrl + user.avatarImgUrl;
          this.name = user.name;
          this.registratedDate = new Date(user.date)
            .toISOString()
            .slice(0, 16)
            .replace('T', ' ');
        }
      });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
