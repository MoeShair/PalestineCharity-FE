import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {UserModel} from "./user.model";

export interface Response {
  user :{
  UserID: number;
  Name: string;
  Email: string;
  Age: number;
  Address: string;
  //role: string;
  }
}

export interface signUpResponse {
  message: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<UserModel | null>(null);

  constructor(private http: HttpClient,
              private router: Router,
              private cookieService: CookieService) { }

  signUp(email: string | null | undefined, password: string | null | undefined) {
    return this.http.post<signUpResponse>('http://localhost:3000/posts/register',
      {
        Name: '',
        Email: email,
        Password: password,
        Age: 12,
        PhoneNumber: '',
        Address: ''
    }).pipe(catchError(this.handleError),  tap(resData =>{
      console.log('Response data:', resData);
    }))

  }

  signIn(email: string | null | undefined, password: string | null | undefined) {
    return this.http.post<Response>('http://localhost:3000/posts/login', {
        Email: email,
        Password: password
    }).pipe(
        catchError(this.handleError),
        tap( resData =>{
          console.log('Response data:', resData);
          const userData = resData.user
          const user = new UserModel(
              userData.UserID,
              userData.Name,
              userData.Email,
              userData.Age,
              userData.Address
          );
          this.user.next(user);
          this.cookieService.set('userData', JSON.stringify(user), 183);
          console.log(this.user.value)
        })
    )
  }

  private handleError(errResponse: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (!errResponse.error || !errResponse.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errResponse.error.error.message) {
      case 'UserModel already exists with this Email': {
        errorMessage = 'This email exist, please try logging in.';
        break;
      }
      case 'UserModel not found': {
        errorMessage = 'UserModel not found';
        break;
      }
      case 'TOO_MANY_ATTEMPTS_TRY_LATER': {
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      }
      case 'EMAIL_NOT_FOUND': {
        errorMessage = 'There Email does NOT exist, please Sign Up ';
        break;
      }
      case 'INVALID_PASSWORD': {
        errorMessage = 'The password is invalid';
        break;
      }
      case 'USER_DISABLED': {
        errorMessage = 'You are banned';
        break;
      }
    }
    return throwError(() => errorMessage);
  }
  autoLogin() {
    try{

    }catch (e) {

    }
    const user: {
      UserID: number,
      Name: string,
      Email: string,
      Age: number,
      Address: string
    } = JSON.parse(this.cookieService.get('userData'))
    if (!user) {
      return
    }
    const loadedUser = new UserModel(
      user.UserID,
      user.Name,
      user.Email,
      user.Age,
      user.Address)
    this.user.next(loadedUser);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['']);
    this.cookieService.delete('userData')
  }
  isLoggedIn(){
    return !!this.user;
  }

}
