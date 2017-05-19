<template>
<div>
<mu-drawer :open="navopen" :width="cc">
  <mu-appbar title="Easyhome">
  </mu-appbar>
  <mu-list>
       <mu-list-item title="数据中心"/>
       <mu-list-item title="租盘管理"/>
       <mu-list-item title="费用管理"/>
       <mu-list-item title="客户管理"/>
  </mu-list>
</mu-drawer>
<div style="margin-left:200px;">
  <mu-appbar title="Easyhome-Center">
  </mu-appbar>
  
<router-view>
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
      trigger:null
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
