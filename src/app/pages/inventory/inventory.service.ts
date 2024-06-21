import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ShopItem} from "../shop/shop.service";
import {use} from "chai";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  userFonts(userId: string){
    return this.http.get<ShopItem[]>(`http://localhost:3000/posts/user/${userId}/fonts`)
  }
  userProfilePics(userId: string){
    return this.http.get<ShopItem[]>(`http://localhost:3000/posts/user/${userId}/profile-pictures`)
  }
  userBgs(userId: string){
    return this.http.get<ShopItem[]>(`http://localhost:3000/posts/user/${userId}/backgrounds`)
  }
}
