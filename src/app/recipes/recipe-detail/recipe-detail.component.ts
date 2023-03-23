import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  ngOnInit() {
   
     
  }
  constructor(private recipeService:RecipeService){}

  @Input() recipe:Recipe;

  ToShop(){
    this.recipeService.recipeToShoppingIng(this.recipe.ingredients);
    
  }
  
}
