<template>
  <div style="padding:0px 50px;">
    <div v-if="outofroom" style="text-align:center; margin-top:50px; color:#d1c4e9; font-size:30px;">暂时没有空房</div>
    <m-goodrow title="" subtitle="" :datas="cdatas"></m-goodrow>
  </div>

</template>

<script>
import goodp from '@/components/front/pc/goodp'
export default{
  name:"pcsortpage",
  props:['sortpaddress'],
  components:{
    "m-goodrow":goodp
  },
  data:function(){
    return{
      cdatas:[],
      address1data:[],
      address2data:[],
      alldatas:[],
      outofroom:false,
      tool:{}
    }
  },
  created:function(){
    this.$store.commit('loading');
    this.tool=new this.mtool();
    this.$watch(function(){
      return this.$route.params.type;
    },function(n, o){
      this.$store.commit('loading');
      this.outofroom=false;
      var revice=new this.myrevice();
      revice.setcontroller('Mhome').setmethod(this.$route.params.type);
      revice.grequestfront(this.CbSetcdatas);
    });
    this.$watch(function(){
      return this.sortpaddress;
    },function(n,o){
      this.$store.commit('loading');
      var reg=/^[^tf]+/;
      var that=this;
      switch(n.match(reg)[0]){
        case '横潭大街32号':this.cdatas=this.address1data;setTimeout(function(){that.$store.commit('loaded');},500);break;
        case '朝阳巷5号':this.cdatas=this.address2data;setTimeout(function(){that.$store.commit('loaded');},500);break;
        default:setTimeout(function(){that.$store.commit('loaded');},500);break;
      }
    });
    var revice=new this.myrevice();
    revice.setcontroller('Mhome').setmethod(this.$route.params.type);
    revice.grequestfront(this.CbSetcdatas);

  },
  mounted:function(){

  },
  methods:{
    CbSetcdatas:function(xhr){
      this.alldatas=JSON.parse(this.saedata(xhr.responseText));
      this.cdatas=this.alldatas;
      this.address1data=[];
      this.address2data=[];
      if(this.cdatas.length==0){
       this.outofroom=true;
        }else{
          var that=this;
          this.cdatas.forEach(function(element){
            switch(element.address){
              case '横潭大街32号':that.address1data.push(element);break;
              case '朝阳巷5号':that.address2data.push(element);break;
            }
          });
        }
            var that=this;
            this.$nextTick(function(){
              this.tool.setbodyheight();
              switch(this.$route.params.type){
                case "sr":this.$store.commit('setactive',3);break;
                case "s2r":this.$store.commit('setactive',2);break;
                case "r":this.$store.commit('setactive',4);break;
                case "other":this.$store.commit('setactive',5);break;
              }
              setTimeout(function(){that.$store.commit('loaded');},500);
            });

    }
  }
}
</script>

<style scoped>
</style>
