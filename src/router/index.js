import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
Vue.use(Router)
// component: () => import('@/views/guide/index'),
export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/components/index'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/components/view/home')
        },
        {
          path: '/member-list',
          component: () => import('@/components/view/member-list')
        },
        {
          path: '/upcounpons',
          component: () => import('@/components/view/upcounpons')
        },
        {
          path: '/operator-detail',
          component: () => import('@/components/view/operator-detail')
        },
        {
          path: '/operator-user',
          component: () => import('@/components/view/operator-user')
        },
        {
          path: '/operator-itemdetail',
          component: () => import('@/components/view/operator-itemdetail')
        }
        ,
        {
          path: '/additemid',
          component: () => import('@/components/view/additemid')
        },
        {
          path: '/changepsw',
          component: () => import('@/components/view/changepsw')
        },
        {
          path: '/user',
          component: () => import('@/components/view/user')
        },
        {
          path: '/orderlist',
          component: () => import('@/components/view/orderlist')
        },
        {
          path: '/commission',
          component: () => import('@/components/view/commission')
        },
        {
          path: '/cash-drawal',
          component: () => import('@/components/view/cash-drawal')
        }, {
          path: '/member-information',
          component: () => import('@/components/view/member-information')
        }
        ,
        {
          path: '/newslist',
          component: () => import('@/components/view/newslist')
        },
        {
          path: '/additemidnews',
          component: () => import('@/components/view/additemidnews')
        },
        {
          path: '/commissionmonth-list',
          component: () => import('@/components/view/commissionmonth-list')
        },
        {
          path: '/commissiontotal-list',
          component: () => import('@/components/view/commissiontotal-list')
        },
        {
          path: '/registeroperator',
          component: () => import('@/components/view/registeroperator')
        },
        {
          path: '/test',
          component: () => import('@/components/view/test')
        },
        {
          path: '/newsection',
          component: () => import('@/components/view/newsection')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/components/login')
    },
    {
      path: '/404',
      component: () => import('@/components/view/errorPage/404')
    },
    {
      path: '/401',
      component: () => import('@/components/view/errorPage/401')
    },
    {
      path: '*',
      component: () => import('@/components/view/errorPage/404')
    },

  ]
})
