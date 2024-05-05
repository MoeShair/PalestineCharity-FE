import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

export interface donationResponse{
  message : string
}

@Injectable({
  providedIn: 'root'
})
export class DonateService {

  constructor(private http: HttpClient) { }

  loggedInDonation(campaignId: string, amount: number, userId: string){
    return this.http.post<donationResponse>('http://localhost:3000/posts/donate',
      {
        campaignId: campaignId,
        userId: userId,
        amount: amount
      }).pipe(tap(resData =>{
        return resData.message
    }))
  }
}
