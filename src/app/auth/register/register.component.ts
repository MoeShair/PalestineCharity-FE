import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzColDirective} from "ng-zorro-antd/grid";
import {HttpClient} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzInputDirective,
    NzSelectComponent,
    NzOptionComponent,
    NgIf,
    NzButtonComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzColDirective,
    NzDatePickerComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private msg: NzMessageService) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
      Age: [null, Validators.required],
      Address: ['', Validators.required],
      Role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.http.post('http://localhost:3000/posts/register', this.registrationForm.value).subscribe(
        response => {
          console.log('Registration successful', response);
          this.msg.success('Account created successfully!')
        },
        error => {
          console.error('Registration error', error);
          this.msg.error('Something went wrong try again later!')
        }
      );
    }
  }
}
