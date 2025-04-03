import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerdocumentsComponent } from './customerdocuments.component';

describe('CustomerdocumentsComponent', () => {
  let component: CustomerdocumentsComponent;
  let fixture: ComponentFixture<CustomerdocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerdocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerdocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
