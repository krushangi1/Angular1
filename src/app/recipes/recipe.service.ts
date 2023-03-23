import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{  

    constructor(private slService:ShoppingListService){}

    selectedRecipe=new EventEmitter<Recipe>();

    recipes: Recipe[]=[
        new Recipe('French Fries',
                    'yummy',
                    'https://t3.ftcdn.net/jpg/04/02/96/38/240_F_402963868_NXuqmcLj3AgYpSoPr9rT4lkkoOfB9QeM.jpg',
                    [
                      new Ingredient('pottatoes',4),
                      new Ingredient('oil',2)
                    ]),
    
        new Recipe('Burger',
                    'Another desc',
                    'https://t3.ftcdn.net/jpg/04/02/96/38/240_F_402963868_NXuqmcLj3AgYpSoPr9rT4lkkoOfB9QeM.jpg',
                    [
                      new Ingredient('cheese',4),
                      new Ingredient('vegies',2),
                      new Ingredient('onion',2)
                    ])
      ];

      getRecipes(){
        return this.recipes.slice();
      }
      getRecipe(id:number){
        return this.recipes[id];
      }

    recipeToShoppingIng(ingredients:Ingredient[]){
        this.slService.addFromRecipe(ingredients)
    }
}