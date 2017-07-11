import Vue from 'vue'
import Router from 'vue-router'
import pcframework from '@/components/front/pc/pcframework'
import pchome from '@/components/front/pc/pchome'
import pcsortpage from '@/components/front/pc/pcsortpage'
import pcdetail from '@/components/front/pc/pcdetail'
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
import mdetail from '@/components/front/mobile/roomdetail'
import muserroom from '@/components/front/mobile/userroom'
import sortpage from '@/components/front/mobile/sortpage'
import customer from '@/components/admin/customer'
import customeredit from '@/components/admin/customeredit'
import adminlogin from '@/components/admin/adminlogin'
import MuseUI from 'muse-ui'
import mylib from '@/mylib/mylib.js'
import 'muse-ui/dist/muse-ui.css'

Vue.use(MuseUI)
Vue.use(mylib)
Vue.use(Router)

export default new Router({
  routes: [
     { path: '/', redirect: '/home' },
    {
      path:"/",
      name:"pcframework",
      component: pcframework,
      children:[
        {
          path:'home',
          name:'pchome',
          component:pchome
        },
        {
          path:"proom/:id",
          name:"pcdetail",
          component: pcdetail
        },
        {
          path:"sortpage/:type",
          name:"pcsortpage",
          component: pcsortpage
        }
      ]
    },
    {
      path:"/m",
      name:"framework",
      component: mframework,
      children:[
        {
          path:'home',
          name:'mhome',
          component:mhome
        },
        {
          path:'userroom',
          name:'userroom',
          component:muserroom
        },
        {
          path:'sortpage/:type',
          name:'sortpage',
          component:sortpage
        }
      ]
    },
    {
      path:"/room/:id",
      name:"mdetail",
      component: mdetail
    },
    {
      path:'/ciwi_admin',
      name:"adminlogin",
      component: adminlogin
    }

  ]
})
