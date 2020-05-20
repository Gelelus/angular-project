import { Ingredient } from 'src/app/shared/ingredient.model';

export class Order {
    constructor(
      public ingridients: Ingredient[],
      public _id: string,
    ) {}
  

  }