import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuDividerDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";

@Component({
  selector: 'app-account-comp',
  standalone: true,
  imports: [
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
export class AccountCompComponent {
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
  onLog():void{
    console.log('yo');
  }
  @Output()
  handleItem(site:{id: number, name: string}){
    this.onClick.emit(site);
    console.log(`${site.name} has been clicked`)
  }
}
