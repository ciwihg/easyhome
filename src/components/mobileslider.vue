<template>
  <div @touchstart="ts" @touchmove="tm" @touchend="te">
    <div class="item_wrap" ref="itemwrap">
    <div class="item">
      <a href="#">
        <img src="static/t1.jpg"/>
        <div class="mask"></div>
      </a>
    </div>

    <div class="item">
      <a href="#">
        <img src="static/t1.jpg"/>
        <div class="mask"></div>
      </a>
    </div>

    <div class="item">
      <a href="#">
        <img src="static/t2.jpg"/>
        <div class="mask"></div>
      </a>
    </div>
  </div>
  </div>
</template>

<script>
export default{
  name:"mobileslider",
  data:function(){
    return {
      tspos:0,
      tdistance:0,
      tactive:33
    }
  },
  methods:{
    ts:function(e){
      if(e.targetTouches.length==1){
        var touch=e.targetTouches[0];
        this.tspos=touch.pageX;
        this.tdistance=0;
        console.log(touch.pageX);
      }
    },
    tm:function(e){
      if(e.targetTouches.length==1){
        var touch=e.targetTouches[0];
        this.tdistance=this.tspos-touch.pageX;
        if(this.tactive==33&&this.tdistance<0){
        }
        else
        {this.$refs.itemwrap.style.left=this.tactive-this.tdistance+"px";}
      }
    },
    te:function(e){
      if(this.tdistance>0){
        (Math.abs(this.tdistance)>=100)?(this.$refs.itemwrap.style.left=this.tactive-346+'px',this.tactive=this.tactive-346):(this.$refs.itemwrap.style.left=this.tactive+'px')
      }
      else if(this.tdistance<0){
        (Math.abs(this.tdistance)>=100&&this.tactive!=33)?(this.$refs.itemwrap.style.left=this.tactive+346+'px',this.tactive=this.tactive+346):(this.$refs.itemwrap.style.left=this.tactive+'px')
      }
    }
  }
}
</script>

<style scoped>
.item_wrap{
  width:1000%;
  overflow: hidden;
  left:0px;
  position: relative;
  transition: left 400ms;
}
.item_wrap::after{
  content: "";
  display: block;
  clear: both;
}
.item{
  float:left;
   width:8%;
   margin-left: 0.2%;
   margin-right:0.2%;
}
.item img{
  width: 100%;
}
.item>a{
  display: inline-block;
  position: relative;
  width: 100%;
}
.mask{
   width:100%;
   height:100%;
   position:absolute;
   left:0px;
   top:0px;
}
</style>
