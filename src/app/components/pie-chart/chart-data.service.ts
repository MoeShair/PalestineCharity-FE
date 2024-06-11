import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  constructor(private http: HttpClient) { }

  getChartData(campaignId: string){
    return this.http.get(`http://localhost:3000/posts/chart/${campaignId}`)
  }
}
