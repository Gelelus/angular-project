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
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  serverUrl = environment.DataBaseUrl;
  imgEdit = false;

  imgFile: File;
  imgAvatarUrl: string = null

  OrderValue: number = 6; //////на будущие
  
  user = this.store.pipe(select(AuthSelectors.user));

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
   
  }

  onImageChange() {
    this.store.dispatch(new AuthActions.UpdateAuthDataAvatar(this.imgFile));
    this.imgEdit = false;
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.imgFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imgAvatarUrl = reader.result as string;
      this.imgEdit = true;
    };
    reader.readAsDataURL(file);
  }

  prittyDate(date: string) {
    return new Date(date).toISOString().slice(0, 16).replace('T', ' ');
  }
}
