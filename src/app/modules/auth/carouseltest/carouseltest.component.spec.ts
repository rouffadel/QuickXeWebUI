import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouseltestComponent } from './carouseltest.component';

describe('CarouseltestComponent', () => {
  let component: CarouseltestComponent;
  let fixture: ComponentFixture<CarouseltestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouseltestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouseltestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
