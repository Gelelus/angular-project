import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as AuthSelectors from '../auth/store/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  userImgUrl = '';
  private userSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.userSub = this.store
      .pipe(select(AuthSelectors.user))
      .subscribe((user) => {
        this.isAuth = !!user;
        if (user) {
          this.userImgUrl = user.avatarImgUrl;
        }
      });
  }

  onCollapse(divCollapse: HTMLDivElement) {
    divCollapse.classList.toggle('collapse');
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
