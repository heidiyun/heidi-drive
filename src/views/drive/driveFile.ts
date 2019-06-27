import { FirestoreDocumentData } from '@/lib/firebase-web';

export default class DriveFile extends FirestoreDocumentData {
  public fileName: string = '';
  public fileType: string = '';
  public uploadDate: string = '';
  public fileURL: string = '';
  public uid: string = '';
  public init(file: File) {
    this.fileName = file.name;
    this.fileType = file.type;
    this.uploadDate = new Date().toUTCString();
  }
  //   constructor(fileName: string, fileType: string, uploadDate: string) {
  //     this.fileName = fileName;
  //     this.fileType = fileType;
  //     this.uploadDate = uploadDate;
  //   }
}
