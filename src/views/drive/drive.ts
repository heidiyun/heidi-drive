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
import User from '@/models/user';
import Profile from '@/components/profile';

Vue.component('profile-card', Profile);
@Component({})
export default class Drive extends Vue {
  private titleClicked: boolean = false;
  private inputMessage: string = '';
  private fileList: Array<FirestoreDocument<DriveFile>> = [];
  private rightMouseClicked = false;
  private sortMenuClickedList: Array<boolean> = new Array<boolean>(4);
  private nameFilterModel: string = '';
  private selectedId = '';
  private folderList: {
    user: FirestoreDocument<User>;
    checked: boolean;
  }[] = [];
  private filterOption = {
    type: 'fileName', // uploadDate
    order: 'asc'
  };
  private profileCardOpend = false;

  

  get currentFileList() {
    // TODO 조건 처리
    let ret: Array<FirestoreDocument<DriveFile>> = [];
    for (let i = 0; i < this.folderList.length; i++) {
      if (this.folderList[i].checked) {
        for (const f of this.fileList) {
          if (f.data.uid === this.folderList[i].user.data.uid) {
            ret.push(f);
          }
        }
      }
    }

    const ids = _(this.folderList)
      .filter((folder) => folder.checked)
      .map((folder) => folder.user.id)
      .value();

    ret = _.chain(this.fileList)
      .sortBy((f) => f.data[this.filterOption.type])
      .filter((f) =>
        ids.length === 0 ? true : _.some(ids, (id) => f.data.uid === id)
      )
      .filter((f) => f.data.fileName.indexOf(this.nameFilterModel) !== -1)
      .value();
    if (this.filterOption.order === 'dsc') {
      return _.reverse(ret);
    }
   return ret;
  }

  private showFile(file: FirestoreDocument<DriveFile>) {
    window.location.assign(file.data.fileURL);
  }

  private async removeFile(file: FirestoreDocument<DriveFile>) {
    // const index = this.fileList.indexOf(file);
    // console.warn(index);
    const storage = new Storage(`/files/${file.id}`);
    try {
      await storage.delete();
      file.delete();
    } catch (e) {
      console.error(e);
    }
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

  private clearSearchText() {
    this.nameFilterModel = '';
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

        const users = await Collections.user.get(User);

        this.folderList = _(users)
          .map((user) => {
            return {
              user,
              checked: user.id === u.uid
            };
          })
          .sortBy((folder) => folder.user.id !== u.uid)
          .value();

        this.folderList.forEach((f) => {
          if (f.user.data.uid === this.$store.getters.user.data.uid) {
          }
        });

        console.log(this.folderList[0].user.data.userName);

        Collections.file.clearOnChange();

        Collections.file.onChange(DriveFile, (file, state) => {
          if (state === 'added') {
            this.fileList.push(file);
          } else if (state === 'removed') {
            const index = _.findIndex(this.fileList, (f) => f.id === file.id);
            // const index = this.fileList.indexOf(file);
            console.log('index : ' + index);
            this.fileList.splice(index);
          }
        });
      },
      true
    );
  }
}
