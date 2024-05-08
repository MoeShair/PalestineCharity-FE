import {Component, Input, OnInit} from '@angular/core';
import {NzIconModule} from "ng-zorro-antd/icon";
import {LayoutSiderService} from "../layout-sider.service";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzModalModule} from "ng-zorro-antd/modal";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NotificationsComponent} from "./notifications/notifications.component";
import {CommonModule, NgIf, NgOptimizedImage} from "@angular/common";
import {AuthComponent} from "../../auth/auth.component";
import {AccountCompComponent} from "./account-comp/account-comp.component";
import {FormsModule} from "@angular/forms";
import {SearchApiService} from "./search-api.service";
import {debounceTime, distinctUntilChanged, of, Subject, Subscription, switchMap} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, NgOptimizedImage, RouterLink, RouterLinkActive, NzInputModule, NotificationsComponent, NzIconModule, AuthComponent, NzModalModule, AccountCompComponent, FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  searchQuery: string = '';
  private searchTerms = new Subject<string>();
  private searchSubscription: Subscription;

  constructor(private siderService:LayoutSiderService,
              private searchApiService: SearchApiService) {
    this.searchSubscription = this.searchTerms.pipe(
      debounceTime(300), // Adjust the debounce time as needed
      distinctUntilChanged(),
      switchMap((query: string) => {
        if (query.trim() !== '') {
          return this.searchApiService.searchResults(query);
        } else {
          // If query is empty, return an observable with empty results
          return of([]);
        }
      })
    ).subscribe(
      (resData) => {
        console.log(resData);
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }
  ngOnInit() {

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
  searchCampaigns(){
    this.searchTerms.next(this.searchQuery);
  }
}
