import { Vue, Component, Prop } from 'vue-property-decorator';
import User from '@/models/user';
import { FirestoreDocument } from '@/lib/firebase-web';

@Component({})
export default class Profile extends Vue {
  @Prop()
  public user?: FirestoreDocument<User>;

  
}
