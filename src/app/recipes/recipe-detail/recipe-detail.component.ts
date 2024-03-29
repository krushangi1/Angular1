import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  

  recipe:Recipe;
  id:number;

  constructor(private recipeService:RecipeService,private route:ActivatedRoute,private router:Router){}

  ngOnInit() { 
    const id =this.route.snapshot.params['id'];
    this.route.params.
                  subscribe( 
                    (params:Params)=> {
                      this.id=+params['id'];
                      this.recipe=this.recipeService.getRecipe(this.id);
                    }
                  );
   }

  ToShop(){
    this.recipeService.recipeToShoppingIng(this.recipe.ingredients);
    
  }
  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
    //this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
  }
  onDeleteRecipe(){
    this.recipeService.deleteReciep(this.id);
    this.router.navigate(['../'],{relativeTo:this.route});
  }
}
