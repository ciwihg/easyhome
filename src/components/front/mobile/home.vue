<template>
  <div>
    <m-mslider :carouseldatas="carouseldatas"></m-mslider>
    <div class="nav_bar">
      <a class="nav_item" href="#/m/sortpage/s2r" style="background-color:rgb(237,59,59);">二房一厅</a>
      <a class="nav_item" href="#/m/sortpage/sr" style="background-color:rgb(239,108,0);">一房一厅</a>
      <a class="nav_item" href="#/m/sortpage/r" style="background-color:rgb(3,155,229);">单房</a>
      <a class="nav_item" href="#/m/sortpage/other" style="background-color:rgb(124,81,197); margin-right:0px;">其他</a>
    </div>
    <div class="row_wrap">
    <m-mgoodp :datas="srdatas" title="一房一厅" stitle="有要求 不将就"></m-mgoodp>
    </div>
    <div class="row_wrap">
    <m-mgoodp :datas="rdatas" title="单房" stitle="够用就好 节省是美"></m-mgoodp>
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
     carouseldatas:[],
     srdatas:[],
     rdatas:[]
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
      this.carouseldatas=respon.carousel;
      this.srdatas=respon.sr;
      this.rdatas=respon.r;
      this.$emit('srdatas',this.srdatas);
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
