import {Component, Input} from '@angular/core';
import {NzProgressComponent} from "ng-zorro-antd/progress";
import {NzPopoverDirective} from "ng-zorro-antd/popover";

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [
    NzProgressComponent,
    NzPopoverDirective
  ],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  @Input() progress: string = '0';
  @Input() currentAmount: number = 0
  @Input() goalAmount: number = 0

}
