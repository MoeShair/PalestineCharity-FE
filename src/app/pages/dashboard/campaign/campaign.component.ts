import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CampaignResponse, CampaignService, LeaderboardResponse} from "./campaign.service";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";
import {DonateComponent} from "../../../components/donate/donate.component";
import {AuthService} from "../../../auth/auth.service";
import {Subscription} from "rxjs";
import {NgForOf} from "@angular/common";
import {NzTableComponent} from "ng-zorro-antd/table";

@Component({
  selector: 'app-campaign',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzCardComponent,
    DonateComponent,
    NgForOf,
    NzTableComponent
  ],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.scss'
})
export class CampaignComponent implements OnInit, OnDestroy{
  private userSubscription: Subscription | null = null;
  campaignId: string = "";
  campaign: CampaignResponse | null = null;

  leaderboard: LeaderboardResponse | null = null

  constructor(private route: ActivatedRoute,
              private campaignService: CampaignService,
              private authService: AuthService) {
  }
  ngOnInit() {
    this.campaignId = this.route.snapshot.params['id'];
    this.campaignService.loadCampaign(this.campaignId).subscribe(resData=>{
      this.campaign = resData;
    });
    this.campaignService.getLeaderboard(this.campaignId).subscribe(resData =>{
      this.leaderboard = resData
      console.log(this.leaderboard)
    })
  }
  addFavorite(){
    let userId : string | null = null
    this.userSubscription = this.authService.user.subscribe((user) =>{
      if(user !== null){
        userId = user.userID
        this.campaignService.addToFavorite(userId, this.campaignId).subscribe(resData =>{
          console.log(resData)
        })
      }
    })

  }
  getUserName(user: any): string {
    return user.userName || 'Anonymous';
  }
  ngOnDestroy() {
    this.userSubscription?.unsubscribe()
  }
}
