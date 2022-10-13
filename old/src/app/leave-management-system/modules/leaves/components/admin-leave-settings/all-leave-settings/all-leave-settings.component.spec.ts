import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLeaveSettingsComponent } from './all-leave-settings.component';

describe('AllLeaveSettingsComponent', () => {
  let component: AllLeaveSettingsComponent;
  let fixture: ComponentFixture<AllLeaveSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllLeaveSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLeaveSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
