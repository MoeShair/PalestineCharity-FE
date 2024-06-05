import {Component, OnInit} from '@angular/core';
import {ProfileService, User} from "../../pages/profile/profile.service";
import {NzUploadComponent} from "ng-zorro-antd/upload";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-customize-profile',
  standalone: true,
  imports: [
    NzUploadComponent,
    NzButtonComponent,
    NzIconDirective
  ],
  templateUrl: './customize-profile.component.html',
  styleUrl: './customize-profile.component.scss'
})
export class CustomizeProfileComponent implements OnInit{
  userProfile: User | null = null


  constructor(private profileService: ProfileService) {
  }
  ngOnInit() {
    this.profileService.getUSerInfo().subscribe(
      (resData) => {
        this.userProfile = resData;
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );
  }
}
