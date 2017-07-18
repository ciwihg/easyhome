// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import myajax from './mylib/myajax'
import adminroutes from './mylib/adminmap'

Vue.config.productionTip = false

/* eslint-disable no-new */
var loginstatus=false;
var s=true;
router.checkstatus=true;
router.beforeEach((to,from,next)=>{
  var reg=/\/adminhome/;
   if(to.path.search(reg)!=-1&&router.checkstatus){ //访问admin后台页面且未加载动态路由表
     var revice=new myajax();
     revice.setcontroller('adminlogin').setmethod('check');
     revice.grequestadmin((xhr)=>{
     var status=JSON.parse(revice.fix(xhr.responseText)).status;
     if(status=='ok'){      //验证成功
       (s)&&(router.addRoutes(adminroutes),s=false)
       router.checkstatus=false;
       next(to.path);
     }
     else{    //验证失败
     (to.path=='/ciwi_admin')?(next()):(next('/ciwi_admin'))
       }});
  }
  else{   //公共页面直接转跳
    next();
  }
});

router.beforeEach((to,from,next)=>{
  if(to.path=="/m/userroom"){
    var revice=new myajax();
    revice.setcontroller("user").setmethod("mvalidate");
    revice.grequestfront((xhr)=>{
    var status=JSON.parse(revice.fix(xhr.responseText)).name;
    if(status){
    if(status!=""){
      next();
    }
    else{
      next(false);
    }}});
}
else{
  next();
}});

router.beforeEach((to,from,next)=>{
  if(to.path=="/puserroom"){
    var revice=new myajax();
    revice.setcontroller("user").setmethod("mvalidate");
    revice.grequestfront((xhr)=>{
    var status=JSON.parse(revice.fix(xhr.responseText)).name;
    if(status){
    if(status!=""){
      next();
    }
    else{
      next(false);
    }}});
}
else{
  next();
}});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
