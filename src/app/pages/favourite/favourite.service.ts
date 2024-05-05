import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private http: HttpClient) { }

  loadFavorites(userId: string){
    return this.http.get<any>(`http://localhost:3000/posts/favorite-campaigns/${userId}`)
  }
}
