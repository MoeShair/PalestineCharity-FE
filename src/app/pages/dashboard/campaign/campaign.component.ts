import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CampaignResponse, CampaignService} from "./campaign.service";
import {Campaign} from "../campaign.model";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";
import {DonateComponent} from "../../../components/donate/donate.component";

@Component({
  selector: 'app-campaign',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzCardComponent,
    DonateComponent
  ],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.scss'
})
export class CampaignComponent implements OnInit{

  campaignId: string = "";
  campaign: CampaignResponse | null = null;
  constructor(private route: ActivatedRoute,
              private campaignService: CampaignService) {
  }
  ngOnInit() {
    this.campaignId = this.route.snapshot.params['id'];
    this.campaignService.loadCampaign(this.campaignId).subscribe(resData=>{
      this.campaign = resData;
      console.log(this.campaign);
    });
    console.log(this.campaign);
  }
}
