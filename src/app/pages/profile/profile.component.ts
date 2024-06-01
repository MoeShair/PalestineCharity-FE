import {Component, OnInit} from '@angular/core';
import {ProfileService, User} from "./profile.service";
import {JsonPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    JsonPipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  userProfile: User | null = null
  username: string = ""
  userEmail: string = ''

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getUSerInfo().subscribe(
      (resData) => {
        this.userProfile = resData;
        this.username = resData?.user.Name || ''
        this.userEmail = resData?.user.Email || ''
        console.log(this.userProfile);
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );
  }

}
