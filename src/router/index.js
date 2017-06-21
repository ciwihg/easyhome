import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/front/pc/home'
import adminhome from '@/components/admin/adminhome'
import room from '@/components/admin/room'
import roomadd from '@/components/admin/roomadd'
import roomedit from '@/components/admin/roomedit'
import charge from '@/components/admin/charge'
import chargeadd from '@/components/admin/chargeadd'
import chargeedit from '@/components/admin/chargeedit'
import datacenter from '@/components/admin/datacenter'
import roomrecord from '@/components/admin/roomrecord'
import carousel from '@/components/admin/carousel'
import carouseladd from '@/components/admin/carouseladd'
import carouseledit from '@/components/admin/carouseledit'
import mframework from '@/components/front/mobile/framework'
import mhome from '@/components/front/mobile/home'
import mdetail from '@/components/front/mobile/goodsrow'
import muserroom from '@/components/front/mobile/userroom'
import MuseUI from 'muse-ui'
import mylib from '@/mylib/mylib.js'
import 'muse-ui/dist/muse-ui.css'

Vue.use(MuseUI)
Vue.use(mylib)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/adminhome',
      name: 'adminhome',
      component: adminhome,
      children:[
        {
          path: 'room',
          name: 'room',
          component: room
        },
        {
          path: 'roomadd',
          name: 'roomadd',
          component: roomadd
        },
        {
          path: 'charge',
          name: 'charge',
          component: charge
        },
        {
          path: 'chargeadd',
          name: 'chargeadd',
          component: chargeadd
        },
        {
          path: 'datacenter',
          name: 'datacenter',
          component: datacenter
        },
        {
          path: 'roomrecord/:rid/:type',
          name: 'roomrecord',
          component: roomrecord
        },
        {
          path: 'roomedit/:rid',
          name: 'roomedit',
          component: roomedit
        }
        ,
        {
          path: 'chargeedit/:id',
          name: 'chargeedit',
          component: chargeedit
        }
        ,
        {
          path: 'carousel',
          name: 'carousel',
          component: carousel
        }
        ,
        {
          path: 'carouseladd',
          name: 'carouseladd',
          component: carouseladd
        }
        ,
        {
          path: 'carouseledit/:num',
          name: 'carouseledit',
          component: carouseledit
        }
      ]
    },
    {
      path:"/",
      name:"home",
      component: home
    },
    {
      path:"/m",
      name:"framework",
      component: mframework,
      children:[
        {
          path:'home',
          name:'home',
          component:mhome
        },
        {
          path:'userroom',
          name:'userroom',
          component:muserroom
        }
      ]
    },
    {
      path:"/room/:id",
      name:"mdetail",
      component: mdetail
    }

  ]
})
