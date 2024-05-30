import {Component, OnInit} from '@angular/core';
import {ProfileService} from "./profile.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.profileService.getUSerInfo().subscribe(resData  =>{
      console.log(resData)
    })
  }

}
