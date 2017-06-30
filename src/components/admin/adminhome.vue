<template>
<div>
<mu-drawer :open="navopen" :width="cc" :docked='navdock' @close="navclose">
  <mu-appbar title="Easyhome">
  </mu-appbar>
  <mu-list :value="listvalue" @change="hchange">
       <mu-list-item :value="1" href="#/adminhome/datacenter" title="数据中心"/>
       <mu-list-item :value="2" href="#/adminhome/carousel" title="幻灯片"/>
       <mu-list-item :value="3" href="#/adminhome/room" title="租盘管理"/>
       <mu-list-item :value="4" href="#/adminhome/charge" title="费用管理"/>
       <mu-list-item :value="5" href="#/adminhome/customer" title="客户管理"/>
       <mu-list-item  @click="Ehexitlogin" title="退出系统"/>
  </mu-list>
</mu-drawer>
<div  class="framework" >
  <mu-appbar title="Easyhome-Center">
        <mu-icon-button icon="menu" @click="Ehopen" slot="left"/>
  </mu-appbar>

<router-view @start="hcstart" @toedit="ccc" :carouselinfos="carouselinfos">
</router-view>

</div>
</div>
</template>

<script>
export default {
  name: 'adminhome',
  data () {
    return {
      navopen:true,
      cc:"200",
      show:false,
      trigger:null,
      listvalue:1,
      carouselinfos:{},
      status:false,
      navdock:true
    }
  },
  created:function(){
    var that=this;
    (window.innerWidth>600)?(that.navopen=true,that.navdock=true):(that.navopen=false,that.navdock=false)
    window.onresize=function(){
      (window.innerWidth>600)?(that.navopen=true,that.navdock=true):(that.navopen=false,that.navdock=false)
    }
  },
  beforeMount:function(){

  },
  mounted () {
  this.trigger = this.$refs.addbtn;
},
methods:{
  hover:function(){
    this.show=true;
  },
  hovere:function(){
    this.show=false;
  },
  hchange:function(v){
    this.listvalue=v;
  },
  hcstart:function(v){
    this.listvalue=v;
  },
  ccc:function(d){
    this.carouselinfos=d;
  },
  CbExit:function(xhr){
    var status=JSON.parse(this.saedata(xhr.responseText)).status;
    if(status=="ok"){
      this.$router.push({name:'adminlogin'});
      this.$router.checkstatus=true;
    }
  },
  Ehexitlogin:function(){
    var revice=new this.myrevice();
    revice.setcontroller('adminlogin').setmethod('loginexit');
    revice.grequestadmin(this.CbExit);
  },
  Ehopen:function(){
    this.navopen=true;
  },
  navclose:function(){
    this.navopen=false;
  }
}
}
</script>


<style scoped>

.table_header>span{
  display: inline-block;
  font-size: 18px;
  margin-top:20px;
  margin-left: 10px;
}
.framework{
  margin-left:200px;
}
@media screen and (max-width:600px){
.framework{
  margin-left: 0px;
}
}

</style>
