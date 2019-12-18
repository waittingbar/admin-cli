import Vue from 'vue';

import VueRouter from 'vue-router';
import Dashboard from '../view/dashboard/index.vue';
import ArticleList from '../view/list.vue';

Vue.use(VueRouter);

export default function createRouter() {
  const router = new VueRouter({
    mode: 'history',
    base: '/admin/',
    routes: [
      {
        path: '/',
        component: Dashboard
      },
      {
        path: '/article/list',
        component: ArticleList
      },
      {
        path: '/menus/list',
        component: () => import('../view/menus/index.vue')
      },
      {
        path: '/article/detail/:id',
        component: () => import('../view/detail.vue')
      },
      {
        path: '/zhibo/list',
        component: () => import('../view/zhibo/list.vue')
      },
      {
        path: '/zhibo/graburl',
        component: () => import('../view/zhibo/grabUrl.vue')
      },
      {
        path: '*', component: () => import('../view/notfound.vue')
      }
    ]
  });

  router.beforeEach((route, redirec, next) => {
    next();
  });

  router.afterEach((route, redirec) => {
    if (EASY_ENV_IS_BROWSER && route.matched && route.matched.length) {
      // const matchComponent = route.matched[0].components.default;
      // const asyncData = matchComponent.methods && matchComponent.methods.fetchApi;
      // if (asyncData) {
      //   console.log('router afterEach trigger asyncData', route);
      //   asyncData(router.app.$store, route);
      // }
    }
  });

  return router;
}
