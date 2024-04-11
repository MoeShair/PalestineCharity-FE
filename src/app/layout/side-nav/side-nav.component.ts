import {Component, HostListener, Input} from '@angular/core';
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzDrawerComponent, NzDrawerPlacement} from "ng-zorro-antd/drawer";
import {LayoutSiderService} from "../layout-sider.service";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NgClass} from "@angular/common";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    NzSubMenuComponent,
    NzMenuItemComponent,
    NzIconDirective,
    NzMenuDirective,
    NzDrawerComponent,
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  constructor(private siderService: LayoutSiderService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) {
  }
  @Input()
  isSideNavCollapsed = false;

  isRouteActive(routePath: string): boolean {
    return this.router.isActive(routePath, true);
  }

  innerWidth:any;
  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }
  @HostListener('window:resize', ['$event'])
  onResized() {
    this.innerWidth = window.innerWidth;
  };
  onItemClicked(){
    if(this.innerWidth<=768){
      this.siderService.siderSubject.next(true);
    }
    //this.iconsState = "fill"
  }

  logOut(){
    this.authService.logout();
  }
}
