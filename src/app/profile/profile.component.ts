import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import * as AuthSelectors from '../auth/store/auth.selectors';
import * as AuthActions from '../auth/store/auth.actions';

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
  ImgEdit = false;
  ImgFile: File;

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

  onImageChange() {
    this.store.dispatch(new AuthActions.UpdateAuthDataAvatar(this.ImgFile));
    this.ImgEdit = false;
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.ImgFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imgAvatarUrl = reader.result as string;
      this.ImgEdit = true;
    };
    reader.readAsDataURL(file);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
