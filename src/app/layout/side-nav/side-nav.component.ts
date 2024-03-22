import { Component } from '@angular/core';
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    NzSubMenuComponent,
    NzMenuItemComponent,
    NzIconDirective,
    NzMenuDirective
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {

}
