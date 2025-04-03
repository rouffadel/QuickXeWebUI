import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderBookingComponent } from './customer-order-booking.component';

describe('CustomerOrderBookingComponent', () => {
  let component: CustomerOrderBookingComponent;
  let fixture: ComponentFixture<CustomerOrderBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerOrderBookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerOrderBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
