// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import myajax from './mylib/myajax'
import adminroutes from './mylib/adminmap'

Vue.config.productionTip = false

/* eslint-disable no-new */
var s=true;
console.log(adminroutes);
router.beforeEach((to,from,next)=>{
  var revice=new myajax();
revice.setcontroller('adminlogin').setmethod('check');
revice.grequestadmin((xhr)=>{
  var status=JSON.parse(revice.fix(xhr.responseText)).status;
  console.log(status);
  if(status=='ok'){
    (s==true)&&(router.addRoutes(adminroutes),s=false)
    next();
  }else{
    (s==true)?(next(),s=false):(next('/ciwi_admin'))
  }
}
);
});
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
