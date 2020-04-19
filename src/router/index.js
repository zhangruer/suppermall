import Vue from "vue";
import VueRouter from "vue-router";

const home = () => import('views/home/home')
const cart = () => import('views/cart/cart')
const category = () => import('views/category/category')
const detail = () => import('views/detail/detail')
const profile = () => import('views/profile/profile')

// 1、安装路由
Vue.use(VueRouter);

// 2、配置路由信息
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/cart',
    component: cart
  },
  {
    path: '/category',
    component: category
  },
  {
    path: '/detail/:iid',
    component: detail
  },
  {
    path: '/profile',
    component: profile
  }
];

// 3、创建路由对象
const router = new VueRouter({
  mode: 'history',
  routes
});

// 4、导出
export default router;
