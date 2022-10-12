import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { DialogService } from "primeng/dynamicdialog";
import { FileUploadComponent } from "../file-upload/file-upload.component";
import { FileService } from "src/app/leave-management-system/services/file/file.service";
import { IFile } from "src/app/leave-management-system/models/file.model";

@Component({
    selector: "app-file-list",
    templateUrl: "./file-list.component.html",
    styleUrls: ["./file-list.component.scss"],
})
export class FileListComponent implements OnInit, OnDestroy {
    @Input() moduleId: string;
    // @Input() moduleType: ModuleType;
    @Input() uploadURL: string;
    @Input() patientCareFiles: [];
    files: IFile[] = [];
    fileTableColumns: string[] = ["fileName", "type"];
    subscriptions = new Subscription();
    modalDismissed: boolean;

    searchText: string = "";

    constructor(
        private fileService: FileService,
        public dialogService: DialogService
    ) {}

    ngOnInit(): void {
        this.getModuleFiles();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    //   openUploadFileModal(noteId?: string): void {
    // const modalRef = this.modalService.open(FileUploadComponent);
    // // modalRef.componentInstance.moduleType = this.moduleType;
    // // modalRef.componentInstance.moduleId = this.moduleId;
    // modalRef.componentInstance.uploadURL = this.uploadURL;
    // modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
    //   if (receivedEntry) {
    //     this.getModuleFiles();
    //   }
    // });
    //   }
    public openUploadFileModal(noteId?: string) {
        const ref = this.dialogService.open(FileUploadComponent, {
            header: "Select File to Upload",
            width: "50%",
            baseZIndex: 10000,
            data: { uploadURL: this.uploadURL },
        });
        // ref.onClose.subscribe((confirm) => {
        //     if (confirm) {
        //         this.deleteItem(item?._id);
        //     }
        // });
    }
    openPDFFile(file: IFile): void {
        this.fileService.getPDFFileById(file?.fileId).subscribe();
    }

    openImageModal(file: IFile): void {
        // const modalRef = this.modalService.open(ImageDisplayComponent);
        // modalRef.componentInstance.file = file;
    }

    getModuleFiles(): void {
        this.subscriptions.add(
            this.fileService.getFilesByModuleId(this.moduleId).subscribe({
                next: (res) => {
                    this.files =
                        res.result?.length > 0
                            ? res.result.slice().reverse()
                            : [];
                },
            })
        );
    }

    deleteFile(fileId: string): void {
        this.subscriptions.add(
            this.fileService.deleteFile(fileId).subscribe({
                complete: () => {
                    this.getModuleFiles();
                },
            })
        );
    }

    public openDialog(file: IFile) {
        // this.popupService
            // .confirm(
            //     "Are you sure you want to move <b>" +
            //         file?.fileName +
            //         "'s</b> to trash?"
            // )
            // .then((confirmed) => {
            //     if (confirmed) {
            //         this.deleteFile(file._id);
            //     }
            // })

            // .catch(() => (this.modalDismissed = true));
    }

    downloadFile(file: IFile): void {
        this.fileService.downloadFile(file?.fileId).subscribe((blob) => {
            const a = document.createElement("a");
            const objectUrl = URL.createObjectURL(blob);
            a.href = objectUrl;
            a.download = file?.fileName;
            a.click();
            URL.revokeObjectURL(objectUrl);
        });
    }

    checkIfFileIsImage(fileType: string): boolean {
        if (!fileType) {
            return false;
        }
        return fileType.includes("image") ? true : false;
    }
}
