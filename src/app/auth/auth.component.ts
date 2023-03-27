import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent{

    constructor(private authService:AuthService,private router:Router){}

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

        let authObj:Observable<AuthResponseData>;

        this.isLoading=true;
        if(this.isLoginMode){
            authObj=this.authService.login(email,password)
        }else{
            authObj=this.authService.signup(email,password)
            
        }

        authObj.subscribe( resData=>{
            console.log(resData);
            this.isLoading=false;
            this.router.navigate(['/recipes']);

        },errorMsg=>{
            console.log(errorMsg);
            this.error=errorMsg;
            this.isLoading=false;
        }
        );
        
        forn.reset();
    }
}