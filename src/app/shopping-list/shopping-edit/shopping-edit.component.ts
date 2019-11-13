import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';

import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  /** The editor form */
  @ViewChild('f', {'static': false}) slForm: NgForm;

  /** Subscription to Shopping list edit mode */
  subsription: Subscription; //TODO: Rename

  /** Defines whether the edit mode is activated. */
  editMode = false;

  /** Stores the index of edited item */
  editedItemIndex: number;

  /** Stores the copy of edited item */
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subsription = this.shoppingListService.startedEditing
    .subscribe(
      (id: number) => {
        this.editedItemIndex = id;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(id);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  ngOnDestroy() {
    this.subsription.unsubscribe();
  }

  /**
   * Submits the form passed as argument and then resets it.
   * 
   * @param form Form to be submitted
   */
  onSubmit(form: NgForm) {
    const value = form.value;

    if (this.editMode)
      this.shoppingListService.updateIngredient(this.editedItemIndex, new Ingredient(value.name, value.amount));
    else 
      this.shoppingListService.addIngredient(value.name, value.amount);

    this.editMode = false;
    this.onClear(form);
  }

  /**
   * Resets the form
   * 
   * @param form Form to be reset
   */
  onClear(form: NgForm) {
    form.reset();
    this.slForm.controls.amount.setValue(1);
    this.editMode = false;
  }

  /**
   * Deletes selected ingredient from shopping list.
   */
  onDelete() {
    this.onClear(this.slForm);
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }


}
