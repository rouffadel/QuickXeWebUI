import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignordersComponent } from './assignorders.component';

describe('AssignordersComponent', () => {
  let component: AssignordersComponent;
  let fixture: ComponentFixture<AssignordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignordersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
