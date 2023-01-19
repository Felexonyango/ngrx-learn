import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private authservice:AuthService
  ) { }

  getUserFirstName(): string {
    const decodedToken = this.authservice.decodedToken()
    const firstName = decodedToken.firstname;
    return firstName ? firstName : '';
  }


}
