import { Component } from '@angular/core';
import {ShopService} from "./shop.service";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {

  constructor(private shop: ShopService) {
  }

}
