import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as http from "node:http";

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  constructor(private http: HttpClient) { }

  getChartData(){
    return this.http.get('http://localhost:3000/posts/chart')
  }
}
