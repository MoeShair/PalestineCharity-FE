import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AddCampaignService {

  constructor(private http: HttpClient) { }

  addCampaign(){
    return this.http.post('http://localhost:3000/posts/addcamp',{

    })
  }
}
