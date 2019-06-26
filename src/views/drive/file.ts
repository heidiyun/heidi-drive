import { FirestoreDocumentData } from '@/lib/firebase-web';

export default class File extends FirestoreDocumentData {
  private fileName: string = '';
  private fileType: string = '';
  private uploadDate: string = '';
  private fileURL: string = '';
  public init(fileName: string, fileType: string, uploadDate: string) {
    this.fileName = fileName;
    this.fileType = fileType;
    this.uploadDate = uploadDate;
  }
  //   constructor(fileName: string, fileType: string, uploadDate: string) {
  //     this.fileName = fileName;
  //     this.fileType = fileType;
  //     this.uploadDate = uploadDate;
  //   }
}
