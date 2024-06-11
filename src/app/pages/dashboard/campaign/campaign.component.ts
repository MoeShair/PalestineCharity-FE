import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CampaignResponse, CampaignService, LeaderboardResponse} from "./campaign.service";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";
import {DonateComponent} from "../../../components/donate/donate.component";
import {AuthService} from "../../../auth/auth.service";
import {Subscription} from "rxjs";
import {NgForOf, NgIf} from "@angular/common";
import {NzTableComponent} from "ng-zorro-antd/table";
import {PieChartComponent} from "../../../components/pie-chart/pie-chart.component";
import {ProgressBarComponent} from "../../../components/progress-bar/progress-bar.component";
import {FavouriteService} from "../../favourite/favourite.service";
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {NzEmptyComponent} from "ng-zorro-antd/empty";
import {NzCommentComponent, NzCommentModule} from "ng-zorro-antd/comment";
import {NzFormItemComponent} from "ng-zorro-antd/form";
import {FormsModule} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-campaign',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzCardComponent,
    DonateComponent,
    NgForOf,
    NzTableComponent,
    PieChartComponent,
    ProgressBarComponent,
    NgIf,
    NzTabSetComponent,
    NzTabComponent,
    NzEmptyComponent,
    NzCommentComponent,
    NzCommentModule,
    NzFormItemComponent,
    FormsModule,
    NzInputDirective
  ],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.scss'
})
export class CampaignComponent implements OnInit, OnDestroy{
  private userSubscription: Subscription | null = null;
  campaignId: string = "";
  campaign: CampaignResponse | null = null;
  favourite: boolean = false
  userId : string | null = null
  postText: string = ''
  submitting = false;

  leaderboard: LeaderboardResponse | null = null

  constructor(private route: ActivatedRoute,
              private campaignService: CampaignService,
              private authService: AuthService,
              private favouriteService: FavouriteService,
              private msg: NzMessageService) {
  }
  ngOnInit() {
    this.campaignId = this.route.snapshot.params['id'];
    this.campaignService.loadCampaign(this.campaignId).subscribe(resData=>{
      this.campaign = resData;
      console.log(resData)
    });
    this.campaignService.getLeaderboard(this.campaignId).subscribe(resData =>{
      this.leaderboard = resData
      console.log(this.leaderboard)
    })
    this.userSubscription = this.authService.user.subscribe((user) =>{
      if(user !== null){
        this.userId = user.userID
        this.favouriteService.isFavourite(this.userId, this.campaignId).subscribe((isFavourite) => {
            this.favourite = isFavourite;
            console.log('Is favourite:', this.favourite);
          },
          (error) => {
            console.error('Error checking favourite:', error);
          })
      }
    })
  }
  addFavorite(){
  this.favourite = true;

    this.userSubscription = this.authService.user.subscribe((user) =>{
      if(user !== null){
        this.userId = user.userID
        this.favouriteService.addToFavorite(this.userId, this.campaignId).subscribe(resData =>{
          console.log(resData)
        })
      }
    })
  }
  removeFavourite(){
    this.favourite = false;
    this.userSubscription = this.authService.user.subscribe((user) =>{
      if(user !== null){
        this.userId = user.userID
        this.favouriteService.removeFavorite(this.userId, this.campaignId).subscribe(resData =>{
          console.log(resData)
        })
      }
    })
  }
  getUserName(user: any): string {
    return user.userName || 'Anonymous';
  }
  getProgressPercentage(): string {
    if (this.campaign?.campaign.goalAmount === 0) {
      return '0';
    }
    return ((this.campaign?.campaign.currentAmount! / this.campaign?.campaign.goalAmount!) * 100).toFixed(1);
  }
  getGoalAmount(): number {
    if (this.campaign?.campaign.goalAmount === 0 || this.campaign?.campaign.goalAmount === undefined) {
      return 0;
    }
    return this.campaign?.campaign.goalAmount!
  }
  getCurrentAmount(): number {
    if (this.campaign?.campaign.currentAmount === 0 || this.campaign?.campaign.currentAmount === undefined) {
      return 0;
    }
    return this.campaign?.campaign.currentAmount!
  }
  postNewUpdate(){
    this.submitting = true
    this.campaignService.postNewsUpdate(this.campaignId,this.postText).subscribe()
    this.postText = ''
    this.submitting = false
    this.msg.success("Post added successfully!!")
  }
  ngOnDestroy() {
    this.userSubscription?.unsubscribe()
  }
}
