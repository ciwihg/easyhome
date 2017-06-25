<template>
  <div class="top_wrap">
    <div class="head_wrap">
      <strong class="m_title">{{title}}</strong></br>
      <span class="s_title">{{stitle}}</span>
    </div>
    <div class="item_wrap" @touchstart="ts" @touchmove="tm" @touchend="te" ref="itemwrap">
    <a class="item"  v-for="item in datas" :href="'#/room/'+item.rid">
      <img :src="JSON.parse(item.imgs)[0].src"/></br>
      <span class="item_mtitle">{{item.number}}房</span></br>
      <span class="item_stitle">{{item.address}}</span>
      <div><span class="bottom_detail">光线 4.5</span></div>
    </a>
  </div>
  </div>
</template>

<script>
export default{
  name:"mgoodp",
  props: ['title','stitle','datas'],
  data:function(){
    return {
      tspos:0,
      tdistance:0,
      tactive:1,
      offsets:0,
       last:false,
       lastdistance:0,
       alreadyleftmove:true
    }
  },
  computed:{
    perwidth:function(){
      return (window.innerWidth-16)*0.3;
    }

  },
  methods:{
    ts:function(e){
      if(e.targetTouches.length==1){
        var touch=e.targetTouches[0];
        this.tspos=touch.pageX;
        this.tdistance=0;
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
        if(this.last&&this.tdistance>0){
          if(this.alreadyleftmove)
          {this.tdistance=0;}
          return
        }

          if(this.tdistance>0&&!this.last) //左移
          {
            if((this.datas.length-this.tactive)*this.perwidth<(window.innerWidth-26))//到最后一项的临界点判断
            {
              this.lastdistance=((this.datas.length*this.perwidth+10)-(window.innerWidth-16)+10)-Math.abs(this.offsets); //计算到最后一项的位移
              if(this.tdistance>=50){
                this.tdistance=this.lastdistance;
                this.alreadyleftmove=false;
                this.last=true;
              }
            }
          }
          this.$refs.itemwrap.style.transform="translate3d("+(this.offsets-this.tdistance)+"px,0,0)";
      }
    },
    te:function(e){
      if(this.tdistance>0){
        var offset=this.perwidth;
        if(this.last)
        { offset=this.lastdistance;
          this.alreadyleftmove=true;
          console.log(offset);
        }
        (Math.abs(this.tdistance)>=50)?(this.$refs.itemwrap.style.transform="translate3d("+(this.offsets-offset)+"px,0,0)",this.offsets=this.offsets-offset,this.tactive++):(this.$refs.itemwrap.style.transform="translate3d("+this.offsets+"px,0,0)")
      }
      else if(this.tdistance<0){
        var offset=this.perwidth;
        if(this.last)
        {offset=this.lastdistance;
        console.log(offset);
         }
        (Math.abs(this.tdistance)>=50)?(this.$refs.itemwrap.style.transform="translate3d("+(this.offsets+offset)+"px,0,0)",this.offsets=this.offsets+offset,this.tactive--,this.last=false):(this.$refs.itemwrap.style.transform="translate3d("+this.offsets+"px,0,0)")
      }
    }
  }
}
</script>

<style scoped>
.top_wrap{
  overflow: hidden;
  box-shadow: 0px 1px 4px rgba(0,0,0,0.2);
  background-color: white;
  border-radius: 2px;
  padding-bottom: 8px;
}
.m_title{
 font-size: 14px;

}
.s_title{
 font-size: 12px;
 font-weight: lighter;
}
.item_mtitle{
  color: black;
  font-size: 12px;
}
.item_stitle{
  color: black;
  font-size: 12px;
  font-weight: lighter;
}
.item_wrap{
  width:1000%;
  padding-left: 10px;
  transition: transform 400ms;
}
.item_wrap::after{
  content: "";
  display: block;
  clear: both;
}
.item{
  padding:0px 10px;
  display:inline-block;
  float:left;
  width: 3%;
  line-height: 1.2;
}
.item img{
  width:100%;
}
.item:hover{
  background-color: rgba(0,0,0,0.1);
}
.bottom_detail{
  display: inline-block;
  float: right;
  font-size: 12px;
    color:#ff5722;
}
.head_wrap{
  padding: 10px 20px;
}
</style>
