<template>
  <div>
    <m-mslider :carouseldatas="carouseldatas"></m-mslider>
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
  </div>
</template>

<script>
import mobileslider from '@/components/front/mobile/slider'
import mgoodp from '@/components/front/mobile/goodsrow'
export default{
  name:"mobilehome",
  data:function(){
    return {
     carouseldatas:[]
    }
  },
  components:{
    'm-mslider':mobileslider,
    'm-mgoodp':mgoodp
  },
  created:function(){
    var revice=new this.myrevice();
    revice.setcontroller("Mhome");
    revice.grequestfront(this.CbSetcarouseldatas);
  },
  methods:{
    CbSetcarouseldatas:function(xhr){
      var respon=JSON.parse(this.saedata(xhr.responseText));
      this.carouseldatas=respon;
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

.row_wrap{
  padding: 8px;
}
</style>
