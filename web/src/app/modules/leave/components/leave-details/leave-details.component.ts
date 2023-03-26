import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ILeaves } from 'src/app/model/leave';
import { LeaveState } from 'src/app/store/reducer/leave/leaveReducer';
import { getleaveById } from 'src/app/store/selector/leave/leave.selector';

@Component({
  selector: 'app-leave-details',
  templateUrl: './leave-details.component.html',
  styleUrls: ['./leave-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaveDetailsComponent implements OnInit {
  subscription = new Subscription();

  leave: ILeaves;

  constructor(private store: Store<LeaveState>) {}

  ngOnInit(): void {
    this.getLeaveId();
  }

  getLeaveId() {
    this.store.select(getleaveById).subscribe((leave) => {
      this.leave = leave;
      console.log(leave);
    });
  }
}
