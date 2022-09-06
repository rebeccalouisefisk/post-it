import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import CreateAccount from '../views/Create-account.vue'
import CreatePost from '../views/Create-post.vue'
import AllPosts from '../views/All-posts.vue'
import MyProfile from '../views/My-profile.vue'
import Settings from '../views/Settings.vue'
import BrowseCategories from '../views/Browse-categories.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/myProfile',
    name: 'MyProfile',
    component: MyProfile
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/allPosts',
    name: 'AllPosts',
    component: AllPosts
  },
  {
    path: '/browseCategories',
    name: 'BrowseCategories',
    component: BrowseCategories
  },
  {
    path: '/createAccount',
    name: 'CreateAccount',
    component: CreateAccount
  },
  {
    path: '/createPost',
    name: 'CreatePost',
    component: CreatePost
  }
]

const router = new VueRouter({
  routes
})

export default router
