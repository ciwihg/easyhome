<template>
  <div class="content_wrap">
    <mu-drawer :open="open" :docked="docked"  @close="toggle">
      <div style="position:relative;" v-if="usercard">
        <img src="static/userbg.jpg" style="width:100%; vertical-align:top;"/>
        <div class="user-head" >
          <span style="vertical-align:middle; color:white; font-size:20px; line-height:0;">{{username.substring(0,1).toUpperCase()}}</span>
        </div>
         <div  class="user-name">{{username}}</div>
      </div>
     <mu-list :value="listv" @change="hchange">
       <mu-list-item :value="0" href="#/m/home" title="首页"/>
       <mu-list-item :value="1" href="#/m/sortpage/s2r" title="二房一厅"/>
       <mu-list-item :value="2" href="#/m/sortpage/sr" title="一房一厅"/>
       <mu-list-item :value="3" href="#/m/sortpage/r" title="单房"/>
       <mu-list-item :value="4" href="#/m/sortpage/other" title="其他"/>
       <mu-divider />
       <mu-list-item :value="5" title="注册"/>
       <mu-list-item :value="6" :title="varloginexit"/>
       <mu-list-item :value="7" href="#/m/userroom" title="我租的房"/>
     </mu-list>
   </mu-drawer>
   <mu-appbar title="Easyhome">
   <mu-icon-button icon="menu" slot="left" @click="open=!open"/>
   </mu-appbar>
    <router-view :loginstatus="usercard" @invali="Ehinvalid">
    </router-view>

   <mu-dialog :open="registration" title="注册">
  <form ref='regisform'>
   <mu-text-field label="帐号" name="userid" v-model="userid" :errorText="useriderror" labelFloat @blur="textcheck"/><br/>
   <mu-text-field label="密码" name="password" type="password" v-model="password" :errorText="passworderror" labelFloat @blur="textcheck"/><br/>
     <img :src="captcha" />
   <mu-text-field name="captcha" hintText="验证码" v-model="captchav" :errorText="captchaerror" @blur="textcheck"/><br/>
   <mu-text-field label="注册码" name="code" v-model="code" :errorText="codeerror" labelFloat @blur="textcheck"/><br/>
 </form>
   <mu-flat-button slot="actions"  @click="rigisconfirm"  primary label="注册" :disabled="regisbtn"/>
   <mu-flat-button slot="actions" primary @click="regisclose" label="取消"/>
  </mu-dialog>

  <mu-dialog :open="loginin" title="登入">
  <form ref='loginform'>
  <mu-text-field label="帐号" name="userid" v-model="userid" :errorText="useriderror" @blur="logincheck"labelFloat/><br/>
  <mu-text-field label="密码" type="password" name="password" v-model="password" :errorText="passworderror" @blur="logincheck"labelFloat/><br/>
   <img :src="captcha" />
  <mu-text-field hintText="验证码" name="captcha" v-model="captchav" :errorText="captchaerror" @blur="logincheck"/><br/>
  </form>
  <mu-flat-button slot="actions" primary label="登入" @click="loginconfirm" :disabled="loginbtn"/>
  <mu-flat-button slot="actions" primary @click="loginclose" label="取消"/>
 </mu-dialog>

 <mu-popup position="bottom" :open="bottompop">
   <mu-appbar title="提示">
     <mu-flat-button slot="right" label="关闭" color="white" @click="closepop"/>
   </mu-appbar>
   <mu-content-block style="text-align:center;width:300px;">
    {{responsemsg}}
  </mu-content-block>
  </mu-popup>

  </div>
</template>

<script>
export default{
  name:"mobilehome",
  data:function(){
    return {
      open:false,
      docked:false,
      registration:false,
      loginin:false,
      listv:0,
      captcha:"",
      useriderror:'',
      passworderror:'',
      captchaerror:'',
      codeerror:'',
      userid:'',
      password:'',
      captchav:'',
      code:'',
      bottompop:false,
      responsemsg:"",
      username:'',
      usercard:false,
      srdatas:[]
    }
  },
  computed:{
    regisbtn:function(){
      return !(((this.useriderror=="")&&(this.passworderror=="")&&(this.captchaerror=="")&&(this.codeerror==""))&&((this.userid!="")&&(this.password!="")&&(this.captchav!="")&&(this.code!="")));
    },
    loginbtn:function(){
        return !(((this.useriderror=="")&&(this.passworderror=="")&&(this.captchaerror==""))&&((this.userid!="")&&(this.password!="")&&(this.captchav!="")));
    },
    varloginexit:function(){
      if(this.usercard)
      {return "退出登录";}
      else{
        return "登录";
      }
    }
  },
  created:function(){
    setTimeout(console.log(this.$router),2000);
    if(!this.usercard){
      var revice= new this.myrevice();
      revice.setcontroller("user").setmethod("mvalidate");
      revice.grequestfront(this.CbSetloginstatus);
    }
  },
  methods:{
    toggle:function(){
      this.open=!this.open;
    },
    resetregis:function(){
      this.useriderror="";
      this.passworderror="";
      this.captchaerror="";
      this.password="";
      this.userid="";
      this.captchav="";
    },
    Cbcaptcha:function(xhr){
      this.captcha="http://easyhome.applinzi.com/"+xhr.responseText.substring(0,xhr.responseText.indexOf("<"));
    },
    regisclose:function(){
      this.resetregis();
      this.registration=false;
    },
    loginclose:function(){
      this.resetregis();
      this.loginin=false;
    },
    getcaptcha:function(){
      var m=new this.myrevice();
      m.setcontroller("user").setmethod("getcaptcha");
      m.grequestfront(this.Cbcaptcha);
    },
    hchange:function(v){
       this.listv=v;
       switch(v){
         case 5:this.registration=true;this.getcaptcha();break;
         case 6:if(!this.usercard){
                 this.loginin=true;
                 this.getcaptcha();}
                 else{
                   var revice=new this.myrevice();
                   revice.setcontroller("user").setmethod("exitlogin");
                   revice.grequestfront(this.CbExit);
                 }
         break;
       }
    },
    Cbregis:function(xhr){
        this.responsemsg="";
        var msg=JSON.parse(this.saedata(xhr.responseText));
        if(msg.status=='ok'){
          var that=this;
          that.regisclose();
          var second=5;
          var num=setInterval(function(){
            second--
            that.responsemsg="注册成功,"+second+"秒后返回";
            (second==0)&&(clearInterval(num),that.closepop(),that.usercard=true,that.username=msg.name);
          },1000);
        }else{
          this.responsemsg=msg.status;
        }

      this.bottompop=true;
    },
    Cblogin:function(xhr){
      this.responsemsg="";
      var msg=JSON.parse(this.saedata(xhr.responseText));
      if(msg.status=='ok'){
        this.loginclose();
        this.closepop();
        this.usercard=true;
        this.username=msg.name;
      }
      else{
        this.responsemsg=msg.status;
        this.bottompop=true;
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
    closepop:function(){
      this.bottompop=false;
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
    CbSetloginstatus:function(xhr){
      var status=JSON.parse(this.saedata(xhr.responseText)).name;
      console.log(status);
      if(status){
      if(status!=""){
        this.usercard=true;
        this.username=status;
      }
    }
    },
    CbExit:function(xhr){
      var status=JSON.parse(this.saedata(xhr.responseText)).status;
      if(status=="ok"){
        this.usercard=false;
        this.username="";
      }
    },
    Ehinvalid:function(msg,v){
      console.log(v);
      this.listv=parseInt(v);
      this.responsemsg=msg;
      this.bottompop=true;
    }
    }
}
</script>

<style scoped>
.popup-bottom{
  width:100%;
}
.user-head{
  width:15%;
  height:30%;
  border-radius:50%;
  background-color:rgb(3,155,229);
  position:absolute;
  text-align:center;
  top:35%;
  left:7%;

}
.user-head::before{
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.user-name{
  position:absolute;
  left:0;
  bottom:0;
  color:white;
  left:7%;
  margin-bottom: 2.5%;
  font-size: 16px;
}
.content_wrap{
  background-color: rgb(243,243,243);
  min-height: 800px;
}
</style>
