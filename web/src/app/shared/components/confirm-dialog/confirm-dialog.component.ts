import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  providers: [DialogService],
})
export class ConfirmDialogComponent implements OnInit {

    @Input() message: string;

    constructor(
        public dialogService: DialogService,
        public messageService: MessageService,
        public ref: DynamicDialogRef,
    ) {}

    ngOnInit(): void {}

    public confirmationResponse(confirm: boolean) {
        this.ref.close(confirm);
    }

}
