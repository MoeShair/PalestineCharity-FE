import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CampaignService } from './campaign.service';
import { CampaignResponse, LeaderboardResponse } from './campaign.service';

describe('CampaignService', () => {
  let service: CampaignService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CampaignService]
    });
    service = TestBed.inject(CampaignService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#loadCampaign', () => {
    it('should fetch a campaign by ID', () => {
      const mockCampaignResponse: CampaignResponse = {
        campaign: {
          campaignName: 'Test Campaign',
          campaignImage: 'image.jpg',
          organizationName: 'Test Org',
          goalAmount: 1000,
          status: 'Active',
          currentAmount: 500,
          startDate: '2023-01-01',
          endDate: '2023-12-31',
          leaderboard: [],
          description: 'A test campaign',
          _id: '123',
          newsDashboard: []
        }
      };

      service.loadCampaign('123').subscribe(campaign => {
        expect(campaign).toBeTruthy();
        expect(campaign.campaign.campaignName).toBe('Test Campaign');
        // Add other expectations based on your Campaign model
      });

      const req = httpMock.expectOne('http://localhost:3000/posts/campaign/123');
      expect(req.request.method).toBe('GET');
      req.flush(mockCampaignResponse);
    });
  });

  describe('#getLeaderboard', () => {
    it('should fetch the leaderboard for a campaign', () => {
      const mockLeaderboardResponse: LeaderboardResponse = {
        leaderboard: [
          { userId: 'user1', userName: 'User One', amountDonated: 100 },
          { userId: 'user2', userName: 'User Two', amountDonated: 200 }
        ]
      };

      service.getLeaderboard('123').subscribe(leaderboard => {
        expect(leaderboard.leaderboard.length).toBe(2);
        expect(leaderboard.leaderboard[0].userName).toBe('User One');
        expect(leaderboard.leaderboard[1].amountDonated).toBe(200);
      });

      const req = httpMock.expectOne('http://localhost:3000/posts/123/leaderboard');
      expect(req.request.method).toBe('GET');
      req.flush(mockLeaderboardResponse);
    });
  });

  describe('#postNewsUpdate', () => {
    it('should post a news update to the campaign', () => {
      const news = 'This is a news update';

      service.postNewsUpdate('123', news).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne('http://localhost:3000/posts/campaigns/123/news');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ news });
      req.flush({ success: true });
    });
  });
});
