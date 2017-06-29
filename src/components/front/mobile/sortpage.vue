<template>
  <div >
    <mu-tabs :value="tabsvalue" @change="Ehvchange" v-if="another">
      <mu-tab value="1" title="全部"/>
      <mu-tab value="2" title="横潭大街32号"/>
      <mu-tab value="4" title="朝阳巷5号"/>
    </mu-tabs>
    <div class="wrap">
      <div class="outofroom" v-if="outofroom">暂时没有空房</div>
    <m-listshow :datas="cdatas">
    </m-listshow>
  </div>
  </div>
</template>

<script>
import mlistshow from "@/components/front/mobile/listshow";
export default{
  name:"sortpage",
  props:['srdatas'],
  data:function(){
    return {
      tabsvalue:'1',
      cdatas:[],
      address1data:[],
      address2data:[],
      alldatas:[],
      outofroom:false
    }
  },
  components:{
    'm-listshow':mlistshow
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
  computed:{
    all:function(){
      return parseInt(this.tabsvalue)&1;
    },
    address1:function(){
      return (parseInt(this.tabsvalue)>>1)&1;
    },
    address2:function(){
      return (parseInt(this.tabsvalue)>>2)&1;
    },
    another:function(){
    return  !(this.$route.params.type=='other')
    }
  },
  methods:{
    Ehvchange:function(v){
      this.tabsvalue=v;
      switch (v) {
        case "1":this.cdatas=this.alldatas;break;
        case "2":this.cdatas=this.address1data;break;
        case "4":this.cdatas=this.address2data;break;

      }
    },
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
.wrap{
  padding:0px 8px;
}
.outofroom{
  text-align: center;
  color:#7e57c2;
  margin-top: 20px;
  font-size: 20px;
}
</style>
