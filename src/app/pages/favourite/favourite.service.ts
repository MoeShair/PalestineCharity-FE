import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private http: HttpClient) { }

  loadFavorites(userId: string){
    return this.http.get<any>(`http://localhost:3000/posts/favorite-campaigns/${userId}`)
  }
  removeFavorite(userId: string, campaignId: string){
    return this.http.delete<any>(`http://localhost:3000/posts/remove-favorite/${userId}/${campaignId}`,{})
  }
  addToFavorite(userId: string, campaignId: string){
    return this.http.post('http://localhost:3000/posts/add-favorite',
      {
        userId:userId,
        campaignId: campaignId
      }).pipe(tap(resData=>{
      //console.log(resData)
    }))
  }
  isFavourite(userId: string, campaignId: string){
    return this.loadFavorites(userId).pipe(
      map(resData =>{
        return resData.favoriteCampaigns.some((campaign: { _id: string; }) => campaign._id === campaignId)
      })
    )
  }
}
