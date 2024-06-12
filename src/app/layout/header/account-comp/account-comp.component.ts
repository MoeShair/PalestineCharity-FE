import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuDividerDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-account-comp',
  standalone: true,
  imports: [
    CommonModule,
    NzDropDownDirective,
    NzIconDirective,
    NzDropdownMenuComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzMenuDividerDirective
  ],
  templateUrl: './account-comp.component.html',
  styleUrl: './account-comp.component.scss'
})
export class AccountCompComponent{

  constructor(private authService: AuthService) {
  }
  name: string = this.authService.user.value?.userName || 'profile';

  @Input()
  sites: { id: number, name: string }[] = [{id: 1, name: 'sd'},{id: 2, name: 'sd'},{id: 3, name: 'sd'},{id: 4, name: 'sd'}];
  @Input()
  selectedSite: { id: number, name: string } = {id: 1, name: "sd"}
  @Input()
  placement: 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' = 'bottomRight';
  @Input()
  trigger: 'click' | 'hover' = 'click'
  @Output()
  onClick = new EventEmitter<{id: number, name: string}>();
  @Output()
  handleItem(site:{id: number, name: string}){
    this.onClick.emit(site);
    console.log(`${site.name} has been clicked`)
  }
}
