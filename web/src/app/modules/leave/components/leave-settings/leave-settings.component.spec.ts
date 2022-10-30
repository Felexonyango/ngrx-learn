import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveSettingsComponent } from './leave-settings.component';

describe('LeaveSettingsComponent', () => {
  let component: LeaveSettingsComponent;
  let fixture: ComponentFixture<LeaveSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
