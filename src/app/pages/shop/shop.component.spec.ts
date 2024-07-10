import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopComponent } from './shop.component';
import { ShopService, ShopItem } from './shop.service';
import { ProfileService } from '../profile/profile.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { InventoryService } from '../inventory/inventory.service';
import { of, throwError } from 'rxjs';

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;
  let shopService: jasmine.SpyObj<ShopService>;
  let profileService: jasmine.SpyObj<ProfileService>;
  let messageService: jasmine.SpyObj<NzMessageService>;
  let inventoryService: jasmine.SpyObj<InventoryService>;

  beforeEach(async () => {
    const shopServiceSpy = jasmine.createSpyObj('ShopService', ['getFonts', 'getProfilePics', 'getBackgroundPics', 'buyItem']);
    const profileServiceSpy = jasmine.createSpyObj('ProfileService', ['getUSerInfo']);
    const messageServiceSpy = jasmine.createSpyObj('NzMessageService', ['success', 'error']);
    const inventoryServiceSpy = jasmine.createSpyObj('InventoryService', ['userProfilePics', 'userBgs', 'userFonts']);

    await TestBed.configureTestingModule({
      imports: [ShopComponent],
      providers: [
        { provide: ShopService, useValue: shopServiceSpy },
        { provide: ProfileService, useValue: profileServiceSpy },
        { provide: NzMessageService, useValue: messageServiceSpy },
        { provide: InventoryService, useValue: inventoryServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    shopService = TestBed.inject(ShopService) as jasmine.SpyObj<ShopService>;
    profileService = TestBed.inject(ProfileService) as jasmine.SpyObj<ProfileService>;
    messageService = TestBed.inject(NzMessageService) as jasmine.SpyObj<NzMessageService>;
    inventoryService = TestBed.inject(InventoryService) as jasmine.SpyObj<InventoryService>;

    // @ts-ignore
    profileService.getUSerInfo.and.returnValue(of({ user: { _id: '123' } }));
    shopService.getFonts.and.returnValue(of([{ id: 'font1', name: 'Font One', type: 'font', price: 10 }]));
    shopService.getProfilePics.and.returnValue(of([{ id: 'profilePic1', name: 'Profile Pic One', type: 'picture', price: 15 }]));
    shopService.getBackgroundPics.and.returnValue(of([{ id: 'bg1', name: 'Background One', type: 'background', price: 20 }]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with user info and shop items', () => {
    expect(component.userId).toBe('123');
    expect(component.fonts).toEqual([{ id: 'font1', name: 'Font One', type: 'font', price: 10 }]);
    expect(component.ProfilePics).toEqual([{ id: 'profilePic1', name: 'Profile Pic One', type: 'picture', price: 15 }]);
    expect(component.BackgroundPics).toEqual([{ id: 'bg1', name: 'Background One', type: 'background', price: 20 }]);
  });

  it('should buy an item successfully', () => {
    // @ts-ignore
    shopService.buyItem.and.returnValue(of(null));
    component.userId = '123';

    component.buyItem('item1');

    expect(shopService.buyItem).toHaveBeenCalledWith('123', 'item1');
    expect(messageService.success).toHaveBeenCalledWith('Item purchased successfully!');
  });

  it('should handle buy item error', () => {
    shopService.buyItem.and.returnValue(throwError('Error buying item'));
    component.userId = '123';

    component.buyItem('item1');

    expect(shopService.buyItem).toHaveBeenCalledWith('123', 'item1');
    expect(messageService.error).toHaveBeenCalledWith('You already have this item!');
  });


  it('should handle error when checking if an item is owned', (done) => {
    inventoryService.userProfilePics.and.returnValue(throwError('Error fetching inventory'));

    const item: ShopItem = { id: 'profilePic1', name: 'Profile Pic One', type: 'picture', price: 15 };

    component.isItemOwned(item).subscribe(isOwned => {
      expect(isOwned).toBeFalse();
      done();
    });

    expect(inventoryService.userProfilePics).toHaveBeenCalledWith('123');
  });
});
