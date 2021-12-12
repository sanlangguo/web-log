const Home = () => import('@/views/index.vue');
const Login = () => import('@/views/login.vue');
const logCount = () => import('@/views/logCount.vue');
const logList = () => import('@/views/logList.vue');
const overView = () => import('@/views/overView.vue');
const proDetails = () => import('@/views/proDetails.vue');

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/logCount',
    meta: {
      title: '监控首页'
    },
    children: [
      {
        path: "overView",
        name: "overView",
        component: overView,
        meta: {
          title: '概况'
        },
      },
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
      {
        path: "pro-details/:id",
        name: "pro-details",
        component: proDetails,
        meta: {
          title: '项目详情'
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