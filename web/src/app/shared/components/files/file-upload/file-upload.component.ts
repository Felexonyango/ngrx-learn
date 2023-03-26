
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from "rxjs";
import { FileService } from "src/app/services/file/file.service";
// import { UserService } from "src/app/services";
import { UtilService } from "src/app/services/util/util.service";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

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
    selectedFiles?: FileList;
    progressInfos: any[] = [];
    message: string[] = [];
    // @Input() moduleId: string;
    @Input() moduleType: ModuleType;
    uploadURL: string;
    type: string;
    @Output() passEntry: EventEmitter<any> = new EventEmitter();
    moduleTypeEnum = ModuleType;
    uploaded: boolean = false;
    isLoaded: boolean = false;
    value: number = 0;
    constructor(
        private fileService: FileService,
       
        // public activeModal: NgbActiveModal,
        public utilService: UtilService,
        // private userService: UserService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.getUploadUrl()
    }

    getUploadUrl() {
        this.uploadURL = this.config.data.uploadURL;
        
    }
    selectFiles(event): void {
        this.message = [];
        this.progressInfos = [];
        this.selectedFiles = event.target.files;
    }

    uploadFiles(): void {
        this.message = [];

        if (this.selectedFiles) {
            for (let i = 0; i < this.selectedFiles.length; i++) {
                this.upload(i, this.selectedFiles[i]);
            }
        }
    }

    upload(idx: number, file: File): void {
        console.log(this.uploadURL)
        this.progressInfos[idx] = { value: 0, fileName: file.name };

        if (file) {
            const formData: FormData = new FormData();
            formData.append("file", file);
            this.fileService.uploadFile(formData, this.uploadURL).subscribe({
                next: (event) => {
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
                        this.uploaded = true;
                        //console.log(this.uploadURL);
                    }
                },
                error: (err) => {
                    this.progressInfos[idx].value = 0;
                    const msg = "Could not upload the file: " + file.name;
                    this.message.push(msg);
                    // this.fileInfos = this.uploadService.getFiles();
                },
            });
        }
    }

    readAsJson(): void {
        if (this.selectedFiles) {
            for (let i = 0; i < this.selectedFiles.length; i++) {
                this.fileService.readExcel(this.selectedFiles[i]);
                this.isLoaded = true;

                let interval = setInterval(() => {
                    this.value =
                        this.value + Math.floor(Math.random() * 10) + 1;
                    if (this.value >= 100) {
                        this.value = 100;
                        clearInterval(interval);
                    }
                }, 70);
                setTimeout(() => {
                    this.uploadFile();
                }, 1000);
            }
        }
    }

    uploadFile(): void {
        const worksheet = this.fileService.readAsJson();
        if (worksheet) {
            for (let i = 0; i < worksheet.length; i++) {
                const item = worksheet[i];
                // this.projectService
                //     .addIssueToProject(item, item?.project)
                //     .subscribe();
            }
        }
    }

    getUserProfilePictureMetaData(): void {
        // this.subscriptions.add(
        //     this.userService.getProfilePictureMetaData().subscribe({
        //         next: (res) => {
        //             if (res) {
        //                 this.deleteProfilePic(res.result.fileId);
        //             }
        //         },
        //     })
        // );
    }

    deleteProfilePic(fileId: string): void {
        this.subscriptions.add(this.fileService.deleteFile(fileId).subscribe());
    }
}
