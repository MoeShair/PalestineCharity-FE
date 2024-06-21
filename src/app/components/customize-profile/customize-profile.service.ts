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

  updateProfilePic(userId: string, photoUrl: string){
    return this.http.put('http://localhost:3000/posts/updateProfilePicture', {
      userId: userId,
      profilePictureUrl: photoUrl
    })
  }

  updateBgPic(userId: string, photoUrl: string) {
    return this.http.put('http://localhost:3000/posts/updateBackgroundPicture', {
      userId: userId,
      backgroundPictureUrl: photoUrl
    })
  }

  changeFont(userId: string, newFont: string) {
    return this.http.put(`http://localhost:3000/posts/${userId}/font`, {
      font: newFont
    });
  }
}
