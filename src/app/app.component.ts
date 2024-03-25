import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {LayoutComponent} from "./layout/layout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NzButtonComponent, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PalestineCharity-FE';
}
