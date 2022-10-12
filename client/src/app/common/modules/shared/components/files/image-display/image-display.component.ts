import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IFile } from 'src/app/leave-management-system/models/file.model';
import { FileService } from 'src/app/leave-management-system/services/file/file.service';


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
