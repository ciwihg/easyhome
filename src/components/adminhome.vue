<template>
<div>
<mu-drawer :open="navopen" :width="cc">
  <mu-appbar title="Easyhome">
  </mu-appbar>
  <mu-list :value="listvalue" @change="hchange">
       <mu-list-item :value="1" href="#/adminhome/datacenter" title="数据中心"/>
       <mu-list-item :value="2" href="#/adminhome/carousel" title="幻灯片"/>
       <mu-list-item :value="3" href="#/adminhome/room" title="租盘管理"/>
       <mu-list-item :value="4" href="#/adminhome/charge" title="费用管理"/>
       <mu-list-item :value="5" title="客户管理"/>
  </mu-list>
</mu-drawer>
<div style="margin-left:200px;">
  <mu-appbar title="Easyhome-Center">
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
      carouselinfos:{}
    }
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
</style>
