<template>
  <mu-paper class="demo-paper" :zDepth="2" >
    <mu-appbar title="Easyhome管理中心">

    </mu-appbar>
    <form class="content-wrap"  method="POST">
    <mu-text-field label="帐号" v-model="admin" labelFloat/><br/>
    <mu-text-field label="密码" v-model="password" type="password" labelFloat/><br/>
    <mu-raised-button label="登录"  @click="login" :fullWidth="true" secondary/>
  </form>
  </mu-paper>
</template>

<script>
export default{
  name:'adminlogin',
  data:function(){
    return {
     admin:'',
     password:''
    }
  },
  methods:{
    login:function(){
      var revice=new this.myrevice();
      revice.setcontroller('adminlogin');

      revice.prequestadmin(this.CbGetstatus,{
        admin:this.admin,
        password:this.password
      });
    },
    CbGetstatus:function(xhr){
      var msg=JSON.parse(this.saedata(xhr.responseText)).status;
      if(msg=='ok'){
       this.$router.push({name:'datacenter'});
      }else{
        alert(msg);
      }
    }
  }
}
</script>

<style scoped>
.demo-paper{
  width:300px;
  margin: 10px auto;
  text-align: center;
}
.content-wrap{
  padding: 0px 8px 10px 8px;
}
</style>
