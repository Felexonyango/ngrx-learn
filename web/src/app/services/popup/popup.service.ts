import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',

})
export class PopupService {



  constructor(

  ) { }

  public confirm(message: string, dialogSize: 'sm'|'lg' = 'lg'):any
   {
    //       const modalRef = this.modalService.open(PopupComponent);
    //       modalRef.componentInstance.message = message;
    // return modalRef.result;
    return true;
    }

}


