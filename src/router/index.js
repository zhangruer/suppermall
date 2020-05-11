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
    component: home,
    meta: {title: '首页'}
  },
  {
    path: '/cart',
    component: cart,
    meta: {title: '购物车'}
  },
  {
    path: '/category',
    component: category,
    meta: {title: '分类'}
  },
  {
    path: '/detail/:iid',
    component: detail
  },
  {
    path: '/profile',
    component: profile,
    meta: {title: '我的'}
  }
];

// 3、创建路由对象
const router = new VueRouter({
  // 配置路由组件之间的应用关系
  mode: 'history',
  routes,
  linkActiveClass: 'active'
});

// 前置钩子
// 页面跳转显示对应页面的title
// router.beforeEach((to, from, next) => {
//   // 从from跳转到to
//   document.title = to.matched[0].meta.title
//   next()
// })

// 4、导出
export default router;
