/*global Vue*/
import Router from 'vue-router'
import Axios from 'axios'
import login from '@/views/login'
import receiveOrder from '@/views/receiveOrder'
import order from '@/views/order'
import manage from '@/views/manage'
import roomMessage from '@/views/room_message'
import roomAdd from '@/views/room_add'
import discount from '@/views/discount'
import discountAdd from '@/views/discount_add'

var baseUrl = 'http://172.26.0.113';
Vue.prototype.baseUrl = baseUrl;
Vue.use(Router)

module.exports = new Router({
  routes: [
    {
      path: '/',
      name: 'receiveOrder',
      component: receiveOrder
    },
    {
      path: '/receiveOrder',
      name: 'receiveOrder',
      component: receiveOrder
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/manage',
      name: 'manage',
      component: manage
    },
    {
      path: '/roomMessage',
      name: 'roomMessage',
      component: roomMessage
    },
    {
      path: '/roomAdd',
      name: 'roomAdd',
      component: roomAdd,
    },
    {
      path: '/discount',
      name: 'discount',
      component: discount,
    },
    {
      path: '/discountAdd',
      name: 'discountAdd',
      component: discountAdd,
    }
  ]
})
