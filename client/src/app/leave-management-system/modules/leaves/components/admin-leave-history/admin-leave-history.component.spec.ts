import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeaveHistoryComponent } from './admin-leave-history.component';

describe('AdminLeaveHistoryComponent', () => {
  let component: AdminLeaveHistoryComponent;
  let fixture: ComponentFixture<AdminLeaveHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLeaveHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLeaveHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
