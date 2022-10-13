import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentLeaveHistoryComponent } from './department-leave-history.component';

describe('DepartmentLeaveHistoryComponent', () => {
  let component: DepartmentLeaveHistoryComponent;
  let fixture: ComponentFixture<DepartmentLeaveHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentLeaveHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentLeaveHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
