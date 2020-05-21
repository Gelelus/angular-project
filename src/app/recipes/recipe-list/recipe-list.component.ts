import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as fromApp from 'src/app/store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import * as RecipeSelectors from '../store/recipe.selectors';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  recipesParmsObs = this.store.pipe(select(RecipeSelectors.recipesParms));
  filter = false;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  onChangePage(event: {
    startItem: number;
    previousPage: number;
    limit: number;
  }) {
    if (event.previousPage !== -1) {
      this.router
        .navigate(['/recipes'], {
          queryParams: {
            startItem: event.startItem,
            limit: event.limit,
          },
        })
        .then(() => {
          this.store.dispatch(
            new RecipeActions.FetchRecipes({
              startItem: event.startItem,
              limit: event.limit,
            })
          );
        });
    }
  }

  InitialPage(recipesOnPage:number) {
    return (
      Math.floor(
        +this.route.snapshot.queryParamMap.get('startItem') / recipesOnPage
      ) + 1
    );
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  onFilter() {
    this.filter = !this.filter;
  }
}
