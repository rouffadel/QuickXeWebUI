import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangecurrencyComponent } from './exchangecurrency.component';

describe('ExchangecurrencyComponent', () => {
  let component: ExchangecurrencyComponent;
  let fixture: ComponentFixture<ExchangecurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ExchangecurrencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangecurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
