import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesNumber: number;
  recipesOnPage = 5;
  recipesInitialPage =
    Math.floor(
      +this.route.snapshot.queryParamMap.get('startItem') / this.recipesOnPage
    ) + 1;
  private RecipeSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.RecipeSubscription = this.store
      .pipe(select('recipes'))
      .subscribe((recipesState) => {
        this.recipes = recipesState.recipes;
        this.recipesNumber = recipesState.maxRecipes;
      });
  }

  ngOnDestroy() {
    this.RecipeSubscription.unsubscribe();
  }

  onChangePage(event: { startItem: number; previousPage: number }) {
    if (event.previousPage !== -1) {
      this.router
        .navigate(['/recipes'], {
          queryParams: {
            startItem: event.startItem,
            limit: this.recipesOnPage,
          },
        })
        .then(() => {
          this.store.dispatch(new RecipeActions.FetchRecipes());
        });
    }
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
