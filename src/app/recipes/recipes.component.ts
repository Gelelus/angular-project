import { Component} from '@angular/core';
import {  Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromApp from 'src/app/store/app.reducer';
import * as RecipesSelectors from './store/recipe.selectors';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent {
  error: Observable<string> = this.store.pipe(select(RecipesSelectors.error))
  constructor(private store: Store<fromApp.AppState>) {}
  
}
