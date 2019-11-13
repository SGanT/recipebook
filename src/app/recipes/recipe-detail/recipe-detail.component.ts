import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  
  /** Recipe to be shown */
  recipe: Recipe;
  
  constructor(private shoppingListService: ShoppingListService, 
              private recipeService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    /**
     * Reading URL Params and reacting to changes
     */
    this.route.params.subscribe(
      (params: Params) => {
        this.recipe = this.recipeService.getRecipe(+params.id);
      }
    );
  }

  /**
   * Adds ingredients needed for current recipe to shopping list.
   */
  onToShoppingList() {
    this.shoppingListService.addIngredients( this.recipe.ingredients );
  }

}
