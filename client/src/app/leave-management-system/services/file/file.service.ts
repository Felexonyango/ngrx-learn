import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IApiHTTPResponse } from '../../models/api.response.model';
import { IFile } from '../../models/file.model';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  worksheet: any;

  constructor(
    private httpClient: HttpClient
  ) { }

  // uploadFile(file: FormData): Observable<HttpEvent<any>> {

  //   const req = new HttpRequest('POST', `${environment.server_Url}/files/upload`, file, {
  //     reportProgress: true,
  //     responseType: 'json'
  //   });

  //   return this.httpClient.request(req);
  // }

  uploadFile(file: FormData, uploadURL: string): Observable<HttpEvent<any>> {

    const req = new HttpRequest('POST', `${environment.server_Url}/${uploadURL}`, file, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }

  getFilesByModuleId(moduleId: string): Observable<IApiHTTPResponse<IFile[]>> {
    return this.httpClient.get<IApiHTTPResponse<IFile[]>>(`${environment.server_Url}files/getModuleFilesByModuleItemId/${moduleId}`);
  }
  getImageFileById(fileId: string): Observable<Blob> {
    return this.httpClient.get(`${environment.server_Url}files/downloadImagesOnly/${fileId}`, { responseType: 'blob' });
  }
  getPDFFileById(fileId: string): Observable<Blob> {
    return this.httpClient.get(`${environment.server_Url}files/downloadFile/${fileId}`, { responseType: 'blob' }).pipe(
      map(res => {
        var fileURL = URL.createObjectURL(res);
        window.open(fileURL);
        return res;
      })
    );
  }

  deleteFile(fileRefId: string): Observable<IApiHTTPResponse<IFile>> {
    return this.httpClient.delete<IApiHTTPResponse<IFile>>(`${environment.server_Url}files/delete/${fileRefId}`);
  }
  deleteFileByRefId(fileRefId: string): Observable<IApiHTTPResponse<IFile>> {
    return this.httpClient.delete<IApiHTTPResponse<IFile>>(`${environment.server_Url}files/sample/delete/${fileRefId}`);
  }
  downloadFile(id: string): Observable<Blob> {
    return this.httpClient.get(`${environment.server_Url}files/downloadfile/${id}`, { responseType: 'blob' });
  }
  downloadImageFile(id: string): Observable<Blob> {
    return this.httpClient.get(`${environment.server_Url}files/downloadImagesOnly/${id}`, { responseType: 'blob' });
  }

  readExcel(fileUploaded: File): any {
    // const readFile = new FileReader();
    // readFile.onload = (e) => {
    //   const storeData: any = readFile.result;
    //   const data = new Uint8Array(storeData);
    //   const arr = new Array();
    //   for (let i = 0; i !== data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
    //   const bstr = arr.join('');
    //   const workbook = XLSX.read(bstr, { type: 'binary' });
    //   const firstSheetName = workbook.SheetNames[0];
    //   this.worksheet = workbook.Sheets[firstSheetName];
    // };
    // readFile.readAsArrayBuffer(fileUploaded);
  }

  readAsJson(): any {
    // let jsonData;
    // jsonData = XLSX.utils.sheet_to_json(this.worksheet, { raw: false });
    // // jsonData = JSON.stringify(jsonData);
    // return jsonData;
  }


}
