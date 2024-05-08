import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchApiService {

  constructor(private http: HttpClient) { }

  searchResults(input: string){
    return this.http.get(`http://localhost:3000/posts/campaigns/search/${input}`)
  }
}
