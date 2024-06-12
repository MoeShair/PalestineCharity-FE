import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


export interface Font {
  id: string;
  name: string;
  type: string;
  options: string[];
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  getFonts(){
    return this.http.get("http://localhost:3000/posts/fonts")
  }
  getBorders(){
    return this.http.get("http://localhost:3000/posts/borders")
  }
  getProfilePics(){
    return this.http.get("http://localhost:3000/posts/profile-pictures")
  }
  getBackgroundPics(){
    return this.http.get("http://localhost:3000/posts/background")
  }
}
