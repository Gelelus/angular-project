import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesNumber = 6;//////////chnage 
  private RecipeSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.RecipeSubscription = this.store
      .pipe(
        select('recipes'),
        map((recipesState) => recipesState.recipes)
      )
      .subscribe((recipes: Recipe[]) => {
        
        this.recipes = recipes;
      });
    
  }

  ngOnDestroy() {
    this.RecipeSubscription.unsubscribe();
  }

  onChangePage(event){
    console.log(event)
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
