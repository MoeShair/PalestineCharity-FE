import { Component } from '@angular/core';
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from "ng-zorro-antd/form";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [
    NzCardComponent,
    NzFormDirective,
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormControlComponent,
    NzInputDirective,
    NzButtonComponent
  ],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.scss'
})
export class DonateComponent {
  validateForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      CardNumber: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      CVV: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]]
    });
  }
  donate(){
    console.log("ayaya")
  }
}
