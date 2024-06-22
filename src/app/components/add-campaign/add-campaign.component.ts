import {Component, OnInit} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalComponent, NzModalContentDirective} from "ng-zorro-antd/modal";
import {NgIf} from "@angular/common";
import {NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzColDirective} from "ng-zorro-antd/grid";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {ProfileService} from "../../pages/profile/profile.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-campaign',
  standalone: true,
  imports: [
    NzButtonComponent,
    ReactiveFormsModule,
    NzModalComponent,
    NzModalContentDirective,
    NgIf,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzInputDirective,
    NzColDirective,
    NzDatePickerComponent
  ],
  templateUrl: './add-campaign.component.html',
  styleUrl: './add-campaign.component.scss'
})
export class AddCampaignComponent implements OnInit{
  userId: string | undefined = undefined

  isVisible = false;
  addCampaignForm: FormGroup;
  selectedFile: File | undefined;
  imageUrl: any = null;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private message: NzMessageService,
    private profileService: ProfileService,
    private router: Router,
    private sanitizer: DomSanitizer // For image preview
  ) {
    this.addCampaignForm = this.formBuilder.group({
      campaignName: ['', Validators.required],
      goalAmount: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
      campaignImage: [null] // Allow optional image
    });
  }
  ngOnInit() {
    this.profileService.getUSerInfo().subscribe(response =>{
      this.userId = response?.user._id
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(e.target.result); // Preview the image
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.imageUrl = null;
    }
  }

  onSubmit() {
    if (this.addCampaignForm.invalid) {
      return; // Handle form validation errors
    }

    const formData = new FormData();
    const currentDate = new Date().toISOString();
    formData.append('campaignName', this.addCampaignForm.value.campaignName);
    formData.append('userId', this.userId!);
    formData.append('currentAmount', '0');
    formData.append('goalAmount', this.addCampaignForm.value.goalAmount);
    formData.append('status', 'Active');
    formData.append('startDate', currentDate);
    formData.append('endDate', this.addCampaignForm.value.endDate);
    formData.append('description', this.addCampaignForm.value.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.http.post<any>('http://localhost:3000/posts/addcamp', formData)
      .subscribe(
        response => {
          console.log(response);
          this.message.success('Campaign added successfully')
          this.router.navigate(['/my-campaigns'])
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
