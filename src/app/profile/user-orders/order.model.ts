import { Ingredient } from 'src/app/shared/ingredient.model';

export class Order {
    constructor(
      public ingredients: Ingredient[],
      public _id: string,
    ) {}
  

  }