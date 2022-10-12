import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Subscription } from "rxjs";
import { FileService } from "src/app/leave-management-system/services/file/file.service";
import { UtilService } from "src/app/leave-management-system/services/util/util.service";

enum ModuleType {
    USER = "USER",
    VISIT = "VISIT",
    PATIENT = "PATIENT",
    PROFILEPIC = "PROFILEPIC",
}

@Component({
    selector: "app-file-upload",
    templateUrl: "./file-upload.component.html",
    styleUrls: ["./file-upload.component.scss"],
})
export class FileUploadComponent implements OnInit {
    subscriptions = new Subscription();
    selectedFiles?: any[] = [];
    progressInfos: any[] = [];
    message: string[] = [];
    @Input() moduleType: ModuleType;
    @Input() uploadURL: string;
    type: string;
    @Output() passEntry: EventEmitter<any> = new EventEmitter();
    moduleTypeEnum = ModuleType;

    constructor(
        private fileService: FileService,
        public utilService: UtilService,
         public ref: DynamicDialogRef,
         public config: DynamicDialogConfig
    ) {}

    ngOnInit(): void {
        console.log(this.config.data.uploadURL);
    }

    selectFiles(event): void {
        this.message = [];
        this.progressInfos = [];
        this.selectedFiles = event.target.files;
    }

    uploadFiles(): void {
        this.message = [];
        console.log(this.uploadURL);
        if (this.selectedFiles) {
            for (let i = 0; i < this.selectedFiles.length; i++) {
                this.upload(i, this.selectedFiles[i]);
            }
        }
    }

    upload(idx: number, file: File): void {
        this.progressInfos[idx] = { value: 0, fileName: file.name };

        if (file) {
            const formData: FormData = new FormData();
            formData.append("file", file);
            // formData.append('moduleId', this.moduleId);
            // formData.append('moduleType', this.moduleType);
            // formData.append('type', this.type);

            this.fileService.uploadFile(formData, this.uploadURL).subscribe(
                (event: any) => {
                    if (event.type === HttpEventType.UploadProgress) {
                        this.progressInfos[idx].value = Math.round(
                            (100 * event.loaded) / event.total
                        );
                    } else if (event instanceof HttpResponse) {
                        const msg =
                            "Uploaded the file successfully: " + file.name;
                        this.message.push(msg);
                        // this.fileInfos = this.uploadService.getFiles();
                        this.passEntry.emit(formData);
                    }
                },
                (err: any) => {
                    this.progressInfos[idx].value = 0;
                    const msg = "Could not upload the file: " + file.name;
                    this.message.push(msg);
                    // this.fileInfos = this.uploadService.getFiles();
                }
            );
        }
    }

    getUserProfilePictureMetaData(): void {
        // this.subscriptions.add(
        //   this.userService.getProfilePictureMetaData().subscribe({
        //     next: (res) => {
        //       if (res) {
        //         this.deleteProfilePic(res.result.fileId);
        //       }
        //     }
        //   })
        // );
    }

    deleteProfilePic(fileId: string): void {
        this.subscriptions.add(this.fileService.deleteFile(fileId).subscribe());
    }

    confirmCloseFileUploadModal(content): void {
        // this.modalService.open(content);
    }
}
