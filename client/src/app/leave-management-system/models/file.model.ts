export enum EFilesModuleType {
  VISIT = 'VISIT',
  PATIENT = 'PATIENT',
  USER = 'USER',
  DOCTORS = 'DOCTORS'
}

export interface IFile {
  _id?: string;
  moduleId: string;
  moduleType: EFilesModuleType;
  type: string;
  fileName: string;
  fileId: string;
}

export enum EExcelUploadType {
  PATIENTS = 'PATIENTS',
  INVENTORY = 'INVENTORY',
  FACILITIES = 'FACILITIES'
};
