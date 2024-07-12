import {Component, OnInit} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";
import {ProfileService} from "../profile/profile.service";
import {Router} from "@angular/router";
import {MySubCampaignsService, SubCampaignsResponse} from "./my-sub-campaigns.service";

@Component({
  selector: 'app-my-sub-campaigns',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzCardComponent
  ],
  templateUrl: './my-sub-campaigns.component.html',
  styleUrl: './my-sub-campaigns.component.scss'
})
export class MySubCampaignsComponent implements OnInit{

  userId: string = ''
  campaigns: SubCampaignsResponse | null = null

  constructor(private mySubCampaigns: MySubCampaignsService,
              private profileService: ProfileService,
              private router: Router) {
  }
  ngOnInit() {
    this.profileService.getUSerInfo().subscribe(response =>{
      this.userId = response?.user._id!

      this.mySubCampaigns.getSubCampaigns(this.userId).subscribe(response =>{
        console.log(response)
        this.campaigns = response
      })
    })

  }
  navigateToCampaign(campaignId: string){
    this.router.navigate(['/sub-campaigns', campaignId]);
  }
}
