import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LayoutSiderService } from '../layout/layout-sider.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let sideNavService: jasmine.SpyObj<LayoutSiderService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['signUp', 'signIn']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const sideNavServiceSpy = jasmine.createSpyObj('LayoutSiderService', ['siderSubject']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AuthComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: LayoutSiderService, useValue: sideNavServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    sideNavService = TestBed.inject(LayoutSiderService) as jasmine.SpyObj<LayoutSiderService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const form = component.validateForm;
    expect(form.get('email')?.value).toBe('');
    expect(form.get('password')?.value).toBe('');
  });

  it('should call signUp and navigate on successful sign up', () => {
    component.mode = 'signUp';
    component.validateForm.setValue({ email: 'test@example.com', password: 'password123' });

    const response = { message: 'User registered successfully' };
    authService.signUp.and.returnValue(of(response));

    component.onSubmitForm();

    expect(authService.signUp).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });


  it('should not call authService if form is invalid', () => {
    component.validateForm.setValue({ email: '', password: '' });

    component.onSubmitForm();

    expect(authService.signUp).not.toHaveBeenCalled();
    expect(authService.signIn).not.toHaveBeenCalled();
  });
});
