import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
// import MemberList from '@/components/view/member-list'
// import Login from '@/components/login'
// import UpCounpons from '@/components/view/upCounpons'
// import Home from '@/components/view/home'
// import OperatorDetail from '@/components/view/operator-detail'
// import OperatorUser from '@/components/view/operator-user'
// import OperatorItemDetail from '@/components/view/operator-itemdetail'
// import additemid from '@/components/view/additemid'
// import ChangePsw from '@/components/view/changepsw'
// import User from '@/components/view/user'
// import OrderList from '@/components/view/orderlist'
// import Commission from '@/components/view/commission'
// import MemberInformation from '@/components/view/member-information'
// import CashDrawal from '@/components/view/cash-drawal'
// import itemidnews from '@/components/view/itemidnews'
// import additemidnews from '@/components/view/additemidnews'
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
          path: '/itemidnews',
          component: () => import('@/components/view/itemidnews')
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
