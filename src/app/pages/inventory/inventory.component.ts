import {Component, OnInit} from '@angular/core';
import {ShopItem} from "../shop/shop.service";
import {InventoryService} from "./inventory.service";
import {ProfileService} from "../profile/profile.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {NgForOf, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzEmptyComponent} from "ng-zorro-antd/empty";
import {RouterLink} from "@angular/router";
import {CustomizeProfileService} from "../../components/customize-profile/customize-profile.service";
import {catchError, tap, throwError} from "rxjs";

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NzButtonComponent,
    NzCardComponent,
    NzEmptyComponent,
    RouterLink
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit{

  fonts: ShopItem[] | null = null
  // borders: ShopItem[] | null = null
  ProfilePics: ShopItem[] | null = null
  BackgroundPics: ShopItem[] | null = null
  userId = ""

  constructor(private inventoryService: InventoryService,
              private profileService: ProfileService,
              private message: NzMessageService,
              private customizeService: CustomizeProfileService) {
  }
  ngOnInit() {
    this.profileService.getUSerInfo().subscribe(response =>{
      this.userId = response?.user._id!

      this.inventoryService.userFonts(this.userId).subscribe(response =>{
        if(response){
          this.fonts = response
        }
      })

      this.inventoryService.userProfilePics(this.userId).subscribe(response =>{
        if(response){
          this.ProfilePics = response
        }
      })

      this.inventoryService.userBgs(this.userId).subscribe(response =>{
        if(response){
          this.BackgroundPics = response
        }
      })
    })
  }

  useItem(item: ShopItem){
    if (item.type === 'picture') {
      this.customizeService.updateProfilePic(this.userId, item.url!).pipe(
        tap(() => this.message.success('profile updated successfully!')),
        catchError(error => {
          this.message.error('Failed to customize profile. Please try again later.');
          return throwError(() => new Error('Error customizing profile')); // Throw a new error with a specific message
        })
      ).subscribe();
    }

    else if (item.type === 'background') {
      this.customizeService.updateBgPic(this.userId, item.url!).pipe(
        tap(() => this.message.success('profile updated successfully!')),
        catchError(error => {
          this.message.error('Failed to customize profile. Please try again later.');
          return throwError(() => new Error('Error customizing profile')); // Throw a new error with a specific message
        })
      ).subscribe();
    }

    else if (item.type === 'font') {
      this.customizeService.changeFont(this.userId, item.name).pipe(
        tap(() => this.message.success('profile updated successfully!')),
        catchError(error => {
          this.message.error('Failed to customize profile. Please try again later.');
          return throwError(() => new Error('Error customizing profile')); // Throw a new error with a specific message
        })
      ).subscribe();
    }
  }
}
