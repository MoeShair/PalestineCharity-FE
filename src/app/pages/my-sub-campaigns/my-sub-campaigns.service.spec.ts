import { TestBed } from '@angular/core/testing';

import { MySubCampaignsService } from './my-sub-campaigns.service';

describe('MySubCampaignsService', () => {
  let service: MySubCampaignsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MySubCampaignsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
