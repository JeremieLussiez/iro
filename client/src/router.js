import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Login from './views/Login.vue';
import {store} from "./store";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'about',
      component: About,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '**',
      name: 'default',
      component: About,
    },
  ],
});

export default router;

router.beforeEach((to, from, next) => {
  if (store.state.authenticationToken.length > 0 || to.path === '/login' || to.path === '/') {
    next();
  } else {
    next('login');
  }
});
