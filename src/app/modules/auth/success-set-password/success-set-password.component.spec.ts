import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessSetPasswordComponent } from './success-set-password.component';

describe('SuccessSetPasswordComponent', () => {
  let component: SuccessSetPasswordComponent;
  let fixture: ComponentFixture<SuccessSetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessSetPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessSetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
