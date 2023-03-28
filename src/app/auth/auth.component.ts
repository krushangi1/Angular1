import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscribable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnDestroy{

    constructor(private authService:AuthService,private router:Router,private cmpfactoryResolver:ComponentFactoryResolver){}

    isLoginMode=true;
    isLoading=false;
    error:string=null;
    @ViewChild(PlaceholderDirective,{static:false}) alerthost:PlaceholderDirective;
    closeSub:Subscription;

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
            console.log("------");
            
            console.log(errorMsg);
            this.error=errorMsg;
            this.showErrorAlert(errorMsg);
            this.isLoading=false;
        }
        );
        
        forn.reset();
    }

    onHandleError(){
        this.error=null;
    }

   

    private showErrorAlert(msg:string){
        const alertFactory= this.cmpfactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef=this.alerthost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef =hostViewContainerRef.createComponent(alertFactory);

        componentRef.instance.message=msg;
        this.closeSub=componentRef.instance.closed.subscribe(()=>{
            console.log(this.closeSub);
            this.closeSub.unsubscribe();
            console.log("afterunsubb"+this.closeSub);
            hostViewContainerRef.clear();
        })
    }
    ngOnDestroy() {
        if (this.closeSub) {
          this.closeSub.unsubscribe();
        }
      }
}