import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipe.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  userEmail = '';
  userImgUrl = '';
  private userSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.userSub = this.store
      .pipe(
        select('auth'),
        map((authState) => authState.user)
      )
      .subscribe((user) => {
        this.isAuth = !!user;
        if (user) {
          this.userEmail = user.email;
          this.userImgUrl = environment.DataBaseUrl + user.avatarImgUrl;
        }
      });
  }
  
  onPreviewImg(event: Event){
    const reader = new FileReader();
    reader.onload = (e) => {
      this.userImgUrl = e.target.result as string;
    }
    reader.readAsDataURL((<HTMLInputElement>event.target).files[0]);
  }

  onCollapse(divCollapse: HTMLDivElement) {
    divCollapse.classList.toggle('collapse');
  }

  onSaveData() {
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
 
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
