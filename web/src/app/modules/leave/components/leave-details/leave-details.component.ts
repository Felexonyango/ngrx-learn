import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ILeaves } from 'src/app/model/leave';
import { LeaveState } from 'src/app/store/reducer/leave/leaveReducer';
import { getleaveById } from 'src/app/store/selector/leave/leave.selector';

@Component({
  selector: 'app-leave-details',
  templateUrl: './leave-details.component.html',
  styleUrls: ['./leave-details.component.scss']
})
export class LeaveDetailsComponent implements OnInit {


  leave$:Observable<ILeaves>

  constructor(
    private store: Store<LeaveState>
  ) { }

  ngOnInit(): void {

    this.leave$=this.store.select(getleaveById)
  }
  

}
