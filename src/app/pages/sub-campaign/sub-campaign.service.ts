import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {Campaign} from "../dashboard/campaign.model";
import {CampaignResponse, LeaderboardEntry, LeaderboardResponse} from "../dashboard/campaign/campaign.service";

interface SubCampaign {
  _id: string;
  parentCampaign: string;
  influencer: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  goalAmount: number;
  currentAmount: number;
  donations: any[];
  approved: boolean;
  status: string;
  campaignImage: string;
  leaderboard: any[];
  __v: number;
}

export interface SubLeaderboardEntry {
  id: string;
  name?: string;
  amount: number;
  role: string
}
export interface SubLeaderboardResponse {
  leaderboard: SubLeaderboardEntry[];
}
export interface LoadSubCampaignResponse {
  subCampaign: SubCampaign;
}
@Injectable({
  providedIn: 'root'
})
export class SubCampaignService {
  constructor(private http: HttpClient) { }

  loadCampaign(id: string) {
    return this.http.get<LoadSubCampaignResponse>(`http://localhost:3000/posts/sub-campaigns/${id}`)
  }

  getLeaderboard(campaignId: string){
    return this.http.get<SubLeaderboardResponse>(`http://localhost:3000/posts/sub-campaigns/${campaignId}/leaderboard`)
  }
  // postNewsUpdate(campaignId: string, news: string){
  //   return this.http.post(`http://localhost:3000/posts/campaigns/${campaignId}/news`,{
  //     news: news
  //   })
  // }
}
