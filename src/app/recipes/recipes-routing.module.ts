import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGaurd } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipe-resolver.service";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";

const recipeRoutes:Routes=[
    {path:'',component:RecipesComponent,canActivate:[AuthGaurd],
    children:[
        {path:'', component:RecipeStartComponent,pathMatch:'full'},
        {path:'new', component:RecipeEditComponent},
        {path:':id', component:RecipeDetailComponent,resolve:[RecipeResolverService]},
      
        {path:':id/edit', component:RecipeEditComponent,resolve:[RecipeResolverService]}
    ]}
];

@NgModule({
    imports:[RouterModule.forChild(recipeRoutes)],
    exports:[RouterModule]
})
export class RecipesRoutingModule{

}