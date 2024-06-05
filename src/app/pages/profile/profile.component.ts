import {Component, OnInit} from '@angular/core';
import {ProfileService, User} from "./profile.service";
import {DatePipe, JsonPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzPopoverDirective} from "ng-zorro-antd/popover";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {NzModalComponent} from "ng-zorro-antd/modal";
import {CustomizeProfileComponent} from "../../components/customize-profile/customize-profile.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    JsonPipe,
    NgStyle,
    NzButtonComponent,
    NzPopoverDirective,
    NgForOf,
    NzTypographyComponent,
    DatePipe,
    NzModalComponent,
    CustomizeProfileComponent,

  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  userProfile: User | null = null
  username: string = ""
  userEmail: string = ''

  popoverVisible: boolean[] = []
  badgeColors = ['#FFD700', '#32CD32', '#1E90FF', '#FF69B4', '#FF4500']

  isVisible = false;
  isConfirmLoading = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getUSerInfo().subscribe(
      (resData) => {
        this.userProfile = resData;
        this.username = resData?.user.Name || ''
        this.userEmail = resData?.user.Email || ''
        this.popoverVisible = this.userProfile?.user?.Badges.map(() => false) || [];
        console.log(this.userProfile);
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );
  }
  onPopoverVisibleChange(index: number, visible: boolean): void {
    this.popoverVisible = this.popoverVisible.map(() => false)
    this.popoverVisible[index] = visible
  }

  showModal(): void {
    this.isVisible = true;
  }
  handleCancel(): void {
    this.isVisible = false;
  }

}
