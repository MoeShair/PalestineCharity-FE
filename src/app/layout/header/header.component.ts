import {Component, Input} from '@angular/core';
import {NzIconModule} from "ng-zorro-antd/icon";
import {LayoutSiderService} from "../layout-sider.service";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzModalModule} from "ng-zorro-antd/modal";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NotificationsComponent} from "./notifications/notifications.component";
import {CommonModule, NgIf, NgOptimizedImage} from "@angular/common";
import {AuthComponent} from "../../auth/auth.component";
import {AccountCompComponent} from "./account-comp/account-comp.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, NgOptimizedImage, RouterLink, RouterLinkActive, NzInputModule, NotificationsComponent, NzIconModule, AuthComponent, NzModalModule, AccountCompComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private siderService:LayoutSiderService) {
  }
  isVisible = false;

  @Input()
  isSideCollapsed: boolean = true;

  @Input()
  isLoggedIn = false;
  onOpenNav(){
    this.siderService.siderSubject.next(! this.isSideCollapsed)
  }
  showModal(): void {
    this.isVisible = true;
  }

  isLogInVisible = false;
  showLogInModal(){
    this.isLogInVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isLogInVisible = false;
  }
}
