/*
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
let Home = () => import('../views/Home.vue')
let Category = () => import('../views/Category.vue')
let Tag = () => import('../views/Tag.vue')
let Link = () => import('../views/Link.vue')
let Talk = () => import('../views/Talk.vue')
let Article = () => import('../views/Article.vue')


Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/category',
    component: Category,
  },
  {
    path: '/tag',
    component: Tag,
  },
  {
    path: '/link',
    component: Link,
  },
  {
    path: '/talk',
    component: Talk,
  },
  {
    path: '/blog/:id',
    component: Article,
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
  // base: process.env.BASE_URL,
})

export default router