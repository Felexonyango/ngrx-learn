import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DepartmentEFfect } from './departmentEffect';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Department Effects', () => {
  let actions$: Observable<any>;
  let effects: DepartmentEFfect;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DepartmentEFfect,
        provideMockActions(() => actions$)
      ],
      imports:[HttpClientTestingModule]
    });

    effects = TestBed.inject(DepartmentEFfect)
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
