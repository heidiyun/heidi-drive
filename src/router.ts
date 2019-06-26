import Vue from 'vue';
import Router from 'vue-router';

import Login from './views/login';
import Drive from './views/drive';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/drive',
      name: 'drive',
      component: Drive
    }
  ]
});
