import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  serverUrl = environment.DataBaseUrl;

  
}
