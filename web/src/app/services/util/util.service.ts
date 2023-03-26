import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DOCUMENT } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import * as fileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx'
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(
    private authservice:AuthService,
    private titleService: Title,
    @Inject(DOCUMENT) private _document: Document,
    private router: Router,
    private location: History,
    private authService: AuthService
  ) { }

  getUserFirstName(): string {
    const decodedToken = this.authservice.decodedToken()
    const firstName = decodedToken.firstname;
    return firstName ? firstName : '';
  }

  passwordsMustMatch(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
          return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  setDocTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  // setDocFavicon(): void {
  //   const faviconId = 'appFavicon';
  //   const faviconDefaultPath = 'assets/img/brand';
  
  //   this._document.getElementById(faviconId).setAttribute('href', `${faviconDefaultPath}/${favicon}`);
  // }

  createInitials(name): string {

    // const firstLetter = name ? (name?.split('')[0] ? name.split('')[0].charAt(0).toUpperCase() : '') : '';
    // const secondLetter = name ? (name?.split('')[1] ? name.split('')[1].charAt(0).toUpperCase() : '') : '';

    // const initials = firstLetter + secondLetter;
    let initials = '';

    if (name) {
      for (let i = 0; i < name.length; i++) {
        if (name.charAt(i) === ' ') {
          continue;
        }
        if (name.charAt(i) === name.charAt(i).toUpperCase()) {
          initials += name.charAt(i);

          if (initials.length == 2) {
            break;
          }
        }
      }
    }
    return initials;
  }

  formatDate(dateTimeStamp: string): string {
    const dt = new Date(dateTimeStamp),
        date = dt.getDate(),
        month = this.months[dt.getMonth()],
        timeDiff = new Date (dateTimeStamp).getDate() - Date.now(),
        diffDays = new Date().getDate() - date,
        diffMonths = new Date().getMonth() - dt.getMonth(),
        diffYears = new Date().getFullYear() - dt.getFullYear();

    if (diffYears === 0 && diffDays === 0 && diffMonths === 0) {
      return 'Today';
    } else if (diffYears === 0 && diffDays === 1) {
      return 'Yesterday';
    } else if (diffYears === 0 && diffDays === -1) {
      return 'Tomorrow';
    } else if (diffYears === 0 && (diffDays < -1 && diffDays > -7)) {
      return this.fullDays[dt.getDay()];
    } else if (diffYears >= 1) {
      return month + ' ' + date + ', ' + new Date(dateTimeStamp).getFullYear();
      } else {
        return month + ' ' + date;
      }
  }

  doesURLHaveText(text: string): boolean {
    const activeRoute = this.router.url;
    return activeRoute.includes(text) ? true : false;
  }

  goBack(): void {
    this.location.back()
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    fileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  }

  public toDateString(date: Date): string {
    return (date.getFullYear().toString() + '-'
       + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
       + ('0' + (date.getDate())).slice(-2))
       + 'T' + date.toTimeString().slice(0, 5);
  }

  public removeTimeFromDate(date: string): string {
    return date.split('T')[0];
  }

  createImageFromBlob(image: Blob) {
    let imageToShow: any;
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       imageToShow = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }

    return imageToShow;
 }


 getUserId(): string {
  const decodedToken = this.authService.decodedToken();
  const userId = decodedToken.id;
  return userId;
}
 getProfileColor(): string {
  const decodedToken = this.authService.decodedToken();
  const profileColor = decodedToken.profileBgColor;
  return profileColor;
}

}
