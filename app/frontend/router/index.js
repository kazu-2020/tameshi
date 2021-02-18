import Vue from 'vue';
import VueRouter from 'vue-router';
import Signup from '../components/pages/Signup.vue';
import Login from '../components/pages/Login.vue';
import UserIndex from '../components/pages/UserIndex.vue';
import store from '../store/index';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Signup,
      name: 'Signup',
    },
    {
      path: '/login',
      component: Login,
      name: 'Login',
    },
    {
      path: '/users',
      component: UserIndex,
      name: 'UserIndex',
      meta: { requireAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  store.dispatch('users/fetchAuthUser').then((authUser) => {
    if (to.matched.some((record) => record.meta.requireAuth) && !authUser) {
      next({ name: 'Login' });
    } else next();
  });
});

export default router;
