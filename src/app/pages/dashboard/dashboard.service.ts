import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
//import {UserModel} from "../../auth/user.model";
import {Campaign} from "./campaign.model";

// export interface CampaignResponse {
//   campaigns:{
//       campaignName: string;
//       campaignImage: string;
//       organizationName: string;
//       goalAmount: number;
//       status: "Active" | "Suspended" | "Ended";
//       currentAmount?: number;
//       startDate: string;
//       endDate: string;
//       leaderboard: UserModel[];
//       description?: string;
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  campaigns = new BehaviorSubject<Campaign[] | null>(null);

  constructor(private http: HttpClient) {
  }

  getCampaigns() {
    return this.http.get<any>('http://localhost:3000/posts/campaigns?page=1&limit=10').pipe(catchError(this.handleError),
      tap(resData => {
        const campaignData = resData.campaigns
        let campaigns : Campaign[] = [];
        for (const campaign of campaignData) {
          campaigns.push(new Campaign(
              campaign.campaignName,
              campaign.campaignImage,
              campaign.organizationName,
              campaign.goalAmount,
              campaign.status,
              campaign.currentAmount,
              new Date(campaign.startDate),
              new Date(campaign.endDate),
              campaign.leaderboard,
              campaign.description,
              campaign.newsDashboard,
              campaign._id
          ))
        }
        this.campaigns.next(campaigns);
    }))
  }

  private handleError(errResponse: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (!errResponse.error || !errResponse.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errResponse.error.error.message) {
      case 'UserModel already exists with this Email': {
        errorMessage = 'This email exist, please try logging in.';
        break;
      }
      case 'UserModel not found': {
        errorMessage = 'UserModel not found';
        break;
      }
      case 'TOO_MANY_ATTEMPTS_TRY_LATER': {
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      }
      case 'EMAIL_NOT_FOUND': {
        errorMessage = 'There Email does NOT exist, please Sign Up ';
        break;
      }
      case 'INVALID_PASSWORD': {
        errorMessage = 'The password is invalid';
        break;
      }
      case 'USER_DISABLED': {
        errorMessage = 'You are banned';
        break;
      }
    }
    return throwError(() => errorMessage);
  }
}
