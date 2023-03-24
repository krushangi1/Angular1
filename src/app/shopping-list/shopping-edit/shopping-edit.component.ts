import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy{
  subscription:Subscription;
  editMode=false;
  editedItemIndex:number;
  editItem:Ingredient;

  @ViewChild('f',{static:false}) slForm:NgForm;

  constructor(private shoppingListService:ShoppingListService){}
 
  
  ngOnInit(){
    this.shoppingListService.startedEditing.subscribe(
      (index:number)=>{
        this.editMode=true;
        this.editedItemIndex=index;
        this.editItem=this.shoppingListService.getIngredient(index);
        
        this.slForm.setValue({
          name:this.editItem.name,
          amount:this.editItem.amount
        }) 
      }
    )
  }
  
  onAddItem(form:NgForm){
    const value=form.value;
    const newIngredient=new Ingredient(value.name,value.amount)
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient);
    }else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    console.log(newIngredient);
    this.editMode=false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.onClear();
    this
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }
}
