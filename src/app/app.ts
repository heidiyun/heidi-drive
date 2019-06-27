import { Vue, Component } from 'vue-property-decorator';
import { Auth } from '@/lib/firebase-web';
import Collections from '@/models/collections';
import User from '@/models/user';

@Component({})
export default class App extends Vue {
  private mounted() {
    Auth.addChangeBeforeListener('login', async (u) => {
      if (u !== null) {
        const exist = await Collections.user.exist(u.uid);
        let user = Collections.user.create(User, u.uid);
        if (exist) {
          user = await Collections.user.load(User, u.uid);
          user.saveSync();
        } else {
          user = Collections.user.create(User, u.uid);
          user.data.email = this.$store.getters.user.email
            ? this.$store.getters.user.email
            : '';
          user.data.userName = this.$store.getters.user.displayName
            ? this.$store.getters.user.displayName
            : '';
          user.data.photoURL = this.$store.getters.user.photoURL
            ? this.$store.getters.user.photoURL
            : '';
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
