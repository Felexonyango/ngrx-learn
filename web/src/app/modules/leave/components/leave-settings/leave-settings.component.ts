import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave-settings',
  templateUrl: './leave-settings.component.html',
  styleUrls: ['./leave-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaveSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
