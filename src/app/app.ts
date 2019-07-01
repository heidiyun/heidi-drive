import { Vue, Component } from 'vue-property-decorator';
import { Auth } from '@/lib/firebase-web';
import Collections from '@/models/collections';
import User from '@/models/user';

@Component({})
export default class App extends Vue {
  private mounted() {
    if (this.$route.name === null) {
      this.$router.push('/login');
    }

    Auth.addChangeBeforeListener('login', async (u) => {
      if (u !== null) {
        const exist = await Collections.user.exist(u.uid);
        let user = Collections.user.create(User, u.uid);
        if (exist) {
          user = await Collections.user.load(User, u.uid);
          user.saveSync();
        } else {
          user = Collections.user.create(User, u.uid);
          user.data.email = u.email ? u.email : '';
          user.data.userName = u.displayName ? u.displayName : '';
          user.data.photoURL = u.photoURL ? u.photoURL : '';
          user.data.uid = u.uid ? u.uid : '';
          user.saveSync();
        }

        this.$store.commit('setUser', user);
        console.log(this.$store.getters.user);
      } else {
        this.$store.commit('setUser', undefined);
      }
    });
  }
}
