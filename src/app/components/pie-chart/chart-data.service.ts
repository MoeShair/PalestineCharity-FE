import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface Place {
  address: string | null;
  totalDonation: number;
  donationRate: number;
}

export interface DonationData {
  totalDonationAllPlaces: number;
  places: Place[];
}

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  constructor(private http: HttpClient) { }

  getChartData(campaignId: string){
    return this.http.get<DonationData>(`http://localhost:3000/posts/chart/${campaignId}`)
  }
}
