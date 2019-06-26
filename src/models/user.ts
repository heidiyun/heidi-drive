import { FirestoreDocumentData } from '@/lib/firebase-web';

export default class User extends FirestoreDocumentData {
  public userName: string = '';
  public email: string = '';
  public photoURL: string = '';
}
