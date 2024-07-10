import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySubCampaignsComponent } from './my-sub-campaigns.component';

describe('MySubCampaignsComponent', () => {
  let component: MySubCampaignsComponent;
  let fixture: ComponentFixture<MySubCampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySubCampaignsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MySubCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
