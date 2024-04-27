import {Component, HostListener, Input, ViewEncapsulation} from '@angular/core';
import {
  NzContentComponent,
  NzFooterComponent,
  NzHeaderComponent,
  NzLayoutComponent,
  NzSiderComponent
} from "ng-zorro-antd/layout";
import {HeaderComponent} from "./header/header.component";
import {SideNavComponent} from "./side-nav/side-nav.component";
import {FooterComponent} from "./footer/footer.component";
import {CommonModule, NgClass} from "@angular/common";
import {LayoutSiderService} from "./layout-sider.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    NzLayoutComponent,
    NzHeaderComponent,
    HeaderComponent,
    NzSiderComponent,
    SideNavComponent,
    NzContentComponent,
    NzFooterComponent,
    FooterComponent,
    NgClass
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent {
  isCollapsed = true;
  @Input() collapsedWidth: number = 70;
  isAuthenticated:boolean = false;

  constructor(private siderService: LayoutSiderService,
              private authService: AuthService) {
  }

  innerWidth:any;

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.collapsedWidth = this.getCollapsedWidth();
    this.siderService.siderSubject.subscribe((collapsed)=>{
      this.isCollapsed = collapsed
    });
    this.authService.user.subscribe(user =>{
      this.isAuthenticated = !!user;
    })
    this.setSideNavWidth();
  }

  getCollapsedWidth(){
    if(this.innerWidth>=768){
      return 70
    }
    else{
      return 0
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.setSideNavWidth();
    this.isCollapsed = true;
  };

  onHoverIn(){
    if(this.innerWidth>=768){
      return this.isCollapsed = !this.isCollapsed
    }
    return
  }
  setSideNavWidth(){
    if(this.innerWidth< 640){
      return this.innerWidth;
    }
    else{
      return 200;
    }
  }
}
