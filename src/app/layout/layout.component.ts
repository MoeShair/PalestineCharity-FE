import {Component, HostListener, Input} from '@angular/core';
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
import {NgClass} from "@angular/common";
import {LayoutSiderService} from "./layout-sider.service";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
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
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isCollapsed = true;
  @Input() collapsedWidth: number = 70;
  isAuthenticated:boolean = false;

  constructor(private siderService: LayoutSiderService) {
  }
  innerWidth:any;

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.collapsedWidth = this.getCollapsedWidth();
    this.siderService.siderSubject.subscribe((collapsed)=>{
      this.isCollapsed = collapsed
    });
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
