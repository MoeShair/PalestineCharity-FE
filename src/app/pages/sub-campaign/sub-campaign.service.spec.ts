import { TestBed } from '@angular/core/testing';

import { SubCampaignService } from './sub-campaign.service';

describe('SubCampaignService', () => {
  let service: SubCampaignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubCampaignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
