import {Component, OnInit} from '@angular/core';
import {CampaignService, MyCampResponse} from "./campaign.service";
import {ProfileService} from "../profile/profile.service";
import {NgForOf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-campaigns',
  standalone: true,
  imports: [
    NgForOf,
    NzButtonComponent,
    NzCardComponent
  ],
  templateUrl: './my-campaigns.component.html',
  styleUrl: './my-campaigns.component.scss'
})
export class MyCampaignsComponent implements OnInit{

  userId: string = ''
  campaigns: MyCampResponse | null = null

  constructor(private myCampaignService: CampaignService,
              private profileService: ProfileService,
              private router: Router) {
  }
  ngOnInit() {
    this.profileService.getUSerInfo().subscribe(response =>{
      this.userId = response?.user._id!

      this.myCampaignService.getOrganizationCampaigns(this.userId).subscribe(response =>{
        console.log(response)
        this.campaigns = response
      })
    })

}
  navigateToCampaign(campaignId: string){
    this.router.navigate(['/campaign', campaignId]);
  }
}
