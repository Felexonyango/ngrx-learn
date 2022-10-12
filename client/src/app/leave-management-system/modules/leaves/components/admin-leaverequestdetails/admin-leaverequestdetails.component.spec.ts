import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeaverequestdetailsComponent } from './admin-leaverequestdetails.component';

describe('AdminLeaverequestdetailsComponent', () => {
  let component: AdminLeaverequestdetailsComponent;
  let fixture: ComponentFixture<AdminLeaverequestdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLeaverequestdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLeaverequestdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
