import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationRecordsComponent } from './donation-records.component';

describe('DonationRecordsComponent', () => {
  let component: DonationRecordsComponent;
  let fixture: ComponentFixture<DonationRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationRecordsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonationRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
