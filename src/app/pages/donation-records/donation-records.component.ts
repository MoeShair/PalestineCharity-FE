import {Component, OnInit} from '@angular/core';
import {NzTableComponent, NzThMeasureDirective} from "ng-zorro-antd/table";
import {DonationRecord, ProfileService} from "../profile/profile.service";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-donation-records',
  standalone: true,
  imports: [
    NzTableComponent,
    NzThMeasureDirective,
    DatePipe,
    NgForOf
  ],
  templateUrl: './donation-records.component.html',
  styleUrl: './donation-records.component.scss'
})
export class DonationRecordsComponent implements OnInit{
  donationRecords: DonationRecord[] = [];
  loading = true;
  campaignName: string = ''

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getUSerInfo().subscribe(responseData => {
      this.donationRecords = responseData?.user.Donationrecords!;
      this.loading = false;
    });
  }
  getCampaignName(){

  }
}
