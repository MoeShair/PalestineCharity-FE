import { TestBed } from '@angular/core/testing';

import { CustomizeProfileService } from './customize-profile.service';

describe('CustomizeProfileService', () => {
  let service: CustomizeProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomizeProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
