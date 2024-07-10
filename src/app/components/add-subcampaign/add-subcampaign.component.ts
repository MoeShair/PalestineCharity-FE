import {Component, Input, OnInit} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzModalComponent, NzModalContentDirective, NzModalFooterDirective} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {NzColDirective} from "ng-zorro-antd/grid";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";
import {ProfileService} from "../../pages/profile/profile.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-subcampaign',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzModalComponent,
    FormsModule,
    NgIf,
    NzColDirective,
    NzDatePickerComponent,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    ReactiveFormsModule,
    NzModalContentDirective,
    NzModalFooterDirective
  ],
  templateUrl: './add-subcampaign.component.html',
  styleUrl: './add-subcampaign.component.scss'
})
export class AddSubcampaignComponent implements OnInit{

  @Input() campaignId: string = ''
  @Input() campaignName: string = ''
  user: any | undefined = undefined

  isVisible = false;
  addSubCampaignForm: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private message: NzMessageService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.addSubCampaignForm = this.formBuilder.group({
      goalAmount: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.profileService.getUSerInfo().subscribe(response =>{
      this.user = response?.user
    })
  }

  onSubmit() {
    if (this.addSubCampaignForm.invalid) {
      return; // Handle form validation errors
    }

    const currentDate = new Date().toISOString();

    this.http.post<any>('http://localhost:3000/posts/sub-campaigns', {
      name: this.campaignName,
      description: this.addSubCampaignForm.value.description,
      parentCampaignId: this.campaignId,
      goalAmount: this.addSubCampaignForm.value.goalAmount,
      startDate: currentDate,
      endDate: this.addSubCampaignForm.value.endDate,
      influencer: this.user!
    }).subscribe(
        response => {
          console.log(response);
          this.message.success('Campaign added successfully')
          //this.router.navigate(['/my-campaigns'])
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          this.message.error('Failed to add. Please try again later.');
        }
      );
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
