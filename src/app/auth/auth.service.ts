import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData{
    
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}

@Injectable({providedIn:'root'})
export class AuthService{

    user=new BehaviorSubject<User>(null);
    token:string=null;
    tokenExpirationTimer:any;

    constructor(private http:HttpClient,private router:Router){}

    signup(email:string,password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBwonpAaTYra93F4S6HX1SJDolNTQwGTrI',
        {
            email:email,
            password:password,
            returnSecureToken:true
        }
        ).pipe(catchError(this.handleError),tap(resData=>{
            this.handleAuthentication(
                                    resData.email,
                                    resData.localId,
                                    resData.idToken,
                                    +resData.expiresIn)
        }))
        ;
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
    }

    autoLogout(expirationDuration){
        this.tokenExpirationTimer= setTimeout(()=>{
            this.logout();
            console.log("----------------");
            console.log(expirationDuration);
            
            
        },expirationDuration);
    }

    login(email:string,password:string){
        return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBwonpAaTYra93F4S6HX1SJDolNTQwGTrI',
        {
            email:email,
            password:password,
            returnSecureToken:true
        }  ).pipe(catchError(this.handleError),tap(resData=>{
            this.handleAuthentication(
                                    resData.email,
                                    resData.localId,
                                    resData.idToken,
                                    +resData.expiresIn)
        }));
    }
    autoLogin(){
        const userData:{
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate:string
        }=JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }

        const loadedData=new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));

        if(loadedData.token){
            this.user.next(loadedData);
            const expirationDuration=new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    private handleAuthentication(
        email:string,
        userId:string,
        token:string,
        expiresIn:number
        ){
            const exierationDate=new Date(new Date().getTime() + expiresIn*1000);
            const user= new User(
                email,
                userId,
                token,
                exierationDate);
            this.user.next(user);
            this.autoLogout(expiresIn*1000);
            localStorage.setItem('userData',JSON.stringify(user))
        }

    private handleError(errorRes:HttpErrorResponse){
        let errorMsg='An unknown error ocurred!!'
        
        if (!errorRes.error || !errorRes.error.error) {
            console.log('gg');
            return throwError(errorRes);
            
          }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMsg='email already exist!!';
                break;
            case 'INVALID_PASSWORD':
                errorMsg='email already exist!!';
                break; 
            case 'EMAIL_NOT_FOUND':
                errorMsg='email already exist!!';
                break;   
        }
        return throwError(errorMsg);
    }
}