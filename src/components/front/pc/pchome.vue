<template>

    <div>

      <m-slider :datas="carouseldatas"  class="banner"></m-slider>
     <div style="background-color:rgb(238,238,238); padding-left:43px; padding-top:60px; ">
       <m-goodrow title="一房一厅" subtitle="有要求 不将就" :datas="srdatas"></m-goodrow>
       <m-goodrow style="margin-top:38px;" title="单房" subtitle="够用就好 节省是美" :datas="rdatas"></m-goodrow>
   </div>
   </div>

</template>

<script>
import slidbanner from '@/components/front/pc/slidbanner'
import goodp from '@/components/front/pc/goodp'
export default{
  name:'pchome',
  components:{
    "m-slider":slidbanner,
    "m-goodrow":goodp
  },
  data:function(){
    return {
      srdatas:[],
      rdatas:[],
      carouseldatas:[]
    }
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
    }
  }
}
</script>

<style scoped>
</style>
