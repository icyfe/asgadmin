import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/index'
import Myuser from '@/components/view/myuser'
import Login from '@/components/login'
import UpCounpons from '@/components/view/upCounpons'
import Home from '@/components/view/home'
import OperatorDetail from '@/components/view/OperatorDetail'
import OperatorUser from '@/components/view/OperatorUser'
import OperatorItemDetail from '@/components/view/OperatorItemDetail'
import additemid from '@/components/view/additemid'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      redirect:'/home',
      children:[
        {
          path:'/home',
          component:Home
        },
        {
          path:'/hello',
          component:HelloWorld, 
        },
        {
          path:'/myuser',
          component:Myuser
        },
        {
          path:'/upcounpons',
          component:UpCounpons
        },
        {
          path:'/OperatorDetail',
          component:OperatorDetail
        },
        {
          path:'/OperatorUser',
          component:OperatorUser
        },
        {
          path:'/OperatorItemDetail',
          component:OperatorItemDetail
        }
        ,
        {
          path:'/additemid',
          component:additemid
        }
      ]
    },
    {
      path:'/login',
      component:Login,
    }
  ]
})
