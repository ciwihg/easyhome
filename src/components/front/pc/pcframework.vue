<template>
<div>
<div class="header">
    <span class="logotext">EasyHome</span>
    <form class="searchbox">
    <div style="height:100%">
    <input class="search_text" type="text"/><button type="submit" value="" class="search_btn"></button>
    </div>
    </form>
    <div  class="header_right"style="display:inline-block; float:right; height:100%;">
    <div class="loginbtn" @click="openlogin" v-if="!userstatus">
      登录
    </div>
    <div class="usercol" v-if="userstatus" @click="clickonuser">
      <span class="userhead" ref="usercard">{{username.substring(0,1).toUpperCase()}}</span>
      <div v-show="usercardon">
      <div class="uparrow" ></div>
      <div class="uparrowcopy" ></div>
      <div class="userinfo" >
        <div style="padding:10px 10px;" >{{username}}</div>
        <div class="userinfo-item" >我租的房</div>
        <div class="infobottom-row" ><mu-flat-button primary label="退出" @click="exitlogin" style="float:right;"/></div>

      </div>
    </div>
    </div>
   </div>
 </div>
<div style="background-color:rgb(238,238,238); position:relative;">
<div :class="{'navfixed':navfix}" style="z-index:3; position:absolute;">
    <m-navbar  style="vertical-align:top;" :datas="navdatas"></m-navbar>
</div>
<div style="margin-left:200px; position:relative;">
  <div :class="{'pagenavbar':pnav,'pnavfixed':!pnav}"></div>

   <router-view></router-view>
</div>
<div class="loadingmask">
  <div class="circular-wrap" style="position:fixed; left:50%; display:inline-block; top:0; bottom:0;">
   <mu-circular-progress :size="60" :strokeWidth="5" style="margin-left:-50%; width:100%; vertical-align:middle;"/>
 </div>
</div>
</div>
<div class="whitemask" v-if="maskon">
  <div style="position:relative; display:inline-block; width:25%; vertical-align:middle; height:100%;   min-width: 320px;">
  <transition name="fadeleft">
  <div class="login-fwrap" v-if="loginon">
  <mu-paper class="loginwrap" >
    <div class="login-head">Easyhome</div>
    <div class="loginfo-wrap" ref='loginform'>
      <mu-text-field label="帐号" name="userid" v-model="userid" :errorText="useriderror" @blur="logincheck"labelFloat/><br/>
      <mu-text-field label="密码" type="password" name="password" v-model="password" :errorText="passworderror" @blur="logincheck"labelFloat/><br/>
       <img :src="captcha" /></br>
      <mu-text-field hintText="验证码" name="captcha" v-model="captchav" :errorText="captchaerror" @blur="logincheck"/><br/>
    <a class="regisbtn" href="javascrip:;" @click="openregis">注册</a>
  </div></br>
    <mu-flat-button primary label="登录" @click="loginconfirm" :disabled="loginbtn"/>
    <mu-flat-button primary label="取消" @click="closemask"/>
  </mu-paper>
 </div>
</transition>

 <transition name="faderight" mode="in-out">
   <div class="login-fwrap" v-if="regison">
  <mu-paper class="loginwrap">
    <div class="login-head">创建Easyhome帐号</div>
    <div class="loginfo-wrap" ref="regisform">
    <mu-text-field label="帐号" name="userid" v-model="userid" :errorText="useriderror" labelFloat @blur="textcheck"/><br/>
    <mu-text-field label="密码" name="password" type="password" v-model="password" :errorText="passworderror" labelFloat @blur="textcheck"/><br/>
    <img :src="captcha" /><br/>
    <mu-text-field hintText="验证码" name="captcha" v-model="captchav" :errorText="captchaerror" @blur="textcheck"/><br/>
    <mu-text-field label="注册码" name="code" v-model="code" :errorText="codeerror" labelFloat @blur="textcheck"/><br/>
    <a class="regisbtn" href="javascrip:;" @click="reopenlogin">登录</a>
  </div></br>
    <mu-flat-button primary label="注册" :disabled="regisbtn" @click="rigisconfirm"/>
    <mu-flat-button primary label="取消" @click="closemask"/>
  </mu-paper>
  </div>
  </transition>
</div>



</div>
<mu-popup position="bottom" :open="bottompop" style="width:25%;" popupClass="pcpopup">
  <mu-appbar title="提示">
    <mu-flat-button slot="right" label="关闭" color="white" @click="closepop"/>
  </mu-appbar>
  <mu-content-block >
   {{responsemsg}}
 </mu-content-block>
 </mu-popup>


</div>
</template>

<script>
import slidbanner from '@/components/front/pc/slidbanner'
import stacknavbar from '@/components/front/pc/stacknavbar'
import goodp from '@/components/front/pc/goodp'
export default{
  name:"slider",
  components:{
    "m-slider":slidbanner,
    "m-navbar":stacknavbar,
    "m-goodrow":goodp

  },
  data:function(){
    return {
      pnav:true,
      navfix:false,
      maskon:false,
      captcha:'',
      loginon:true,
      regison:false,
      userid:'',
      password:'',
      captchav:'',
      useriderror:'',
      passworderror:'',
      captchaerror:'',
      responsemsg:'',
      bottompop:false,
      username:'',
      userstatus:false,
      usercardon:false,
      codeerror:'',
      code:'',
  navdatas:[
    {content:"首页",
     color:"rgb(68,68,68)",
     link:"#/",
     submenu:[
     ]
    },
    {content:"二房一厅",
     color:"rgb(104,159,56)",
     link:"#/sortpage/s2r",
     submenu:[
       {content:"横潭大街32号",
       link:""},
       {content:"朝阳巷5号",
       link:""}
     ]
    },
    {content:"一房一厅",
     color:"rgb(239,108,0)",
     link:"#/sortpage/sr",
     submenu:[
       {content:"横潭大街32号",
       link:""},
       {content:"朝阳巷5号",
       link:""}
     ]
    },

    {content:"单房",
     color:"rgb(3,155,229)",
     link:"#/sortpage/r",
     submenu:[
       {content:"横潭大街32号",
       link:""},
       {content:"朝阳巷5号",
       link:""}
     ]
    },
    {content:"其他",
     color:"rgb(83,109,254)",
     link:"#/sortpage/other",
     submenu:[
       {content:"横潭大街32号",
       link:""},
       {content:"朝阳巷5号",
       link:""},
       {content:"横潭市场",
       link:""}
     ]
    }
  ]

    }
  },
  computed:{
    regisbtn:function(){
      return !(((this.useriderror=="")&&(this.passworderror=="")&&(this.captchaerror=="")&&(this.codeerror==""))&&((this.userid!="")&&(this.password!="")&&(this.captchav!="")&&(this.code!="")));
    },
    loginbtn:function(){
        return !(((this.useriderror=="")&&(this.passworderror=="")&&(this.captchaerror==""))&&((this.userid!="")&&(this.password!="")&&(this.captchav!="")));
    }
  },
  created: function created() {
    var reg=/Mobile/;
    var device=navigator.userAgent;
    if(device.search(reg)!=-1){
      this.$router.push({name:'mhome'});
    }else{
      var that=this;
      document.addEventListener("scroll",function(){
        (document.body.scrollTop>=60)?(that.navfix=true,that.pnav=false):(that.navfix=false,that.pnav=true)
    });
    if(!this.userstatus){
      var revice= new this.myrevice();
      revice.setcontroller("user").setmethod("mvalidate");
      revice.grequestfront(this.CbSetloginstatus);
    }
    }
  },
  mounted:function(){

  },
  methods:{
     openlogin:function(){
       this.maskon=true;
       document.body.style.overflow='hidden';
       document.all[0].style.overflow='hidden';
       this.getcaptcha();
     },
     addexitclick:function(){
       var that=this;
       document.addEventListener("click",function(e){

           that.usercardon=false;


       });
     },
     CbSetloginstatus:function(xhr){
       var status=JSON.parse(this.saedata(xhr.responseText)).name;
       if(status){
       if(status!=""){
         this.userstatus=true;
         this.username=status;
         this.addexitclick();
       }
     }
    },
     getcaptcha:function(){
       var m=new this.myrevice();
       m.setcontroller("user").setmethod("getcaptcha");
       m.grequestfront(this.Cbcaptcha);
     },
     Cbcaptcha:function(xhr){
       this.captcha="http://easyhome.applinzi.com/"+xhr.responseText.substring(0,xhr.responseText.indexOf("<"));
     },
     openregis:function(){
       this.loginon=false;
       this.regison=true;
     },
     reopenlogin:function(){
       this.loginon=true;
       this.regison=false;
     },
     closemask:function(){
       this.maskon=false;
       document.body.style.overflow='auto';
       document.all[0].style.overflow='auto';
     },
     logincheck:function(e){
       var msg={
         userid:"请输入帐号",
         password:"请输入密码",
         captcha:"请输入验证码"
       }
       var validate=new this.validate(msg);
       validate.requireout(e.target,this);
     },
     loginconfirm:function(){
       var inputs=this.$refs.loginform.getElementsByTagName("INPUT");
         var revice=new this.myrevice();
         revice.setcontroller("user").setmethod("login");
         var data={
           userid:inputs[0].value,
           password:inputs[1].value,
           captcha:inputs[2].value
         };
         revice.prequestfront(this.Cblogin,data);

     },
     Cblogin:function(xhr){
       this.responsemsg="";
       var msg=JSON.parse(this.saedata(xhr.responseText));
       if(msg.status=='ok'){
         this.closemask();
         this.userstatus=true;
         this.addexitclick();
         this.username=msg.name;
       }
       else{
         this.responsemsg=msg.status;
         this.bottompop=true;
       }

     },
     closepop:function(){
       this.bottompop=false;
     },
     clickonuser:function(e){
        e.stopPropagation();
       if(e.target===this.$refs.usercard){

         this.usercardon=!this.usercardon;

       }
     },
     exitlogin:function(){
       var revice=new this.myrevice();
       revice.setcontroller("user").setmethod("exitlogin");
       revice.grequestfront(this.CbExit);
     },
     CbExit:function(xhr){
       var status=JSON.parse(this.saedata(xhr.responseText)).status;
       if(status=="ok"){
         this.userstatus=false;
         this.username="";
       }
     },
     ajaxvalidate:function(xhr,name){
        var status=JSON.parse(xhr.responseText.substring(0,xhr.responseText.indexOf("<")));
        (status.status=="ok")?( this[name+'error']=""):( this[name+'error']=status.status)
     },
     textcheck:function(e){
       var msg={
         userid:"请输入帐号",
         password:"请输入密码",
         captcha:"请输入验证码",
         code:"请输入注册码"
       }
       var validate=new this.validate(msg);
       validate.requireout(e.target,this);
       (e.target.name=="userid")&&(validate.ajaxcheck(e.target,this,'ajaxvalidate'))
     },
     rigisconfirm:function(e){
       var inputs=this.$refs.regisform.getElementsByTagName("INPUT");
         var revice=new this.myrevice();
         revice.setcontroller("user").setmethod("registration");
         var data={
           userid:inputs[0].value,
           password:inputs[1].value,
           captcha:inputs[2].value,
           code:inputs[3].value
         };
         revice.prequestfront(this.Cbregis,data);

     },
     Cbregis:function(xhr){
         this.responsemsg="";
         var msg=JSON.parse(this.saedata(xhr.responseText));
         if(msg.status=='ok'){
           var that=this;
           that.regison=false;
           var second=5;
           var num=setInterval(function(){
             second--
             that.responsemsg="注册成功,"+second+"秒后返回";
             (second==0)&&(clearInterval(num),that.closepop(),that.closemask(),that.userstatus=true,that.username=msg.name);
           },1000);
         }else{
           this.responsemsg=msg.status;
         }

       this.bottompop=true;
     }
  }
}
</script>
<style>
.pcpopup{
  width:30%;
}
</style>
<style scoped>
.header{
  width:100%;
  height:60px;
  background-color: rgb(238,238,238);
}
.header::before{
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.logotext{
  font-size: 27px;
  margin-left: 10px;
  color:rgb(111,111,111);
  vertical-align: middle;
}
.searchbox{
  display: inline-block;
  vertical-align: middle;
  margin-left: 40px;
}
.search_text{
  height:30px;
  vertical-align: middle;
  width:590px;
  border:1px solid rgb(205,205,205);
}
.search_text:focus{
  outline:none;
  border: #7c4dff solid 1px;
}
.search_btn{
  height:30px;
  width:60px;
  vertical-align: middle;
  border: none;
  background-color: #7c4dff;
}
.more{
    display: inline-block;
    width:16px;
    height:16px;
    background-color: rgb(109,109,109);
    vertical-align: middle;
    margin-right: 30px;
}
.loginbtn{
  display: inline-block;
  width:55px;
  height:32px;
  border-radius: 2px;
  background-color: #2196f3;
  color:white;
  vertical-align: middle;
  text-align: center;
  line-height: 32px;
  margin-right: 30px;
  cursor: pointer;
}
.header_right::before{
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.nb_wrap{
  position: relative;
  padding-top: 50px;
  background-color: rgb(238,238,238);
}
.navbar{
  position: absolute !important;
  left: 0px;
  top:0px;
}

.navfixed{
  position: fixed !important;
  left:0px;
  top:0px;

}
.pnavfixed{
  position: fixed;
  top:0px;
  height: 50px;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0,0,0,.2);
  width: 100%;
  z-index: 2;
}
.pagenavbar{
  height: 50px;
  background-color: white;
}
.hiddenbar{
  height: 0px;
}
.shiddenbar{
  height: 300px;
}
.whitemask{
  position: fixed;
  left: 0;
  right:0;
  top:0;
  bottom:0;
  z-index: 1;
  background-color: rgb(238,238,238);
  text-align: center;
}
.whitemask::before{
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.loginwrap{
  width:100%;
  display: inline-block;
  vertical-align: middle;
  padding-bottom: 10px;
}
.login-head{
  height:50px;
  background-color: #7c4dff;
  color:white;
  text-align:left;
  line-height: 50px;
  padding-left: 20px;
}
.regisbtn:hover{
  text-decoration: underline;
}
.loginfo-wrap{
  text-align:left;
  display:inline-block;
  margin-bottom: 10px;
}
.fadeleft-enter-active{
  transition: all .5s;
  transform: translate3d(0%,0,0);
  opacity: 1;
}
.fadeleft-leave-active {
  transition: all .5s;
  opacity: 0;
  transform: translate3d(-100%,0,0);
}
.fadeleft-enter{
  opacity: 0;
  transform: translate3d(-100%,0,0);
}
.fadeleft-leave{
  opacity: 1;
  transform: translate3d(0,0,0);
}

.faderight-enter-active{
  transition: all .5s;
  transform: translate3d(0%,0,0);
  opacity: 1;
}
.faderight-leave-active {
  transition: all .5s;
  opacity: 0;
  transform: translate3d(100%,0,0);
}
.faderight-enter{
  opacity: 0;
  transform: translate3d(100%,0,0);
}
.faderight-leave{
  opacity: 1;
  transform: translate3d(0,0,0);
}
.login-fwrap{
  position: absolute;
  height: 100%;
  width:100%;
  left: 0px;
  top:0px;
}
.login-fwrap::before{
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.usercol{
  display: inline-block;
  width:32px;
  height:32px;
  margin-right: 32px;
  position: relative;
}
.userhead{
  display: inline-block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #7c4dff;
  color:white;
  vertical-align: middle;
  text-align: center;
  line-height: 32px;
  cursor: pointer;
  padding: 0;
}
.uparrow{
 position: absolute;
  width: 0px;
  height: 0px;
  display: inline-block;
  border-top:  0px black;
  border-right: dashed 8.5px transparent;
    border-left: dashed 8.5px transparent;
    border-bottom: solid 8.5px rgba(0,0,0,.2);
    left: 7.5px;
    top:35px;
}
.uparrowcopy{
 position: absolute;
  width: 0px;
  height: 0px;
  display: inline-block;
  border-top:  0px black;
  border-right: dashed 8.5px transparent;
    border-left: dashed 8.5px transparent;
    border-bottom: solid 8.5px white;
      left: 7.5px;
      top:36px;
      z-index:3;
}
.userinfo{
  width:300px;
  position: absolute;
  top:43.5px;
  border: 1px solid rgba(0,0,0,.2);
  left: -250px;
  z-index: 2;
  background-color: white;
  padding-bottom: 5px;
}
.userinfo-item{
  padding: 10px 20px;
  font-size: 16px;
  color:#ce93d8;
  cursor: pointer;
}
.userinfo-item:hover{
  background-color: rgb(245,245,245);
}
.infobottom-row{
  width: 100%;
  padding: 5px 10px;
  border-top: 1px solid rgba(0,0,0,.1);
}
.loadingmask{
  position: absolute;
  left: 0px;
  right:0px;
  top:0px;
  bottom:0px;
  z-index: 2;
  background-color: rgba(255,255,255,.8);
}
.circular-wrap::before{
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
</style>
