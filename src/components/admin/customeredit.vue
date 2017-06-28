<template>
  <div>
    <div>
      <span class="secondtitle">修改客户资料</span>
      <div class="head-button">
      <mu-raised-button  label="保存" type="submit" form="customerform" backgroundColor="blue" style="vertical-align:middle;"/>
      <mu-raised-button  label="取消" href="#/adminhome/customer" backgroundColor="rgb(180,180,180)"  style="vertical-align:middle;"/>
     </div>
    </div>
    <form id="customerform"  style="padding:0px 8px;" action="http://easyhome.applinzi.com/public/index.php/admin/customercontroll/editsave" method="POST">
      <div>{{customerinfos[0].cid}}</div>
      <mu-text-field label="姓名" name="name" v-model="customerinfos[0].name" :fullWidth="true" /></br>
      <mu-text-field label="密码" name="password" v-model="customerinfos[0].password" :fullWidth="true" /></br>
      <mu-text-field label="身份证号码" name="idnum" v-model="customerinfos[0].idnum" :fullWidth="true" /></br>
      <mu-text-field label="联系电话" name="phone_number" v-model="customerinfos[0].phone_number" :fullWidth="true" /></br>
      <input name="userid" :value="customerinfos[0].cid" style="display:none"/>
    </form>
  </div>
</template>

<script>
export default{
  name:'customeredit',
  data:function(){
    return{
      customerinfos:[{}]
    }
  }
,
created:function(){
  var revice= new this.myrevice();
  revice.setcontroller('customercontroll').setmethod('getcustomer');

  revice.prequestadmin(this.CbSetuserinfos,{
    userid:this.$route.params.userid
  });
},
methods:{
 CbSetuserinfos:function(xhr){
   this.customerinfos=JSON.parse(this.saedata(xhr.responseText));
 }
}
}
</script>

<style scoped>
.secondtitle{
  display: inline-block;
  font-size: 18px;
  margin: 20px 8px;
}
.head-button{
  float:right;
  margin: 15px 10px;
}
</style>
