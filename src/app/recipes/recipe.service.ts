import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

/**
 * This service provides tools to manage recipes
 */
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  /**
   * The array of recipes.
   */
  private recipes: Recipe[] = [
    new Recipe(
      "Lazania", 
      "Very tasty thing, honestly speaking", 
      "https://www.patee.ru/r/x6/0f/75/3a/640m.jpg",
      [
        new Ingredient("Pasta", 10), 
        new Ingredient("Cheese", 1),
        new Ingredient("Beef", 1),
        new Ingredient("Onion", 1),
      ]),
    new Recipe(
      "Peperoni", 
      "Italian pizza made with love", 
      "http://siestafood.ru/wp-content/uploads/2017/12/%D0%BF%D0%B5%D0%BF%D0%B5%D1%80%D0%BE%D0%BD%D0%B8.png",
      [
        new Ingredient("Testo", 1),
        new Ingredient("Tomato pasta", 1),
        new Ingredient("Peperoni slices", 20),
      ]),
  ];

  /**
   * Returns a copy of recipes array.
   */
  getRecipes() {
    return this.recipes.slice();
  }

  /**
   * Returns single recipe by index.
   * 
   * @param id Index of element to be returned from recipes array.
   */
  getRecipe(id: number) {
    return this.recipes.slice()[id];
  }
  
  /**
   * Adds new recipe
   * 
   * @param recipe Recipe object to be added to recipe array.
   */
  addRecipe(recipe: Recipe) {
    this.recipes.push( recipe );
  }

  /**
   * Modifies single recipe from recipe array.
   * 
   * @param id Index of recipe
   * @param recipe New recipe object that will replace the old one.
   */
  updateRecipe(id: number, recipe:Recipe) {
    this.recipes[id] = recipe;
  }
}
