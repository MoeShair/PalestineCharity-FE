import {Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from "ng-zorro-antd/form";
import {
  FormBuilder,
  FormControl,
  FormGroup, FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {AuthService} from "../../auth/auth.service";
import {DonateService} from "./donate.service";
import {ActivatedRoute} from "@angular/router";
import {UserModel} from "../../auth/user.model";
import {Subscription} from "rxjs";
import {NzSwitchComponent, NzSwitchModule} from "ng-zorro-antd/switch";

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
    NzSwitchModule,
    NzButtonComponent,
    NzSwitchComponent,
    FormsModule
  ],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DonateComponent implements OnDestroy{
  private userSubscription: Subscription | null = null;
  validateForm: FormGroup;
  // switchValue: boolean = false

  constructor(private fb: FormBuilder, private authService: AuthService,
              private donateService: DonateService, private route: ActivatedRoute) {
    this.validateForm = this.fb.group({
      CardNumber: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      CVV: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      switchValue: [false]
    });
  }

  // test () {
  //   console.log('inn: ', this.switchValue)
  // }
  donate(){
    let activeRoute: string = this.route.snapshot.params['id'];
    let amount = this.validateForm.value.amount
    let userId : string | null = null
    let switchValue = this.validateForm.get('switchValue')?.value;
    this.userSubscription = this.authService.user.subscribe((user) =>{
      if(user !== null){
        console.log(switchValue)
        userId = user.userID
        this.donateService.loggedInDonation(activeRoute, amount, userId, switchValue).subscribe(resData =>{
          console.log(resData)
        })
      }
      else{
        this.donateService.notLoggedInDonation(activeRoute, amount).subscribe(resData =>{
          console.log(resData)
        })
      }
    })
  }
  ngOnDestroy() {
    this.userSubscription?.unsubscribe()
  }

}
