import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyLeaveUserComponent } from './apply-leave-user.component';

describe('ApplyLeaveUserComponent', () => {
  let component: ApplyLeaveUserComponent;
  let fixture: ComponentFixture<ApplyLeaveUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyLeaveUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyLeaveUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
