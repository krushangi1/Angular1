import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent{

    constructor(private authService:AuthService){}

    isLoginMode=true;
    isLoading=false;
    error:string=null;

    onSwitchMode(){
        this.isLoginMode=!this.isLoginMode;
    }

    onSubmit(forn:NgForm){
        if(!forn.valid){
            return;
        }

        const email=forn.value.email;
        const password=forn.value.password;

        this.isLoading=true;
        if(this.isLoginMode){
            ///
        }else{
            this.authService.signup(email,password).
            subscribe( resData=>{
                console.log(resData);
                this.isLoading=false;
            },errorMsg=>{
                console.log(errorMsg);
                this.error=errorMsg;
                this.isLoading=false;
            }
            );
        }
        
        forn.reset();
    }
}