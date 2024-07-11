import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth/auth.service";
import {User} from "../profile/profile.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient,
              private authService: AuthService) { }

  getUSerInfo(userId: string){
    return this.http.get<User>(`http://localhost:3000/posts/user/${userId}`);
  }
}
