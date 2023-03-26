import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { IFile } from 'src/app/model/file.model';
import { FileService } from 'src/app/services/file/file.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { ImageDisplayComponent } from '../image-display/image-display.component';
import { DialogService } from 'primeng/dynamicdialog';
import { DeleteConfirmDialogComponent } from 'src/app/shared/components/delete-confirm-dialog/deleteConfirmDialog.component';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
  providers:[DialogService]
})
export class FileListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() moduleId: string;
  // @Input() moduleType: ModuleType;
  @Input() uploadURL: string;
  files: IFile[] = [];
  fileTableColumns: string[] = ['FileName', 'Type'];
  subscriptions = new Subscription();
  modalDismissed: boolean;

  searchText: string = "";

  constructor(
    // private modalService: NgbModal,
    private fileService: FileService,
   public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getModuleFiles();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnChanges(): void {
    this.getModuleFiles();
  }


 
  openUploadFileModal(): void {
    const modalRef = this.dialogService.open(FileUploadComponent,{
      data:{
        uploadURL:this.uploadURL
      },
      width:'50%',
      height:'50%'
    });
   
    modalRef.onClose.subscribe((receiveEntry)=>{
  if(receiveEntry){
    this.getModuleFiles()
  
  }

})



  }

  openPDFFile(file: IFile): void {
    this.fileService
    .getPDFFileById(file?.fileId)
    .subscribe()
  }

  openImageModal(file: IFile): void {
    const modalRef = this.dialogService.open(ImageDisplayComponent,{
       width:'50%',
        height:'50%'
    });
     this.files;
  }

  getModuleFiles(): void {
    this.subscriptions.add(
      this.fileService.getFilesByModuleId(this.moduleId).subscribe({
        next: (res) => {
          this.files = res.result?.length > 0 ? res.result.slice().reverse() : [];
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
    const ref =this.dialogService.open(DeleteConfirmDialogComponent,{
      width: '30%',
      height:'30%',
      header:'Delete Confirmation'
      
 
    })

    ref.onClose.subscribe((confirm)=>{
      if (confirm) {
        this.deleteFile(file?._id);
      }
    })

  
  }

  downloadFile(file: IFile): void {
    this.fileService
      .downloadFile(file?.fileId)
      .subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = file?.fileName;
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
  }

  checkIfFileIsImage(fileType: string): boolean {
    if (!fileType) {
      return false;
    }
    return fileType.includes('image') ? true : false;
  }
}
