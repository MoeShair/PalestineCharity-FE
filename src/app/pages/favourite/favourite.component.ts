import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";
import {FavouriteService} from "./favourite.service";
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Campaign} from "../dashboard/campaign.model";

@Component({
  selector: 'app-favourite',
  standalone: true,
  imports: [
    NgForOf,
    NzButtonComponent,
    NzCardComponent
  ],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.scss'
})
export class FavouriteComponent implements OnInit, OnDestroy{
  private userSubscription: Subscription | null = null;
  campaigns :Campaign[]= []

  constructor(private favouriteService: FavouriteService,
              private authService: AuthService,
              private router: Router) {
  }
  ngOnInit() {
    let userId: string | null = null
    this.userSubscription = this.authService.user.subscribe((user)=>{
      if(user !== null){
        userId = user.userID
        this.favouriteService.loadFavorites(userId).subscribe(resData =>{
          const campaignData = resData.favoriteCampaigns

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
              campaign._id
            ))
          }
          this.campaigns = campaigns
        })
      }
    })

  }
  navigateToCampaign(campaignId: string){
    this.router.navigate(['/campaign', campaignId]);
  }
  ngOnDestroy() {
    this.userSubscription?.unsubscribe()
  }
}
