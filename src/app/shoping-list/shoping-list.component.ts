import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoping-list.service';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css'],
})
export class ShopingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingSubscription: Subscription

  constructor(private shopingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shopingListService.getIngredients();
    this.ingSubscription = this.shopingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy() : void{
    this.ingSubscription.unsubscribe()
  }

}
