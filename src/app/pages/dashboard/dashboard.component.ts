import {Component, OnInit} from '@angular/core';
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {DashboardService} from "./dashboard.service";
import {Campaign} from "./campaign.model";
import {NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NzCardComponent,
    NzButtonComponent,
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  campaigns :Campaign[]= []


    ngOnInit() {
        this.campaigns = this.dashboardService.campaigns.value!;
        console.log(this.campaigns)
    }

}
