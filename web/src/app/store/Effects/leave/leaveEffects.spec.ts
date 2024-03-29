import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import {LeaveEFfect} from './leaveEffects'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
describe('Leave Effect', () => {
  let actions$: Observable<any>;
  let effects: LeaveEFfect;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports:[
            HttpClientTestingModule,
            StoreModule.forRoot(provideMockStore),
],
      providers: [
        LeaveEFfect,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(LeaveEFfect)
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
