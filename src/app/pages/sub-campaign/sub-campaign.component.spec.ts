import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCampaignComponent } from './sub-campaign.component';

describe('SubCampaignComponent', () => {
  let component: SubCampaignComponent;
  let fixture: ComponentFixture<SubCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubCampaignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
