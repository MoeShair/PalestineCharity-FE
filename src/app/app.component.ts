import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {LayoutComponent} from "./layout/layout.component";
import {AuthService} from "./auth/auth.service";
import {DashboardService} from "./pages/dashboard/dashboard.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NzButtonComponent, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'PalestineCharity-FE';

  constructor(private authService: AuthService,
              private dashboardService: DashboardService) {
  }

    ngOnInit() {
        this.dashboardService.getCampaigns().subscribe(resdata => console.log(resdata));
        this.authService.autoLogin();
    }
}
