import { Vue, Component } from 'vue-property-decorator';
import User from '@/models/user';
import Profile from '@/components/profile';
import {
  Auth,
  FirestoreCollection,
  FirestoreDocument
} from '@/lib/firebase-web';
import { SignInMethod } from '@/lib/firebase-web/auth';

const collection = new FirestoreCollection<User>('/user');

Vue.component('profile-card', Profile);
@Component({})
export default class Login extends Vue {
  public user: FirestoreDocument<User> = collection.create(User);
  private hasUser: boolean = false;
  private signButtonText = this.hasUser ? 'Sign Out' : 'Sign In';

  public mounted() {
    Auth.addChangeBeforeListener('login', async (user) => {
      if (user !== null) {
        const exist = await collection.exist(user.uid);
        if (exist) {
          this.user = await collection.load(User, user.uid);
        } else {
          this.user = collection.create(User, user.uid);
          this.user.data.email = user.email ? user.email : '';
          this.user.data.userName = user.displayName ? user.displayName : '';
          this.user.data.photoURL = user.photoURL ? user.photoURL : '';
          this.user.saveSync();
        }
        this.hasUser = true;
        this.signButtonText = 'Sign Out';
        this.$store.commit('setUser', this.user);
        console.log(this.$store.getters.user);
      } else {
        this.hasUser = false;
        this.signButtonText = 'Sign In';
      }
    });
  }

  private onClickLoginButton() {
    if (this.hasUser) {
      Auth.signOut();
    } else {
      Auth.signIn(SignInMethod.Google);
    }
  }

  public gotoDrive() {
    this.$router.push('/drive');
  }
}
