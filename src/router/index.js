import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home'),
    },
    {
        path: '/split-name',
        component: () => import(/* webpackChunkName: "split-name" */ '@/views/split-name'),
    },
    // {path: '*', redirect: '/404', hidden: true},
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})

const router = createRouter()
export default router
