import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedLeavesComponent } from './approved-leaves.component';

describe('ApprovedLeavesComponent', () => {
  let component: ApprovedLeavesComponent;
  let fixture: ComponentFixture<ApprovedLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedLeavesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
