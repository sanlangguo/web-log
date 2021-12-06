const Home = () => import('@/views/index.vue');
const Login = () => import('@/views/login.vue');
const logCount = () => import('@/views/logCount.vue');
const logList = () => import('@/views/logList.vue');

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      title: '监控首页'
    },
    children: [
      {
        path: "logCount",
        name: "logCount",
        component: logCount,
        meta: {
          title: '日志统计'
        },
      },
      {
        path: "logList",
        name: "logList",
        component: logList,
        meta: {
          title: '日志查询'
        },
      },
    ]
  }, {
    path: '/login',
    component: Login,
    meta: {
      title: '监控登录'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(function (to: any, from, next): void {
  window.document.title = to.meta.title;
  next();
})

export default router