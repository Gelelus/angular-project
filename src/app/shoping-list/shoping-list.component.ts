import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select} from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import * as ShopingListActions from './store/shoping-list.actions';
import * as fromApp from '../store/app.reducer'

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css'],
})
export class ShopingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.ingredients = this.store.pipe(select('shopingList'));
  }

  onEditItem(index: number) {
    
    this.store.dispatch(new ShopingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
    
  }
}
