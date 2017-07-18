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
import customer from '@/components/admin/customer'
import customeredit from '@/components/admin/customeredit'
import adminlogin from '@/components/admin/adminlogin'
import recordprint from '@/components/admin/recordprint'
 var adminroutes=[{
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
      path: 'customer',
      name: 'customer',
      component: customer
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
      path: 'recordprint/:rid',
      name: 'recordprint',
      component: recordprint
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
    ,
    {
      path: 'customeredit/:userid',
      name: 'customeredit',
      component: customeredit
    }
  ]
}];

export default adminroutes
