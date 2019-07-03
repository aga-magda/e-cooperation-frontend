import Vue from 'vue';
import Router from 'vue-router';
import store from '../_store/store.js';
import Home from '../views/Home.vue';


Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "main" */ '../views/Search.vue'),
    },
    {
      path: '/search/:id',
      name: 'search/:id',
      component: () => import(/* webpackChunkName: "main" */ '../views/ProjectDetails.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/projects/',
      name: 'projects/',
      component: () => import(/* webpackChunkName: "main" */ '../views/UserProjects.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/projects/:id',
      name: 'projects/:id',
      component: () => import(/* webpackChunkName: "main" */ '../views/MyProjectDetails.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '*',
      redirect: '/home',
    },
  ],
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/home');
  }
  else {
    next();
  }
});

export default router;





