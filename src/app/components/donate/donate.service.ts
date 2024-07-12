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

  loggedInDonation(campaignId: string, amount: number, userId: string, anonymous: boolean){
    return this.http.post<donationResponse>('http://localhost:3000/posts/donate',
      {
        campaignId: campaignId,
        userId: userId,
        amount: amount,
        anonymous: anonymous
      }).pipe(tap(resData =>{
        return resData.message
    }))
  }
  notLoggedInDonation(campaignId: string, amount: number){
    return this.http.post<donationResponse>('http://localhost:3000/posts/donate',
      {
        campaignId: campaignId,
        amount: amount
      }).pipe(tap(resData =>{
      return resData.message
    }))
  }
  subCampaignDonation(campaignId: string, amount: number, userId: string, anonymous: boolean){
    return this.http.post<donationResponse>('http://localhost:3000/posts/donate/sub-campaign',
      {
        subCampaignId: campaignId,
        userId: userId,
        amount: amount,
        anonymous: anonymous
      }).pipe(tap(resData =>{
      return resData.message
    }))
  }
}
