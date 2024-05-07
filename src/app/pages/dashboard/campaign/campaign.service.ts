import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, tap} from "rxjs";
import {Campaign} from "../campaign.model";
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../../../auth/user.model";

export interface CampaignResponse {
  campaign:{
      campaignName: string;
      campaignImage: string;
      organizationName: string;
      goalAmount: number;
      status: "Active" | "Suspended" | "Ended";
      currentAmount: number;
      startDate: string;
      endDate: string;
      leaderboard: UserModel[];
      description: string;
      _id: string;
  }
}

export interface LeaderboardEntry {
  userId: string;
  userName?: string;
  amountDonated: number;
}

export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
}

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  //campaign = new BehaviorSubject<Campaign | null>(null);
  constructor(private http: HttpClient) { }

  loadCampaign(id: string) {
    return this.http.get<CampaignResponse>(`http://localhost:3000/posts/campaign/${id}`).pipe(tap(resData=>{
        const campaignData = resData.campaign;
        //console.log('Campaign data:', campaignData);
        return(new Campaign(
            campaignData.campaignName,
            campaignData.campaignImage,
            campaignData.organizationName,
            campaignData.goalAmount,
            campaignData.status,
            campaignData.currentAmount,
            new Date(campaignData.startDate),
            new Date(campaignData.endDate),
            campaignData.leaderboard,
            campaignData.description,
            campaignData._id
        ))
    }))
  }
  // addToFavorite(userId: string, campaignId: string){
  //   return this.http.post('http://localhost:3000/posts/add-favorite',
  //     {
  //       userId:userId,
  //       campaignId: campaignId
  //     }).pipe(tap(resData=>{
  //     //console.log(resData)
  //   }))
  // }
  getLeaderboard(campaignId: string){
    return this.http.get<LeaderboardResponse>(`http://localhost:3000/posts/${campaignId}/leaderboard`)
  }
}
