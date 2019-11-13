import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

/** ShoppingListService provides tools to manage shopping list with all required ingredients to be bought ASAP. */
@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  /**
   * Emitted when the shopping list is updated.
   */
  shoppingListUpdated = new Subject<Ingredient[]>();

  /**
   * Emitted when the user begins editing an ingredient/
   */
  startedEditing = new Subject<number>();
  constructor() { }

  /**
   * The array of Ingredients shown in shopping-list.component
   */
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 3),
  ];

  /**
   * Returns a copy of ingredients array.
   */
  getShoppingList() {
    return this.ingredients.slice();
  }

  /**
   * Returns single ingredient from ingredients array.
   * 
   * @param id Index of separate ingredient from shopping list to be returned.
   */
  getIngredient(id: number) {
    return this.ingredients[id];
  }

  /**
   * Adds a new ingredient to the shopping list.
   * 
   * @param name The name of an ingredient.
   * @param amount The amount
   */
  addIngredient(name: string, amount: number) {
    //TODO: Add logic to prevent duplicating the same elements.
    this.ingredients.push( new Ingredient(name, amount) );
    this.shoppingListUpdated.next( this.ingredients.slice() );
  }

  /**
   * Adds multiple ingredients to the shopping list at once.
   * 
   * @param ingredients An array of Ingredient objects to be added to shopping list.
   */
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients = this.ingredients.concat(ingredients);
    this.shoppingListUpdated.next( this.ingredients.slice() );
  }

  /**
   * Updates the Ingredient from the shopping list by index.
   * 
   * @param id Index of an Ingredient from shopping list to be updated.
   * @param newIngredient New Ingredient object to replace the old one.
   */
  updateIngredient(id: number, newIngredient: Ingredient) {
    this.ingredients[id] = newIngredient;
    this.shoppingListUpdated.next( this.ingredients.slice() );
  }

  /**
   * Deletes an ingredient by index.
   * 
   * @param id Index of an ingredient to be deleted.
   */
  deleteIngredient(id: number) {
    this.ingredients.splice(id, 1);
    this.shoppingListUpdated.next( this.ingredients.slice() );
  }
}
