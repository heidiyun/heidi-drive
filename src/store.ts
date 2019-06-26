import Vue from 'vue';
import Vuex from 'vuex';
import { FirestoreDocument } from './lib/firebase-web';
import User from './models/user';
Vue.use(Vuex);

export interface State {
  user: FirestoreDocument<User> | undefined;
}

export default new Vuex.Store<State>({
  state: {
    user: undefined
  }, // data
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  }, // setter sync

  getters: {
    user(state) {
      return state.user;
    }
  } // getter

  //   actions: {}, // setter sync
});
