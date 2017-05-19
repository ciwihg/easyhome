import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import adminhome from '@/components/adminhome'
import room from '@/components/room'
import roomadd from '@/components/roomadd'
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
          component: room,
          children:[
            {
              path: 'add',
              name: 'roomadd',
              component: roomadd
            }
          ]
        }
      ]
    }
  ]
})
