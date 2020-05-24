import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as fromApp from 'src/app/store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import * as RecipeSelectors from '../store/recipe.selectors';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipesParmsObs = this.store.pipe(select(RecipeSelectors.recipesParms));
  filter = false;
  limit: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store
      .pipe(
        select(RecipeSelectors.limit),
        take(1),
        tap((limit) => {
          this.limit = limit;
        })
      )
      .subscribe();
  }
  onFilterChange(event: { orderBy: string; searchString: string }) {
    let query: {
      matchName?: string;
      matchString?: string;
      sortName: string;
    } = { sortName: event.orderBy || 'name' };

    if (event.searchString !== '') {
      query.matchName = 'name';
      query.matchString = event.searchString;
    }

    this.router
      .navigate(['/recipes'], {
        queryParams: query,
      })
      .then(() => {
        this.store.dispatch(
          new RecipeActions.FetchRecipes({
            startItem: 0,
            limit: this.limit,
          })
        );
      });
  }

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
          queryParamsHandling: 'merge',
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

  InitialPage(recipesOnPage: number) {
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
