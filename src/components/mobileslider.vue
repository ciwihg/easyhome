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
        <img src="static/t2.jpg"/>
        <div class="mask"></div>
      </a>
    </div>

    <div class="item">
      <a href="#">
        <img src="static/t3.jpg"/>
        <div class="mask"></div>
      </a>
    </div>

    <div class="item">
      <a href="#">
        <img src="static/t4.jpg"/>
        <div class="mask"></div>
      </a>
    </div>

    <div class="item">
      <a href="#">
        <img src="static/t5.jpg"/>
        <div class="mask"></div>
      </a>
    </div>

    <div class="item">
      <a href="#">
        <img src="static/t6.jpg"/>
        <div class="mask"></div>
      </a>
    </div>

    <div class="item">
      <a href="#">
        <img src="static/t7.jpg"/>
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
      tactive:1,
      offsets:0
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
        if(this.tactive==1&&this.tdistance<0){
          this.tdistance=0;
          return
        }
        if(this.tactive==7&&this.tdistance>0){
          this.tdistance=0;
          return
        }

        this.$refs.itemwrap.style.transform="translate3d("+(this.offsets-this.tdistance)+"px,0,0)";
      }
    },
    te:function(e){
      if(this.tdistance>0){
        var offset;
        if(this.tactive==1||this.tactive==6){
          offset=313;
        }
        else{
          offset=346;
        }

        (Math.abs(this.tdistance)>=100)?(this.$refs.itemwrap.style.transform="translate3d("+(this.offsets-offset)+"px,0,0)",this.offsets=this.offsets-offset,this.tactive++):(this.$refs.itemwrap.style.transform="translate3d("+this.offsets+"px,0,0)")
      }
      else if(this.tdistance<0){
        var offset;
        if(this.tactive==2||this.tactive==7){
          offset=313;
        }
        else{
          offset=346;
        }
        (Math.abs(this.tdistance)>=100)?(this.$refs.itemwrap.style.transform="translate3d("+(this.offsets+offset)+"px,0,0)",this.offsets=this.offsets+offset,this.tactive--):(this.$refs.itemwrap.style.transform="translate3d("+this.offsets+"px,0,0)")
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
  transition: transform 400ms;
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
   box-shadow: 0px 0px 15px rgba(0,0,0,0.2);
}
.item img{
  width: 100%;
  border-radius:5px;
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
