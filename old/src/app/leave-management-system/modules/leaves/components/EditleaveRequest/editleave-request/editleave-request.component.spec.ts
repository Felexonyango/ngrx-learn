import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditleaveRequestComponent } from './editleave-request.component';

describe('EditleaveRequestComponent', () => {
  let component: EditleaveRequestComponent;
  let fixture: ComponentFixture<EditleaveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditleaveRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditleaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
