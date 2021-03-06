import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shoping-list.actions';


export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
  error: string
}

const initialState: State = {
  ingredients: [],
  editedIngredient: null,
  editedIngredientIndex: -1,
  error: null
};

export function shopingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, index) => {
          return index !== state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null,
      };

    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };

    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    
    case ShoppingListActions.STORE_SUCCESS:
      return {
        ...state,
        ingredients: [],
      }
      case ShoppingListActions.STORE_FAIL:
        return {
          ...state,
          error: action.payload
        }

    default:
      return state;
  }
}
