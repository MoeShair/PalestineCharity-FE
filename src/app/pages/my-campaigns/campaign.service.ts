import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CampaignResponse} from "../dashboard/campaign/campaign.service";


interface Campaign {
  _id: string;
  campaignName: string;
  campaignImage: string;
  organizationName: string;
  goalAmount: number;
  status: string;
  currentAmount: number;
  startDate: string;
  endDate: string;
  description: string;
  newsDashboard: any[];
  leaderboard: any[];
  __v: number;
}

export interface MyCampResponse {
  campaigns: Campaign[];
}

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }

  getOrganizationCampaigns(userId: string){
    return this.http.get<MyCampResponse>(`http://localhost:3000/posts/organization/campaigns/${userId}`)
  }
}
