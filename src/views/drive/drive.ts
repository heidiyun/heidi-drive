import { Vue, Component } from 'vue-property-decorator';
import { List } from 'lodash';
import File from './file';
import {
  FirestoreCollection,
  FirestoreDocument,
  Storage,
  Auth
} from '@/lib/firebase-web';

@Component({})
export default class Drive extends Vue {
  private titleClicked: boolean = false;
  private inputMessage: string = '';
  private fileList: File[] = [];
  private folderList = [
    '내 드라이브',
    '팀 드라이브',
    '컴퓨터',
    '공유 문서함',
    '최근 문서함',
    '중요',
    '휴지통'
  ];

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

  private onChange(e) {
    console.log(e);
    const file = e.target.files[0];
    console.log(file);
    console.log(file.name);
    // new Storage()

    // Todo Collection File ,
    //
    // this.fileList.push(new File(file.name, file.type, file.lastModifiedDate));
  }

  private mounted() {
    console.log('mounted');

    console.log(this.$store.getters.user);
    // Auth.addChangeListener(
    //   'drive',
    //   (u) => {
    //     if (u === null) {
    //       this.$router.push('/login');
    //       return;
    //     }
    //     console.log('drive', u);
    //   },
    //   true
    // );
  }
}
