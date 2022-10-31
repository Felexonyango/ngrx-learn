import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentSettingComponent } from './department-setting.component';

describe('DepartmentSettingComponent', () => {
  let component: DepartmentSettingComponent;
  let fixture: ComponentFixture<DepartmentSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
