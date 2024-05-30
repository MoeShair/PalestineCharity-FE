import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth/auth.service";
import {of, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http : HttpClient,
              private authService: AuthService) { }

  getUSerInfo(){
    return this.authService.user.pipe(
      switchMap(user => {
        if (user !== null) {
          let userId = user.userID;
          return this.http.get(`http://localhost:3000/posts/user/${userId}`);
        } else {
          return of(null); 
        }
      })
    );
  }
}
