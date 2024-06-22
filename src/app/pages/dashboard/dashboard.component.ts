import {Component, OnInit} from '@angular/core';
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {DashboardService} from "./dashboard.service";
import {Campaign} from "./campaign.model";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";
import {AddCampaignComponent} from "../../components/add-campaign/add-campaign.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NzCardComponent,
    NzButtonComponent,
    NgForOf,
    NgOptimizedImage,
    AddCampaignComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService,
              private router: Router) {
  }

  campaigns :Campaign[]= []


    ngOnInit() {
        this.campaigns = this.dashboardService.campaigns.value!;
    }

  navigateToCampaign(campaignId: string){
      this.router.navigate(['/campaign', campaignId]);
  }

}
