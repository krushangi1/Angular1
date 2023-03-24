
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
    ingredientAdded= new Subject<Ingredient[]>();
    startedEditing=new Subject<number>();
    private ingredients:Ingredient[] =[
        new Ingredient('apples',4),
        new Ingredient('orange',3)
      ];

      getIngredients(){
        return this.ingredients.slice();
      }
      getIngredient(index:number){
        return this.ingredients[index];
      }

      addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientAdded.next(this.ingredients.slice());
      }

      addFromRecipe(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientAdded.next(this.ingredients.slice());
      }

      updateIngredient(index:number,ingredient:Ingredient){
        this.ingredients[index]=ingredient;
        this.ingredientAdded.next(this.ingredients.slice());
      }
      deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientAdded.next(this.ingredients.slice());
      }
    }