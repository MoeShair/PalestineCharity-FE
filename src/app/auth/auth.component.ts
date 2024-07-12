import {Component, Input} from '@angular/core';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from "ng-zorro-antd/form";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {Router} from "@angular/router";
import {LayoutSiderService} from "../layout/layout-sider.service";
import {CommonModule} from "@angular/common";
import {AuthService, Response, signUpResponse} from "./auth.service";
import {Observable} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    NzFormDirective,
    NzFormItemComponent,
    NzFormControlComponent,
    NzInputGroupComponent,
    ReactiveFormsModule,
    NzInputDirective,
    NzButtonComponent
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  constructor(private router: Router,
              private fb: NonNullableFormBuilder,
              private sideNavService: LayoutSiderService,
              private authService: AuthService,
              private msg: NzMessageService) {
  }
  @Input()
  mode: 'logIn'|'signUp'= "logIn";

  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmitForm(): void {
    const email  = this.validateForm.value.email;
    const password = this.validateForm.value.password;
    let authObservable: Observable<Response>;
    let signupObservable: Observable<signUpResponse>;
    if (this.validateForm.valid) {
      if(this.mode==='signUp'){
        signupObservable = this.authService.signUp(email, password);
        signupObservable.subscribe({
          next: response => {
            this.router.navigate(['']);
          },
        });
      }
      else if(this.mode==="logIn"){
        authObservable = this.authService.signIn(email, password);
        authObservable.subscribe({
          next: response => {
            this.sideNavService.siderSubject.next(true);
            this.router.navigate(['']);
          },
          error: err => {
            this.msg.error('Wrong password or email!')
          }
        });
      }
    }
  }
}
