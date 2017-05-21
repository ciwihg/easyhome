<template>
  <div class="roomaddwrap">

  <div>
    <span class="secondtitle">修改租盘</span>
    <div class="head-button">
    <mu-raised-button  label="保存" type="submit" form="roomform" backgroundColor="blue" style="vertical-align:middle;"/>
    <mu-raised-button  label="取消" href="#/adminhome/room" backgroundColor="rgb(180,180,180)"  style="vertical-align:middle;"/>
   </div>
  </div>

  <form id="roomform" :action="urlmix" method="POST">

    <mu-text-field label="房号" name="number" :value="roominfo.number" fullWidth="true" /></br>
    <mu-text-field label="地址" name="address" :value="roominfo.address" fullWidth="true" /></br>
    <mu-text-field label="租金" name="price" :value="roominfo.price" fullWidth="true" /></br>
    <mu-text-field label="户型" name="type" :value="roominfo.type" fullWidth="true" /></br>
    <mu-text-field label="按金" name="sub_price" :value="roominfo.sub_price" fullWidth="true" />

 </form>
</div>
</template>

<script>
export default{
  name:"roomedit",
  data:function(){
     return{
       roominfo:{},
       actionurl:"http://easyhome.applinzi.com/public/index.php/admin/roomcontroll/editsave/rid/",
     }
  },
  computed:{
    urlmix:function(){
      return this.actionurl+this.$route.params.rid;
    }
  },
  created: function() {
    this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/roomcontroll/edit/rid/"+this.$route.params.rid,this.get)
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
      this.roominfo=respon;
      console.log(respon);
    },
    htabschage:function(v){
      this.activeTab=v;
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
