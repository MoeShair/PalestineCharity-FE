import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";
import {NzCardComponent} from "ng-zorro-antd/card";
import {ChartDataService} from "./chart-data.service";

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
    NzCardComponent
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() campaignId: string = ''
  donationData: any = {};

  constructor(private chartService: ChartDataService) {
  }
  ngOnInit() {
    this.chartService.getChartData(this.campaignId).subscribe(response => {
      this.donationData = response;
      this.setPieChartData();
    })
  }

  setPieChartData() {
    this.pieChartData = {
      labels: this.donationData.places.map((place: { address?: string, totalDonation: number, donationRate: number }) => place.address ?? ''),
      datasets: [
        {
          data: this.donationData.places.map((place: {
            address?: string,
            totalDonation: number,
            donationRate: number
          }) => place.totalDonation),
        }
      ]
    }
  }

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'left',
      },
    },
    responsive: true,
    maintainAspectRatio: false
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = <ChartData<'pie', number[], string | string[]>>{
    // labels: [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'],
    // datasets: [
    //   {
    //     data: [300, 500, 100],
    //   },
    // ],
  };
  public pieChartType: ChartType = 'pie';

  // events
  public chartClicked({
                        event,
                        active,
                      }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
                        event,
                        active,
                      }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }



  changeLegendPosition(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position =
        this.pieChartOptions.plugins.legend.position === 'left'
          ? 'top'
          : 'left';
    }

    this.chart?.render();
  }
}
