import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomizeProfileService {

  constructor(private http: HttpClient) { }

  updateBiography(userId: string, biography: string){
    return this.http.put(`http://localhost:3000/posts/${userId}/biography`,{
      biography: biography
    })
  }
}
