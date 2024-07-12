import {Component, OnDestroy, OnInit} from '@angular/core';
import {AddSubcampaignComponent} from "../../components/add-subcampaign/add-subcampaign.component";
import {DonateComponent} from "../../components/donate/donate.component";
import {NgForOf, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzCommentComponent, NzCommentContentDirective} from "ng-zorro-antd/comment";
import {NzEmptyComponent} from "ng-zorro-antd/empty";
import {NzFormItemComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {PieChartComponent} from "../../components/pie-chart/pie-chart.component";
import {ProgressBarComponent} from "../../components/progress-bar/progress-bar.component";
import {ReactiveFormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {CampaignResponse, CampaignService, LeaderboardResponse} from "../dashboard/campaign/campaign.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {FavouriteService} from "../favourite/favourite.service";
import {ProfileService} from "../profile/profile.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {LoadSubCampaignResponse, SubCampaignService, SubLeaderboardResponse} from "./sub-campaign.service";

@Component({
  selector: 'app-sub-campaign',
  standalone: true,
  imports: [
    AddSubcampaignComponent,
    DonateComponent,
    NgForOf,
    NgIf,
    NzButtonComponent,
    NzCardComponent,
    NzCommentComponent,
    NzCommentContentDirective,
    NzEmptyComponent,
    NzFormItemComponent,
    NzInputDirective,
    NzTabComponent,
    NzTabSetComponent,
    PieChartComponent,
    ProgressBarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './sub-campaign.component.html',
  styleUrl: './sub-campaign.component.scss'
})
export class SubCampaignComponent implements OnInit, OnDestroy{
  private userSubscription: Subscription | null = null;
  campaignId: string = "";
  campaign: LoadSubCampaignResponse | null = null;
  favourite: boolean = false
  userId : string | null = null
  postText: string = ''
  role: string = ''
  submitting = false;

  leaderboard: SubLeaderboardResponse | null = null

  constructor(private route: ActivatedRoute,
              private subCampaignService: SubCampaignService,
              private authService: AuthService,
              private favouriteService: FavouriteService,
              private profileService: ProfileService,
              private msg: NzMessageService) {
  }
  ngOnInit() {
    this.profileService.getUSerInfo().subscribe(response =>{
      this.role = response?.user.Role!
    })
    this.campaignId = this.route.snapshot.params['id'];
    this.subCampaignService.loadCampaign(this.campaignId).subscribe(resData=>{
      this.campaign = resData;
      console.log(resData)
    });
    this.subCampaignService.getLeaderboard(this.campaignId).subscribe(resData =>{
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
    return user.name || 'Anonymous';
  }
  getProgressPercentage(): string {
    if (this.campaign?.subCampaign.goalAmount === 0) {
      return '0';
    }
    return ((this.campaign?.subCampaign.currentAmount! / this.campaign?.subCampaign.goalAmount!) * 100).toFixed(1);
  }
  getGoalAmount(): number {
    if (this.campaign?.subCampaign.goalAmount === 0 || this.campaign?.subCampaign.goalAmount === undefined) {
      return 0;
    }
    return this.campaign?.subCampaign.goalAmount!
  }
  getCurrentAmount(): number {
    if (this.campaign?.subCampaign.currentAmount === 0 || this.campaign?.subCampaign.currentAmount === undefined) {
      return 0;
    }
    return this.campaign?.subCampaign.currentAmount!
  }
  share(){
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: 'Check out this amazing content!',
        url: window.location.href
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.error('Error sharing', error));
    } else {
      console.warn('Web Share API not supported in this browser.');
    }
  }
  ngOnDestroy() {
    this.userSubscription?.unsubscribe()
  }
}
