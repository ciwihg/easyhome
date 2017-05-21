<template>
  <div class="roomaddwrap">

  <div>
    <span class="secondtitle">修改费用</span>
    <div class="head-button">
    <mu-raised-button  label="保存" type="submit" form="roomform" backgroundColor="blue" style="vertical-align:middle;"/>
    <mu-raised-button  label="取消" href="#/adminhome/charge" backgroundColor="rgb(180,180,180)"  style="vertical-align:middle;"/>
   </div>
  </div>
  <form id="roomform" :action="urlmix" method="POST">
  <mu-text-field label="费用" name="name" :value="chargeiteminfo.name" fullWidth="true" /></br>
  <mu-text-field label="价格" name="price" :value="chargeiteminfo.price" fullWidth="true" />
 </form>
</div>
</template>

<script>
export default{
  name:"roomedit",
  data:function(){
     return{
       chargeiteminfo:{},
       actionurl:"http://easyhome.applinzi.com/public/index.php/admin/chargecontroll/editsave/id/"
     }
  },
  computed:{
    urlmix:function(){
      return this.actionurl+this.$route.params.id;
    }
  },
  created: function() {
    this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/chargecontroll/edit/id/"+this.$route.params.id,this.get)
  },
  methods:{
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
      this.chargeiteminfo=respon;
      console.log(respon);
    }
  }
}
</script>

<style scoped>
.roomaddwrap{
  padding:0px 10px;
}
.secondtitle{
  display: inline-block;
  font-size: 18px;
  margin: 20px 0px;
}
.head-button{
  float:right;
  margin: 15px 10px;
}
</style>
