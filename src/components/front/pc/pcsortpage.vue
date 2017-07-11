<template>
  <div style="padding-left:150px;">
    <m-goodrow title="" subtitle="" :datas="cdatas"></m-goodrow>
  </div>
</template>

<script>
import goodp from '@/components/front/pc/goodp'
export default{
  name:"pcsortpage",
  components:{
    "m-goodrow":goodp
  },
  data:function(){
    return{
      cdatas:[],
      address1data:[],
      address2data:[],
      alldatas:[],
      outofroom:false
    }
  },
  created:function(){
    this.$watch(function(){
      return this.$route.params.type;
    },function(n, o){
      this.outofroom=false;
      var revice=new this.myrevice();
      revice.setcontroller('Mhome').setmethod(this.$route.params.type);
      revice.grequestfront(this.CbSetcdatas);
    })
    var revice=new this.myrevice();
    revice.setcontroller('Mhome').setmethod(this.$route.params.type);
    revice.grequestfront(this.CbSetcdatas);
  },
  methods:{
    CbSetcdatas:function(xhr){
      this.alldatas=JSON.parse(this.saedata(xhr.responseText));
      this.cdatas=this.alldatas;
      if(this.cdatas.length==0){
          this.outofroom=true;
          this.address1data=[];
          this.address2data=[];
          return;
        }
        this.address1data=[];
        this.address2data=[];
        var that=this;
        this.cdatas.forEach(function(element){
          switch(element.address){
            case '横潭大街32号':that.address1data.push(element);break;
            case '朝阳巷5号':that.address2data.push(element);break;
          }
        });

    }
  }
}
</script>

<style scoped>
</style>
