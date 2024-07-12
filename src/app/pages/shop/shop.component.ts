import {Component, OnInit} from '@angular/core';
import {ShopItem, ShopService} from "./shop.service";
import {NzCardComponent} from "ng-zorro-antd/card";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {ProfileService, User} from "../profile/profile.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {InventoryService} from "../inventory/inventory.service";
import {catchError, map, Observable, of} from "rxjs";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    NzCardComponent,
    NgForOf,
    NgIf,
    NzButtonComponent,
    AsyncPipe
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{

  fonts: ShopItem[] | null = null
  ProfilePics: ShopItem[] | null = null
  BackgroundPics: ShopItem[] | null = null
  user: User| null = null
  userId = ""
  itemPrice: number = 0

  constructor(private shop: ShopService,
              private profileService: ProfileService,
              private message: NzMessageService,
              private inventoryService: InventoryService) {
  }
  ngOnInit() {
    this.profileService.getUSerInfo().subscribe(response =>{
      this.userId = response?.user._id!
      this.user = response
    })

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
  }
  buyItem(itemId: string){
      this.shop.buyItem(this.userId, itemId).subscribe(

        () => {
          this.message.success('Item purchased successfully!');
        },
        (error) => {
          console.error('Error buying item:', error);
          this.message.error(error.error.message);
        })

  }

  isItemOwned(item: ShopItem): Observable<boolean> {
    let inventoryServiceCall: Observable<any>;
    console.log(this.userId)

    switch (item.type) {
      case 'picture':
        inventoryServiceCall = this.inventoryService.userProfilePics(this.userId);
        break;
      case 'background':
        inventoryServiceCall = this.inventoryService.userBgs(this.userId);
        break;
      case 'font':
        inventoryServiceCall = this.inventoryService.userFonts(this.userId);
        break;
      default:
        return of(false); // Handle unknown item types gracefully
    }

    return inventoryServiceCall.pipe(
      map(response => response.includes(item)), // Assuming response is an array
      catchError(() => of(false)) // Handle errors gracefully
    );
  }

}
