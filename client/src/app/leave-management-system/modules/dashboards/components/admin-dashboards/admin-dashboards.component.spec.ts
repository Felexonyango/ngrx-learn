import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardsComponent } from './admin-dashboards.component';

describe('AdminDashboardsComponent', () => {
  let component: AdminDashboardsComponent;
  let fixture: ComponentFixture<AdminDashboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
