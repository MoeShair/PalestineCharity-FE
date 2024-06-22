import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import form modules

import { ShopComponent } from './shop.component';
import { By } from '@angular/platform-browser'; // For querying elements

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopComponent ],
      imports: [FormsModule, ReactiveFormsModule] // Add form modules for form-based components
    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Add other unit tests for specific functionalities

  it('should render a title "My Shop"', () => {
    const titleElement = fixture.debugElement.query(By.css('h1')); // Query the h1 element
    expect(titleElement.nativeElement.textContent).toContain('My Shop'); // Check title content
  });

  it('should show a list of products (assuming ShopComponent has a product list)', () => {
    // Assuming there's a product list element with a specific class
    const productList = fixture.debugElement.query(By.css('.product-list'));
    expect(productList).toBeTruthy(); // Check if product list exists
  });

  // Add tests for form behavior (if ShopComponent has a form)


});
