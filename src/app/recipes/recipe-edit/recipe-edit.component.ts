import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import { mimeType } from 'src/app/shared/mime-type.validator';
import * as RecipesSelectors from '../store/recipe.selectors';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: string;
  editMode = false;
  editImage = false;
  recipeForm: FormGroup;
  imagePreview: string;
  recipeObs: Observable<Recipe>;
  serverUrl = environment.DataBaseUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.recipeForm.patchValue({ image: file });
    this.recipeForm.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.editImage = false;
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        new RecipeActions.UpdateRecipeOnDataBase({
          ...this.recipeForm.value,
          _id: this.id,
        })
      );
    } else {
      this.store.dispatch(
        new RecipeActions.AddRecipeToDataBase(this.recipeForm.value)
      );
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngridient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {
    
    let recipeIngredients = new FormArray([]);
    this.recipeForm = new FormGroup({
      image: new FormControl(null, [Validators.required], [mimeType]),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      ingredients: recipeIngredients,
    });
    if (this.editMode) {
      this.recipeObs = this.store.pipe(
        select(RecipesSelectors.findRecipeById, { id: this.id }),
        map((recipe) => {
          this.imagePreview = environment.DataBaseUrl + recipe.imagePath;
          this.editImage = true;
          this.recipeForm.patchValue({
            name: recipe.name,
            description: recipe.description,
          });

          if (recipe['ingredients']) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/),
                  ]),
                })
              );
            }
          }
          return recipe;
        })
      );
    }

  
  }
}
