import { Component } from '@angular/core';
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzMenuDirective, NzMenuDividerDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    NzDropDownDirective,
    NzDropdownMenuComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzMenuDividerDirective
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {

}
