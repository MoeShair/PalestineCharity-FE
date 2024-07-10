import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


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

export interface SubCampaignsResponse {
  subCampaigns: SubCampaign[];
}

@Injectable({
  providedIn: 'root'
})
export class MySubCampaignsService {

  constructor( private http: HttpClient) { }
  getSubCampaigns(userId: string){
    console.log(userId)
    return this.http.get<SubCampaignsResponse>(`http://localhost:3000/posts/influencer/${userId}/sub-campaigns`)
  }
}
