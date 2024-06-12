import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardService } from './dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Campaign } from './campaign.model';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService]
    });
    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getCampaigns', () => {
    it('should fetch campaigns and update the BehaviorSubject', () => {
      const mockResponse = {
        campaigns: [
          {
            campaignName: 'Campaign 1',
            campaignImage: 'image1.jpg',
            organizationName: 'Org 1',
            goalAmount: 1000,
            status: 'Active',
            currentAmount: 500,
            startDate: '2023-01-01',
            endDate: '2023-12-31',
            leaderboard: [],
            description: 'Description 1',
            newsDashboard: [],
            _id: '1'
          },
          {
            campaignName: 'Campaign 2',
            campaignImage: 'image2.jpg',
            organizationName: 'Org 2',
            goalAmount: 2000,
            status: 'Ended',
            currentAmount: 2000,
            startDate: '2022-01-01',
            endDate: '2022-12-31',
            leaderboard: [],
            description: 'Description 2',
            newsDashboard: [],
            _id: '2'
          }
        ]
      };

      service.getCampaigns().subscribe(campaigns => {
        expect(campaigns).toBeTruthy();
        expect(service.campaigns.value?.length).toBe(2);
        expect(service.campaigns.value?.[0].campaignName).toBe('Campaign 1');
        expect(service.campaigns.value?.[1].campaignName).toBe('Campaign 2');
      });

      const req = httpMock.expectOne('http://localhost:3000/posts/campaigns?page=1&limit=10');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('#handleError', () => {
    it('should handle various error messages correctly', () => {
      const errorMessages = {
        'UserModel already exists with this Email': 'This email exist, please try logging in.',
        'UserModel not found': 'UserModel not found',
        'TOO_MANY_ATTEMPTS_TRY_LATER': 'We have blocked all requests from this device due to unusual activity. Try again later.',
        'EMAIL_NOT_FOUND': 'There Email does NOT exist, please Sign Up ',
        'INVALID_PASSWORD': 'The password is invalid',
        'USER_DISABLED': 'You are banned'
      };

      for (const [errorMessage, expectedMessage] of Object.entries(errorMessages)) {
        const httpErrorResponse = new HttpErrorResponse({
          error: { error: { message: errorMessage } },
          status: 400,
          statusText: 'Bad Request'
        });

        service.handleError(httpErrorResponse).subscribe({
          error: error => {
            expect(error).toBe(expectedMessage);
          }
        });
      }

      // Test default error message
      const unknownErrorResponse = new HttpErrorResponse({
        error: {},
        status: 400,
        statusText: 'Bad Request'
      });

      service.handleError(unknownErrorResponse).subscribe({
        error: error => {
          expect(error).toBe('Unknown error occurred');
        }
      });
    });
  });
});
