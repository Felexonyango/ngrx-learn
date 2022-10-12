import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLeaverequestComponent } from './all-leaverequest.component';

describe('AllLeaverequestComponent', () => {
  let component: AllLeaverequestComponent;
  let fixture: ComponentFixture<AllLeaverequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllLeaverequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLeaverequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
