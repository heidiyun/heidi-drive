import { Vue, Component, Prop } from 'vue-property-decorator';
import User from '@/models/user';
import { Auth, FirestoreDocument } from '@/lib/firebase-web';

@Component({})
export default class Profile extends Vue {
  @Prop()
  public user?: FirestoreDocument<User>;

  private onClickLoginButton() {
    Auth.signOut();
  }
}
