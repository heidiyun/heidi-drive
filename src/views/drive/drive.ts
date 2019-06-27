import { Vue, Component } from 'vue-property-decorator';
import { List } from 'lodash';
import File from './file';
import {
  FirestoreCollection,
  FirestoreDocument,
  Storage,
  Auth
} from '@/lib/firebase-web';
import Collections from '@/models/collections';
import DriveFile from './driveFile';
import _ from 'lodash';

@Component({})
export default class Drive extends Vue {
  private titleClicked: boolean = false;
  private inputMessage: string = '';
  private fileList: Array<FirestoreDocument<DriveFile>> = [];
  private rightMouseClicked = false;
  private sortMenuClickedList: Array<boolean> = new Array<boolean>(4);
  private folderList = [
    '내 드라이브',
    '팀 드라이브',
    '컴퓨터',
    '공유 문서함',
    '최근 문서함',
    '중요',
    '휴지통'
  ];
  private filterOption = {
    type: 'fileName', // uploadDate
    order: 'asc'
  };

  get currentFileList() {
    // TODO 조건 처리
    const ret = _.sortBy(this.fileList, (f) => f.data[this.filterOption.type]);
    if (this.filterOption.order === 'dsc') {
      return _.reverse(ret);
    }
    return ret;
  }

  private uploadFile() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.style.display = 'none';
    input.addEventListener('change', this.onChange);
    input.click();
    document.body.appendChild(input);
    // TODO
    /**
     * 1. input을 만든다
     * 2. input을 안보이게 설정한다
     * 3. input에 change 이벤트를 연결한다
     * 4. input을 body에 붙힌다.
     * 5. input에 click을 실행한다.
     * 6. change or cancel 이 호출되면 생성한 input을 지운다
     */
  }

  private async onChange(e) {
    console.log(e);
    const file = e.target.files[0];
    console.log(file);
    console.log(file.uid);

    const fileDocument = Collections.file.create(DriveFile);
    fileDocument.data.fileName = file.name;
    fileDocument.data.fileType = file.type;
    fileDocument.data.uid = this.$store.getters.user.id;
    fileDocument.data.uploadDate = new Date().toUTCString();

    const storage = new Storage(`/files/${fileDocument.id}`);
    await storage.upload(file);
    const url = await storage.getDownloadURL();

    fileDocument.data.fileURL = url;
    fileDocument.saveSync();
  }

  private mounted() {
    Auth.addChangeListener(
      'drive',
      async (u) => {
        if (u === null) {
          this.$router.push('/login');
          return;
        }

        // this.fileList = await Collections.file
        //   .createQuery('uid', '==', this.$store.getters.user.id)
        //   .exec(DriveFile);

        Collections.file
          .createQuery('uid', '==', this.$store.getters.user.id)
          .onChange(DriveFile, (file, state) => {
            if (state === 'added') {
              this.fileList.push(file);
            }
          });
      },
      true
    );
  }

  private setSortMenuClickedList(index: number) {
    for (let i = 0; i < this.sortMenuClickedList.length; i++) {
      this.sortMenuClickedList[i] = false;
    }

    this.sortMenuClickedList[index] = true;
  }

  private sortFileList(type: string): Array<FirestoreDocument<DriveFile>> {
    switch (type) {
      case 'timeUp':
        this.fileList.sort((a, b) => {
          return (
            new Date(a.data.uploadDate).getTime() -
            new Date(b.data.uploadDate).getTime()
          );
        });

        break;

      case 'timeDown':
        this.fileList.sort((a, b) => {
          return (
            new Date(b.data.uploadDate).getTime() -
            new Date(a.data.uploadDate).getTime()
          );
        });
        break;

      case 'nameUp':
        this.fileList.sort((a, b) => {
          return a.data.fileName < b.data.fileName
            ? -1
            : a.data.fileName > b.data.fileName
            ? 1
            : 0;
        });
        break;
      case 'nameDown':
        this.fileList.sort((a, b) => {
          return a.data.fileName > b.data.fileName
            ? -1
            : a.data.fileName < b.data.fileName
            ? 1
            : 0;
        });
        break;
    }
    return this.fileList;
  }
}
