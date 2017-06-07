<template>
  <div class="content_wrap">
    <m-mslider></m-mslider>
    <div class="nav_bar">
      <span class="nav_item" style="background-color:rgb(237,59,59);">影视</span>
      <span class="nav_item" style="background-color:rgb(239,108,0);">音乐</span>
      <span class="nav_item" style="background-color:rgb(3,155,229);">图书</span>
      <span class="nav_item" style="background-color:rgb(124,81,197); margin-right:0px;">报亭</span>
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
