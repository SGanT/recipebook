import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  /** Index of edited recipe */
  id: number;

  /** Defines whether user edits a recipe or adds a new one */
  editMode: boolean = false;

  /** Form that contains a recipe. */
  recipeForm: FormGroup;


  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
        this.initForm();
      }
    );
  }
  /**
   * Called to submit editor form. Interacts with RecipeService.
   */
  onSubmit() {   
    const newRecipe = new Recipe(
      this.recipeForm.value.name, 
      this.recipeForm.value.description, 
      this.recipeForm.value.imagePath, 
      this.recipeForm.value.ingredients
    );
    
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
  }
  /**
   * A getter needed for *ngFor loop in component
   */
  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  /**
   * Called to initialize edit form
   */
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    // Initialize variables if user is editing an existing recipe.
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe( this.id );
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      // If there are ingredients, add controls for them
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required, Validators.pattern('^[1-9]+[0-9]*$')
              ]),
            })
          );
        }
      }
    }
    // Create FormGroup
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  /**
   * Creates a new input field for ingredient of a recipe.
   */
  onAddIngredient() {
    ( <FormArray>this.recipeForm.get('ingredients') ).push( new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required, Validators.pattern('^[1-9]+[0-9]*$')
      ]),
    }) );
  }

  /**
   * Removes separate ingredient input group.
   * 
   * @param id Index of ingredient input group to be removed.
   */
  removeIngredientField(id: number) {
    ( <FormArray>this.recipeForm.get('ingredients') ).removeAt(id);
  }
}
