import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubcampaignComponent } from './add-subcampaign.component';

describe('AddSubcampaignComponent', () => {
  let component: AddSubcampaignComponent;
  let fixture: ComponentFixture<AddSubcampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSubcampaignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSubcampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
