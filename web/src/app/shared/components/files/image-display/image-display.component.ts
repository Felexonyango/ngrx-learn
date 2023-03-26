import { Component, Input, OnInit } from '@angular/core';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { IFile } from 'src/app/model/file.model';
import { FileService } from 'src/app/services/file/file.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss']
})
export class ImageDisplayComponent implements OnInit {

  @Input() file: IFile;
  subscriptions = new Subscription();
  imageToShow: any;

  constructor(
    private fileService: FileService,
    // public activeModal: NgbActiveModal,

  ) { }

  ngOnInit(): void {
    this.getImageById();
  }

  getImageById(): void {
    this.subscriptions.add(
      this.fileService.getImageFileById(this.file?.fileId).subscribe({
        next: (res) => {
          this.createImageFromBlob(res);
        }
      })
    );
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
  }

}
