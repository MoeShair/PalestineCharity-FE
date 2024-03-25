import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCompComponent } from './account-comp.component';

describe('AccountCompComponent', () => {
  let component: AccountCompComponent;
  let fixture: ComponentFixture<AccountCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountCompComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
