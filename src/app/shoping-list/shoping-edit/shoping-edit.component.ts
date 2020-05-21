import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';

import * as ShopingListActions from '../store/shoping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css'],
})
export class ShopingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  private subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store
      .pipe(select('shopingList'))
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;

          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onCreate(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(
        new ShopingListActions.UpdateIngredient(newIngredient)
      );
    } else {
      this.store.dispatch(new ShopingListActions.AddIngredient(newIngredient));
    }
    this.onClear();
  }

  onDelete() {
    this.store.dispatch(new ShopingListActions.DeleteIngredient());
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShopingListActions.StopEdit());
  }
  onOrder(){
    ///
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShopingListActions.StopEdit());
  }
}
