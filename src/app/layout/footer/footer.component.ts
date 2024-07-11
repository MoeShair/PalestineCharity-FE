import { Component } from '@angular/core';
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NzIconDirective
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  gmail:string = 'hamoda.tam@gmail.com'
}
