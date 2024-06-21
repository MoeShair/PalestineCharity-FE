import {Component, OnInit} from '@angular/core';
import {ShopItem, ShopService} from "./shop.service";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NgForOf, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {ProfileService} from "../profile/profile.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    NzCardComponent,
    NgForOf,
    NgIf,
    NzButtonComponent
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{

  fonts: ShopItem[] | null = null
  // borders: ShopItem[] | null = null
  ProfilePics: ShopItem[] | null = null
  BackgroundPics: ShopItem[] | null = null
  userId = ""

  constructor(private shop: ShopService,
              private profileService: ProfileService,
              private message: NzMessageService) {
  }
  ngOnInit() {
    this.shop.getFonts().subscribe(response =>{
      if(response){
        this.fonts = response
      }
    })

    // this.shop.getBorders().subscribe(response =>{
    //   if(response){
    //     this.borders = response
    //   }
    // })

    this.shop.getProfilePics().subscribe(response =>{
      if(response){
        this.ProfilePics = response
      }
    })

    this.shop.getBackgroundPics().subscribe(response =>{
      if(response){
        this.BackgroundPics = response
      }
    })

    this.profileService.getUSerInfo().subscribe(response =>{
      this.userId = response?.user._id!
    })
  }
  buyItem(itemId: string){
    this.shop.buyItem(this.userId, itemId).subscribe(
      () => {
        this.message.success('Item purchased successfully!');
      },
      (error) => {
        console.error('Error buying item:', error);
        this.message.error('Failed to buy item. Please try again later.');
      })
  }

}
