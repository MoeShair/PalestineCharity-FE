import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth/auth.service";
import {of, switchMap} from "rxjs";


interface Badge {
  _id: string;
  badgePic: string;
  badgeName: string;
  description: string;
  date: string; // ISO date string
  acquired: boolean;
  user: string;
  __v: number;
}

interface Campaign {
  _id: string;
  campaignName: string;
  campaignImage: string;
  organizationName: string;
  goalAmount: number;
  status: string;
  currentAmount: number;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  description: string;
  __v: number;
}

interface DonationRecord {
  _id: string;
  campaign: Campaign;
  amount: number;
  tokensEarned: number;
  donationDate: string; // ISO date string
}

export interface User {
  user :{
    _id: string;
    Name: string;
    Address: string;
    Age: string; // ISO date string
    Email: string;
    token: number;
    Badges: Badge[];
    favorite: string[]; // Array of campaign IDs
    PhoneNumber: string;
    Donationrecords: DonationRecord[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http : HttpClient,
              private authService: AuthService) { }

  getUSerInfo(){
    return this.authService.user.pipe(
      switchMap(user => {
        if (user !== null) {
          let userId = user.userID;
          return this.http.get<User>(`http://localhost:3000/posts/user/${userId}`);
        } else {
          return of(null);
        }
      })
    );
  }
}
