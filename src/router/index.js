import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import home from '@/components/front/home'
import adminhome from '@/components/adminhome'
import room from '@/components/admin/room'
import roomadd from '@/components/admin/roomadd'
import roomedit from '@/components/admin/roomedit'
import charge from '@/components/admin/charge'
import chargeadd from '@/components/admin/chargeadd'
import chargeedit from '@/components/admin/chargeedit'
import datacenter from '@/components/admin/datacenter'
import roomrecord from '@/components/admin/roomrecord'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

Vue.use(MuseUI)

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
      ]
    },
    {
      path:"/",
      name:"home",
      component: home
    },
  ]
})
