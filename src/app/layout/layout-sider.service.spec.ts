import { TestBed } from '@angular/core/testing';

import { LayoutSiderService } from './layout-sider.service';

describe('LayoutSiderService', () => {
  let service: LayoutSiderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutSiderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
