import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecurrencyComponent } from './updatecurrency.component';

describe('UpdatecurrencyComponent', () => {
  let component: UpdatecurrencyComponent;
  let fixture: ComponentFixture<UpdatecurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatecurrencyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatecurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
