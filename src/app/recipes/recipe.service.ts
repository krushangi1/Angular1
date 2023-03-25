import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{  
  recipeChanged= new Subject<Recipe[]>();

    constructor(private slService:ShoppingListService){}

   
      recipes:Recipe[];
    // recipes: Recipe[]=[
    //     new Recipe('French Fries',
    //                 'yummy',
    //                 'https://t3.ftcdn.net/jpg/04/02/96/38/240_F_402963868_NXuqmcLj3AgYpSoPr9rT4lkkoOfB9QeM.jpg',
    //                 [
    //                   new Ingredient('pottatoes',4),
    //                   new Ingredient('oil',2)
    //                 ]),
    
    //     new Recipe('Burger',
    //                 'Another desc',
    //                 'https://t3.ftcdn.net/jpg/04/02/96/38/240_F_402963868_NXuqmcLj3AgYpSoPr9rT4lkkoOfB9QeM.jpg',
    //                 [
    //                   new Ingredient('cheese',4),
    //                   new Ingredient('vegies',2),
    //                   new Ingredient('onion',2)
    //                 ])
    //   ];

      setRecipe(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipeChanged.next(this.recipes.slice());
      }

      getRecipes(){
        return this.recipes.slice();
        
      }
      getRecipe(id:number){
        return this.recipes[id];
      }

      recipeToShoppingIng(ingredients:Ingredient[]){
          this.slService.addFromRecipe(ingredients)
      }

      addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
      }

      updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipeChanged.next(this.recipes.slice());
      }

      deleteReciep(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
      }
}