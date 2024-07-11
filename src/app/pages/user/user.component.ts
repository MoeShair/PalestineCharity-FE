import {Component, OnInit} from '@angular/core';
import {CustomizeProfileComponent} from "../../components/customize-profile/customize-profile.component";
import {DatePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzModalComponent} from "ng-zorro-antd/modal";
import {NzPopoverDirective} from "ng-zorro-antd/popover";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {User} from "../profile/profile.service";
import {UserService} from "./user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CustomizeProfileComponent,
    DatePipe,
    NgForOf,
    NgIf,
    NzButtonComponent,
    NzModalComponent,
    NzPopoverDirective,
    NzTypographyComponent,
    NgStyle
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{
  userProfile: User | null = null
  username: string = ""
  userEmail: string = ''
  userId = this.route.snapshot.paramMap.get('id');

  popoverVisible: boolean[] = []
  badgeColors = ['#FFD700', '#32CD32', '#1E90FF', '#FF69B4', '#FF4500']


  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.getUSerInfo(this.userId!).subscribe(
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
}
