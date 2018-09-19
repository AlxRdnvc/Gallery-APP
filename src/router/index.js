import Vue from 'vue'
import VueRouter from 'vue-router'
import { authService } from '../services/Auth';


import Login from '../pages/Login'
import Register from '../pages/Register'
import Galleries from '../pages/Galleries'
import SingleGallery from '../pages/SingleGallery'
import AuthorGalleries from '../pages/AuthorGalleries'
import MyGalleries from '../pages/MyGalleries'
import CreateGallery from '../pages/CreateGallery'

Vue.use(VueRouter)

const routes = [
  {path: '/', redirect: '/galleries', name:'home'},
  {path: '/login', component: Login, name: 'login'},
  {path: '/register', component: Register, name: 'register'},
  {path: '/galleries', component: Galleries, name: 'galleries'},
  {path: '/galleries/:id', component: SingleGallery, name: 'single-gallery'},
  {path: '/authors/:id', component: AuthorGalleries, name: 'author-galleries'},
  {path: '/my-galleries', component: MyGalleries, name: 'my-galleries', meta: { requiresAuth: true }},
  {path: '/create', component: CreateGallery, name: 'create-gallery', meta: { requiresAuth: true }}
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (authService.isAuthenticated()) {
      return next();
    } else {
      return next({ name: "login" });
    }
  }
  next();
});



export default router

