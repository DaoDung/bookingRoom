import Vue from 'vue'
import Router from 'vue-router'
import Guest from '@/page/Guest'
import Login from '@/page/Login'
import Register from '@/page/Register'
import Home from '@/page/Home'

Vue.use(Router)
const router = new Router({
    routes: [
      {
        path: '/guest',
        component: Guest,
        name: 'guest',
        children: [
            {
                path: 'login',
                component: Login
            },
            {
                path: 'register',
                component: Register
            },
        ],
        meta: { 
            guest: true
        }
      },
      {
        path: '',
        name: 'home',
        component: Home, 
        meta: { 
            requiresAuth: true
        }
      }
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (!sessionStorage.requiresAuth) {
            next({
                path: '/guest/login',
            })
        }else{
            next()
        }
    } else {
        next() 
    }
})
export default router
  