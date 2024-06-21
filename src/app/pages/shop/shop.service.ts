import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface ShopItem {
  id: string;
  name: string;
  type: string;
  url?: string;
  price: number;
}


@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  getFonts(){
    return this.http.get<ShopItem[]>("http://localhost:3000/posts/fonts")
  }
  getBorders(){
    return this.http.get<ShopItem[]>("http://localhost:3000/posts/borders")
  }
  getProfilePics(){
    return this.http.get<ShopItem[]>("http://localhost:3000/posts/profile-pictures")
  }
  getBackgroundPics(){
    return this.http.get<ShopItem[]>("http://localhost:3000/posts/background")
  }
  buyItem(userId: string, itemId: string){
    return this.http.post("http://localhost:3000/posts/buyItem",{
      userId: userId,
      itemId: itemId
    })
  }
}
