import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Login from './views/Login.vue';

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

router.beforeEach((to, from, next) => {
  if (false || to.path === '/login' || to.path === '/') {
    next();
  } else {
    next('login');
  }
});

export default router;
