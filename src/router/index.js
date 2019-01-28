import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import MemberList from '@/components/view/member-list'
import Login from '@/components/login'
import UpCounpons from '@/components/view/upCounpons'
import Home from '@/components/view/home'
import OperatorDetail from '@/components/view/operator-detail'
import OperatorUser from '@/components/view/operator-user'
import OperatorItemDetail from '@/components/view/operator-itemdetail'
import additemid from '@/components/view/additemid'
import ChangePsw from '@/components/view/changepsw'
import User from '@/components/view/user'
import OrderList from '@/components/view/orderlist'
import Commission from '@/components/view/commission'
import MemberInformation from '@/components/view/member-information'
import CashDrawal from '@/components/view/cash-drawal'
import itemidnews from '@/components/view/itemidnews'
import additemidnews from '@/components/view/additemidnews'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: Home
        },
        {
          path: '/member-list',
          component: MemberList
        },
        {
          path: '/upcounpons',
          component: UpCounpons
        },
        {
          path: '/operator-detail',
          component: OperatorDetail
        },
        {
          path: '/operator-user',
          component: OperatorUser
        },
        {
          path: '/operator-itemdetail',
          component: OperatorItemDetail
        }
        ,
        {
          path: '/additemid',
          component: additemid
        },
        {
          path: '/changepsw',
          component: ChangePsw
        },
        {
          path: '/user',
          component: User
        },
        {
          path: '/orderlist',
          component: OrderList
        },
        {
          path: '/commission',
          component: Commission
        },
        {
          path: '/cash-drawal',
          component: CashDrawal
        }, {
          path: '/member-information',
          component: MemberInformation
        }
        ,
        {
          path: '/itemidnews',
          component: itemidnews
        },
        {
          path: '/additemidnews',
          component: additemidnews
        }
      ]
    },
    {
      path: '/login',
      component: Login,
    }
  ]
})
