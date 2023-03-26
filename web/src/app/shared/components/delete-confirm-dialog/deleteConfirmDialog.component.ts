import { Component, OnInit, Input } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-popup',
    templateUrl: './deleteConfirmDialog.component.html',
    styleUrls: ['./deleteConfirmDialog.component.scss'],
    providers: [DialogService],
})
export class DeleteConfirmDialogComponent implements OnInit {
    @Input() message: string;
    msgs: Message[] = [];

    constructor(
        public dialogService: DialogService,
        public messageService: MessageService,
        public ref: DynamicDialogRef,
    ) {}

    ngOnInit(): void {}

    public deleteConfirmation(confirm: boolean) {
        this.ref.close(confirm);
    }

}
