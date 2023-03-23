import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
    ingredientAdded= new EventEmitter<Ingredient[]>();
    private ingredients:Ingredient[] =[
        new Ingredient('apples',4),
        new Ingredient('orange',3)
      ];

      getIngredients(){
        return this.ingredients.slice();
      }

      addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientAdded.emit(this.ingredients.slice());
      }

      addFromRecipe(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientAdded.emit(this.ingredients.slice());
      }
    }