import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentLeaveRequestComponent } from './department-leave-request.component';

describe('DepartmentLeaveRequestComponent', () => {
  let component: DepartmentLeaveRequestComponent;
  let fixture: ComponentFixture<DepartmentLeaveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentLeaveRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
