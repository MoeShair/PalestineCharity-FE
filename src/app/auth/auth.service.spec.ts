import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService, Response, signUpResponse } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserModel } from './user.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let cookieService: CookieService;
  let router: Router;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        CookieService,
        { provide: Router, useValue: routerSpy }
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign up a user', () => {
    const dummyResponse: signUpResponse = { message: 'User registered successfully' };
    service.signUp('test@example.com', 'password123').subscribe(response => {
      expect(response.message).toEqual('User registered successfully');
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/register');
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should sign in a user', () => {
    const dummyResponse: Response = {
      user: {
        _id: '123',
        Name: 'John Doe',
        Email: 'john@example.com',
        Age: 25,
        Address: '123 Main St'
      }
    };

    service.signIn('john@example.com', 'password123').subscribe(response => {
      expect(response.user._id).toEqual('123');
      expect(service.user.value).toEqual(jasmine.any(UserModel));
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/login');
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should logout a user', () => {
    service.logout();
    expect(service.user.value).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['']);
    expect(cookieService.get('userData')).toBeFalsy();
  });

  it('should auto login a user', () => {
    const userData = {
      UserID: '123',
      Name: 'John Doe',
      Email: 'john@example.com',
      Age: 25,
      Address: '123 Main St'
    };

    spyOn(cookieService, 'get').and.returnValue(JSON.stringify(userData));

    service.autoLogin();

    expect(service.user.value).toEqual(jasmine.any(UserModel));
    // @ts-ignore
    expect(service.user.value?.Email).toBe('john@example.com');
  });

  it('should check if user is logged in', () => {
    expect(service.isLoggedIn()).toBeFalsy();

    service.user.next(new UserModel('123', 'John Doe', 'john@example.com', 25, '123 Main St'));

    expect(service.isLoggedIn()).toBeTruthy();
  });
});
