import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor(private http:HttpClient,private reciepeService:RecipeService){ }

    storeRecipes(){
        const recipes=this.reciepeService.getRecipes();
        return this.http.put('https://ng-cource-recipe-book-f28af-default-rtdb.firebaseio.com/recipes.json',recipes)
            .subscribe( responseData=>{
                console.log(responseData);
            })
    }

    fetchRecipe(){
        return this.http.
            get<Recipe[]>('https://ng-cource-recipe-book-f28af-default-rtdb.firebaseio.com/recipes.json')
            .pipe(map(recipes=>{
                return recipes.map(recipe=>{
                    return {...recipe,ingrediens:recipe.ingredients?recipe.ingredients:[]};
                });
            }),
            tap(recipes => {
                this.reciepeService.setRecipe(recipes);
            } )  )
            
    }
}

