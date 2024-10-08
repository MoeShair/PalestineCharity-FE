import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProfileService } from './profile.service';
import { AuthService } from '../../auth/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { User } from './profile.service';
import { expect } from 'chai';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let authServiceUserSubject: BehaviorSubject<any>;

  beforeEach(() => {
    authServiceUserSubject = new BehaviorSubject<any>(null);
    const authSpy = jasmine.createSpyObj('AuthService', ['user'], {
      user: authServiceUserSubject.asObservable()
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProfileService,
        { provide: AuthService, useValue: authSpy }
      ]
    });

    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).to.be.ok;
  });

  describe('#getUSerInfo', () => {
    it('should return user info when the user is authenticated', () => {
      const mockUser = {
        userID: '123'
      };
      const mockResponse: User = {
        user: {
          _id: '123',
          Name: 'Test User',
          profilePicture: 'profile.jpg',
          biography: 'Bio',
          backgroundPicture: 'background.jpg',
          Address: '123 Test St',
          Age: '30',
          Email: 'test@example.com',
          token: 100,
          Badges: [],
          favorite: [],
          PhoneNumber: '1234567890',
          Role: 'user',
          font: 'bold',
          Donationrecords: []
        }
      };

      authServiceUserSubject.next(mockUser);

      service.getUSerInfo().subscribe(user => {
        expect(user).to.deep.equal(mockResponse); // Using Chai's 'deep.equal'
      });

      const req = httpMock.expectOne(`http://localhost:3000/posts/user/123`);
      expect(req.request.method).to.equal('GET'); // Using Chai's 'equal'
      req.flush(mockResponse);
    });

    it('should return null when the user is not authenticated', () => {
      authServiceUserSubject.next(null);

      service.getUSerInfo().subscribe(user => {
        expect(user).to.be.null; // Using Chai's 'null'
      });

      httpMock.expectNone(`http://localhost:3000/posts/user/123`);
    });
  });
});
