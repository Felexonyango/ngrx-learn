import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import{UtilService}from '../../../services/util/util.service'
@Component({
  selector: 'app-avatar-generator',
  templateUrl: './avatar-generator.component.html',
  styleUrls: ['./avatar-generator.component.scss'],
})
export class AvatarGeneratorComponent implements OnInit, OnChanges {
  @Input()
  public photoUrl: string;

  @Input()
  public name: string;

  @Input()
  public circleSize: string;

  @Input()
  public initialsSize: string;

  @Input()
  public circleColor: string;

  @Input()
  public showName = false;

  public showInitials = false;
  public initials: string;
  constructor(public utilService: UtilService) {}

  ngOnInit(): void {
    if (!this.photoUrl) {
      this.showInitials = true;
      this.createInitials();
    }

  }
  ngOnChanges(): void {
    if (!this.photoUrl) {
      this.showInitials = true;
      this.createInitials();
    }
  }

  private createInitials(): void {
    this.initials = this.utilService.createInitials(this.name);

  }
//   generateRandomColor() {
//     var randomColor = Math.floor(Math.random()*16777215).toString(16);
//     return '#' + randomColor

//   }
}
