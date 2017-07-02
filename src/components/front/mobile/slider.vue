<template>
  <div @touchstart="ts" @touchmove="tm" @touchend="te">
    <div class="item_wrap" ref="itemwrap">

    <div class="item" v-for="(item,index) in carouseldatas">
      <a :href="item.link">
        <img :src="item.src"/>
        <span class="pagetip">{{index+1}}/{{carouseldatas.length}}</span>
        <div class="mask">
          <div>
          <div class="title">{{item.title}}</div>
          <div class="stitle">{{item.stitle}}</div>
          </div>
        </div>
      </a>
    </div>

  </div>
  </div>
</template>

<script>
export default{
  name:"mobileslider",
  props:["carouseldatas"],
  data:function(){
    return {
      tspos:0,
      tsypos:0,
      tdistance:0,
      tydistance:0,
      tactive:1,
      offsets:0,
      ymove:false,
      judge:false
    }
  },
  methods:{
    ts:function(e){
      if(e.targetTouches.length==1){
        var touch=e.targetTouches[0];
        this.tspos=touch.pageX;
        this.tsypos=touch.pageY;
        this.tdistance=0;

      }
    },
    tm:function(e){
      if(e.targetTouches.length==1){
        var touch=e.targetTouches[0];
        this.tdistance=this.tspos-touch.pageX;
        if(!this.judge){
        this.tydistance=this.tsypos-touch.pageY;
        if(Math.abs(this.tydistance)>=Math.abs(this.tdistance)){
          this.ymove=true;
          }else{
          this.ymove=false;
          }
        this.judge=true;
        }
        if(this.ymove){
          this.tdistance=0;
          return;
        }
        e.preventDefault();
        if(this.tactive==1&&this.tdistance<0){
          this.tdistance=0;
          return
        }
        if(this.tactive==this.carouseldatas.length&&this.tdistance>0){
          this.tdistance=0;
          return
        }

        this.$refs.itemwrap.style.transform="translate3d("+(this.offsets-this.tdistance)+"px,0,0)";
      }
    },
    te:function(e){
      this.judge=false;
      if(this.tdistance>0){
        var offset;
        if(this.tactive==1||this.tactive==this.carouseldatas.length-1){
          offset=window.innerWidth*0.76;
        }
        else{
          offset=window.innerWidth*0.84;
        }

        (Math.abs(this.tdistance)>=50)?(this.$refs.itemwrap.style.transform="translate3d("+(this.offsets-offset)+"px,0,0)",this.offsets=this.offsets-offset,this.tactive++):(this.$refs.itemwrap.style.transform="translate3d("+this.offsets+"px,0,0)")
      }
      else if(this.tdistance<0){
        var offset;
        if(this.tactive==2||this.tactive==this.carouseldatas.length){
          offset=window.innerWidth*0.76;
        }
        else{
          offset=window.innerWidth*0.84;
        }
        (Math.abs(this.tdistance)>=50)?(this.$refs.itemwrap.style.transform="translate3d("+(this.offsets+offset)+"px,0,0)",this.offsets=this.offsets+offset,this.tactive--):(this.$refs.itemwrap.style.transform="translate3d("+this.offsets+"px,0,0)")
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
  padding:15px 0px;
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
   box-shadow: 0px 4px 15px rgba(0,0,0,0.2);
   border-radius:5px;
   overflow: hidden;
}
.item img{
  width: 100%;
  vertical-align: top;
}
.item>a{
  display: inline-block;
  position: relative;
  width: 100%;
}
.mask{
   width:100%;
   position:absolute;
   height: 60%;
   left:0px;
   bottom:0px;
   background:linear-gradient(to top,rgba(0,0,0,0.6), transparent);
}
.mask>div{
  display: inline-block;
  width: 100%;
  text-align: center;
  vertical-align: bottom;
}
.title{
 color:white;
 font-size: 16px;
}
.stitle{
 color:white;
 font-size: 12px;
}
.mask::before{
  content: "";
  height: 100%;
  display: inline-block;
  vertical-align: bottom;
}
.pagetip{
  display:inline-block;
  position: absolute;
  top:10px;
  right:10px;
  color: white;
  background-color: rgba(0,0,0,0.3);
  padding: 3px 10px;
  border-radius: 15px;
  font-size: 10px;
}
</style>
