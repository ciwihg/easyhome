<template>
  <div class="content_wrap">
    <mu-drawer :open="open" :docked="docked"  @close="toggle">
     <mu-list :value="listv" @change="hchange">
       <mu-list-item :value="0" title="首页"/>
       <mu-list-item :value="1" title="二房一厅"/>
       <mu-list-item :value="2" title="一房一厅"/>
       <mu-list-item :value="3" title="单房"/>
       <mu-list-item :value="4" title="其他"/>
       <mu-divider />
       <mu-list-item :value="5" title="注册"/>
       <mu-list-item :value="6" title="登入"/>
       <mu-list-item :value="7" title="我租的房"/>
     </mu-list>
   </mu-drawer>
   <mu-appbar title="Easyhome">
   <mu-icon-button icon="menu" slot="left" @click="open=!open"/>
   </mu-appbar>
    <m-mslider :carouseldatas="homedatas"></m-mslider>
    <div class="nav_bar">
      <span class="nav_item" style="background-color:rgb(237,59,59);">二房一厅</span>
      <span class="nav_item" style="background-color:rgb(239,108,0);">一房一厅</span>
      <span class="nav_item" style="background-color:rgb(3,155,229);">单房</span>
      <span class="nav_item" style="background-color:rgb(124,81,197); margin-right:0px;">其他</span>
    </div>
    <div class="row_wrap">
    <m-mgoodp></m-mgoodp>
    </div>
    <div class="row_wrap">
    <m-mgoodp></m-mgoodp>
    </div>
    <div class="row_wrap">
    <m-mgoodp></m-mgoodp>
    </div>
    <div class="row_wrap">
    <m-mgoodp></m-mgoodp>
    </div>
    <div class="row_wrap">
    <m-mgoodp></m-mgoodp>
    </div>

   <mu-dialog :open="registration" title="注册">
  <form action="http://easyhome.applinzi.com/public/index.php/front/user/registration" ref='regisform' method="post" id="registration">
   <mu-text-field label="帐号" name="userid"  :errorText="useriderror" labelFloat @blur="textcheck"/><br/>
   <mu-text-field label="密码" name="password" :errorText="passworderror" labelFloat @blur="textcheck"/><br/>
     <img :src="captcha" />
   <mu-text-field name="captcha" hintText="验证码" :errorText="captchaerror" @blur="textcheck"/><br/>
 </form>
   <mu-flat-button slot="actions" type="submit" @click="rigischeck" form="registration" primary label="注册"/>
   <mu-flat-button slot="actions" primary @click="regisclose" label="取消"/>
  </mu-dialog>

  <mu-dialog :open="loginin" title="登入">
  <mu-text-field label="帐号" labelFloat/><br/>
  <mu-text-field label="密码" labelFloat/><br/>
  <mu-text-field hintText="验证码"/><br/>
  <mu-flat-button slot="actions" primary label="登入"/>
  <mu-flat-button slot="actions" primary @click="loginclose" label="取消"/>
 </mu-dialog>
  </div>
</template>

<script>
import mobileslider from '@/components/mobileslider'
import mgoodp from '@/components/mgoodp'
export default{
  name:"mobilehome",
  components:{
    "m-mslider":mobileslider,
    "m-mgoodp":mgoodp
  },
  data:function(){
    return {
      open:false,
      docked:false,
      homedatas:[],
      registration:false,
      loginin:false,
      listv:0,
      captcha:"",
      useriderror:'',
      passworderror:'',
      captchaerror:''
    }
  },
  created:function(){
    this.ajax("GET","http://easyhome.applinzi.com/public/index.php/front/Mhome",this.get);

  },
  methods:{
    toggle:function(){
      this.open=!this.open;
    },
    ajax:function(method,url,fun){
      var xhr=new XMLHttpRequest();
      var that=this;
      xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
          if(xhr.status==200){
            fun(xhr);
          }
          else{
            alert("ajax失败");
          }
        }
      };
      xhr.open(method,url,true);
      xhr.send(null);
    },
    get:function(xhr){
      var respon=JSON.parse(xhr.responseText.substring(0,xhr.responseText.indexOf("<")));
      this.homedatas=respon;
      console.log(respon);
    },
    getcaptcha:function(xhr){
      this.captcha="http://easyhome.applinzi.com/"+xhr.responseText.substring(0,xhr.responseText.indexOf("<"))+"?ver="+Math.random();
    },
    regisclose:function(){
      this.registration=false;
    },
    loginclose:function(){
      this.loginin=false;
    },
    hchange:function(v){
       this.listv=v;
       switch(v){
         case 5:this.registration=true;var m=new this.myrevice();
         m.setcontroller("user").setmethod("getcaptcha");
         m.grequestfront(this.getcaptcha);break;
         case 6:this.loginin=true;break;
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
        captcha:"请输入验证码"
      }
      var validate=new this.validate(msg);
      validate.requireout(e.target,this);
      (e.target.name=="userid")&&(validate.ajaxcheck(e.target,this,'ajaxvalidate'))
    },
    rigischeck:function(e){
        e.preventDefault();
      var msg={
        userid:"请输入帐号",
        password:"请输入密码",
        captcha:"请输入验证码"
      }
      var validate=new this.validate(msg);
      var that=this;
      var inputs=this.$refs.regisform.getElementsByTagName("INPUT");
      inputs=Array.prototype.slice.call(inputs);
      inputs.forEach(function(input){
        validate.requireout(input,that);
      });

    }
    }
}
</script>

<style scoped>
.nav_item{
  display: inline-block;
  width:20%;
  border-radius: 20px;
  color: white;
  line-height: 2;
  float: left;
  margin-right: 6.6%;
}
.nav_bar{
text-align: center;
margin: 0px 8px;
}
.nav_bar::after{
  content: "";
  display: block;
  clear: both;
}
.content_wrap{
  background-color: rgb(243,243,243);
}
.row_wrap{
  padding: 8px;
}
</style>
