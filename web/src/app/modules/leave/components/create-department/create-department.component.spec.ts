import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepartmentComponent } from './create-department.component';

describe('CreateDepartmentComponent', () => {
  let component: CreateDepartmentComponent;
  let fixture: ComponentFixture<CreateDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
