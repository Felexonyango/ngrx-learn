import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ManageUserRolesComponent } from './components/manage-user-roles/manage-user-roles.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/deleteConfirmDialog.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { SharedRoutingModule } from './shared-routing.module';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';
import { ListboxModule } from 'primeng/listbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { FormlyModule } from '@ngx-formly/core';
import { FileListComponent } from './components/files/file-list/file-list.component';
import { FileUploadComponent } from './components/files/file-upload/file-upload.component';
import { ImageDisplayComponent } from './components/files/image-display/image-display.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarGeneratorComponent } from './components/avatar-generator/avatar-generator.component';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { SpeedDialModule } from 'primeng/speeddial';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    DeleteConfirmDialogComponent,

    ManageUserRolesComponent,
    FileUploadComponent,
    FileListComponent,
    ImageDisplayComponent,
    AvatarGeneratorComponent,
    ConfirmDialogComponent,
    DeleteConfirmDialogComponent
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginatorModule,
    TableModule,
    SharedRoutingModule,
    SplitButtonModule,
    ButtonModule,
    FileUploadModule,
    HttpClientModule,
    DialogModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    CalendarModule,
    ListboxModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),

    AvatarModule,
    AvatarGroupModule,
    SpeedDialModule,
    MessageModule,
    MessagesModule,
  ],
  exports: [
    CalendarModule,
    AvatarGeneratorComponent,
    FileUploadComponent,
    FileListComponent,
    AvatarGeneratorComponent,
    DeleteConfirmDialogComponent

  ],
})
export class SharedModule {}
