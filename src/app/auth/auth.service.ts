import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface AuthResponseData{
    
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string
}

@Injectable({providedIn:'root'})
export class AuthService{

    constructor(private http:HttpClient){}

    signup(email:string,password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBwonpAaTYra93F4S6HX1SJDolNTQwGTrI',
        {
            email:email,
            password:password,
            returnSecureToken:true
        }
        ).pipe(catchError(errorRes=>{
            let errorMsg='An unknown error ocurred!!'
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMsg);
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMsg='email already exist!!'
            }
            return throwError(errorMsg);
        }))
        ;
    }
}