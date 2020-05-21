import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import * as fromApp from '../../store/app.reducer';
import * as ProfileActions from '../store/profile.actions';
import * as ProfileSelectors from '../store/profile.selectors';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.css'],
})
export class UserRecipesComponent implements OnInit {
  serverUrl = environment.DataBaseUrl;
  userRecipesObs = this.store.pipe(select(ProfileSelectors.recipes));

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new ProfileActions.FetchRecipes());
  }
}
