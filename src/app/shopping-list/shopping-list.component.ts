import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'] 
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  /**
   * The ingredients to be shown in the component.
   */
  ingredients: Ingredient[];

  /**
   * Subscribtion to the updates of shopping list
   */
  private subsctiption: Subscription; //TODO: Rename

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getShoppingList();

    this.subsctiption = this.shoppingListService.shoppingListUpdated.subscribe(
      (list: Ingredient[]) => {
        this.ingredients = list;
      }
    );
  }

  ngOnDestroy() {
    this.subsctiption.unsubscribe();
  }

  /**
   * Informs SHoppingListService that user started editing an ingredient
   * 
   * @param id The index of an ingredient that is being edited.
   */
  onEditItem(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }

}
