import { Vue, Component } from 'vue-property-decorator';
import User from '@/models/user';
import Profile from '@/components/profile';
import {
  Auth,
  FirestoreCollection,
  FirestoreDocument
} from '@/lib/firebase-web';
import { SignInMethod } from '@/lib/firebase-web/auth';
import Collections from '@/models/collections';

Vue.component('profile-card', Profile);
@Component({})
export default class Login extends Vue {
  public user: FirestoreDocument<User> = Collections.user.create(User);
  // private hasUser: boolean = false;
  private signButtonText = '';

  public mounted() {}

  private onClickLoginButton() {
    if (this.$store.getters.user) {
      Auth.signOut();
    } else {
      Auth.signIn(SignInMethod.Google);
    }
  }

  public gotoDrive() {
    this.$router.push('/drive');
  }
}
