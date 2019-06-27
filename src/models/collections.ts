import { FirestoreCollection } from '@/lib/firebase-web';
import User from './user';
import DriveFile from '@/views/drive/driveFile';

export default class Collections {
  public static readonly user: FirestoreCollection<
    User
  > = new FirestoreCollection('/users');

  public static readonly file: FirestoreCollection<
    DriveFile
  > = new FirestoreCollection('/files');
}
