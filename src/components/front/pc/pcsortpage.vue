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
    this.tool=new this.mtool();
    this.$watch(function(){
      return this.$route.params.type;
    },function(n, o){
      this.outofroom=false;
      var revice=new this.myrevice();
      revice.setcontroller('Mhome').setmethod(this.$route.params.type);
      revice.grequestfront(this.CbSetcdatas);
    });
    this.$watch(function(){
      return this.sortpaddress;
    },function(n,o){
      var reg=/^[^tf]+/;
      switch(n.match(reg)[0]){
        case '横潭大街32号':this.cdatas=this.address1data;this.$emit("loadfinsh");break;
        case '朝阳巷5号':this.cdatas=this.address2data;this.$emit("loadfinsh");break;
        default:this.$emit("loadfinsh");break;
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
      if(this.cdatas.length==0){
          this.outofroom=true;
          this.address1data=[];
          this.address2data=[];
          this.$nextTick(function(){
            this.tool.setbodyheight();
            switch(this.$route.params.type){
              case "sr":this.$emit('roomtype',"一房一厅");break;
              case "s2r":this.$emit('roomtype',"二房一厅");break;
              case "r":this.$emit('roomtype',"单房");break;
              case "other":this.$emit('roomtype',"其他");break;
            }

            this.$emit("loadfinsh");
          });
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
            this.$nextTick(function(){
              this.tool.setbodyheight();
              switch(this.$route.params.type){
                case "sr":this.$emit('roomtype',"一房一厅");break;
                case "s2r":this.$emit('roomtype',"二房一厅");break;
                case "r":this.$emit('roomtype',"单房");break;
                case "other":this.$emit('roomtype',"其他");break;
              }
              this.$emit("loadfinsh");
            });

    }
  }
}
</script>

<style scoped>
</style>
