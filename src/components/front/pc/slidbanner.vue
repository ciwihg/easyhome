<template>
  <div class="wrap">
    <div class="btn_prev" @click="hprev">
      <i class="material-icons arrow">navigate_before</i>
    </div>
    <div class="img_wrap" ref="img_wrap" @transitionend="ht">
          <div  class="item_wrap" v-for="item in datas">
            <a :href="'#/proom/'+item.link" >
              <img :src="item.src" />
              <div class="mask"></div>
              <div class="info_wrap">
                <span class="mtitle">{{item.title}}</span></br>
                <span class="stitle">{{item.stitle}}</span>
              </div>
            </a>
          </div>
          <div  class="item_wrap" v-for="item in datas">
            <a :href="'#/proom/'+item.link" >
              <img :src="item.src" />
              <div class="mask"></div>
              <div class="info_wrap">
                <span class="mtitle">{{item.title}}</span></br>
                <span class="stitle">{{item.stitle}}</span>
              </div>
            </a>
          </div>
          <div  class="item_wrap" v-for="item in datas">
            <a :href="'#/proom/'+item.link" >
              <img :src="item.src" />
              <div class="mask"></div>
              <div class="info_wrap">
                <span class="mtitle">{{item.title}}</span></br>
                <span class="stitle">{{item.stitle}}</span>
              </div>
            </a>
          </div>
    </div>
    <div class="btn_next" @click="hnext">
      <i class="material-icons arrow">navigate_next</i>
    </div>
  </div>
</template>

<script>
export default{
  name:"slider",
   props:["datas"],
  data:function(){
    return {
      temp:0,
      lastw:0,
      gapdiff:0,
      transiting:false

  }
},
created:function(){
  this.$watch(function(){
    return this.datas;
  },function(n, o){
    if(o.length==0){
    this.temp=this.temp-this.datas.length*515;
    this.$refs.img_wrap.style.transform="translate3d("+this.temp+"px, 0px, 0px)";
  }
  })
},
  mounted:function(){
    this.lastw=this.temp=(parseInt(this.$el.offsetWidth)-parseInt(parseInt(this.$el.offsetWidth)/515)*515)/2;
    this.temp=this.temp-this.datas.length*515;
    this.$refs.img_wrap.style.transform="translate3d("+this.temp+"px, 0px, 0px)";
    var that=this;
    window.onresize=function(){
      that.gapdiff=(parseInt(that.$el.offsetWidth)-parseInt(parseInt(that.$el.offsetWidth)/515)*515)/2;
    }
  },
  methods:{
    hnext:function(){
      if(this.transting){return;}
      if(this.gapdiff!==0)
      {
        this.temp=this.temp-515+(this.gapdiff-this.lastw);
        this.lastw=this.gapdiff;
        this.gapdiff=0;
      }
      else {
       this.temp=this.temp-515;
      }
      (this.$refs.img_wrap.style.transition=="none")&&(this.$refs.img_wrap.style.transition="all 400ms cubic-bezier(0.25,0.46,0.45,0.94)")
      this.$refs.img_wrap.style.transform="translate3d("+this.temp+"px, 0px, 0px)";
      this.transting=true;

    },
    hprev:function(){
      if(this.transting){return;}
      if(this.gapdiff!==0)
      {
        this.temp=this.temp+515-this.gapdiff+this.lastw;
        this.lastw=this.gapdiff;
        this.gapdiff=0;
      }
      else {
       this.temp=this.temp+515;
      }
      (this.$refs.img_wrap.style.transition=="none")&&(this.$refs.img_wrap.style.transition="all 400ms cubic-bezier(0.25,0.46,0.45,0.94)")
      this.$refs.img_wrap.style.transform="translate3d("+this.temp+"px, 0px, 0px)";
      this.transting=true;
    },
    ht:function(){
      this.transting=false;
      if(this.temp===-this.datas.length*2*515+this.lastw)
      {
        this.temp=this.lastw-this.datas.length*515;
        this.$refs.img_wrap.style.transition="none";
        this.$refs.img_wrap.style.transform="translate3d("+(this.lastw-this.datas.length*515)+"px, 0px, 0px)";
      }else if(this.temp===-515+this.lastw){
          this.temp=this.lastw-(this.datas.length+1)*515;
          this.$refs.img_wrap.style.transition="none";
          this.$refs.img_wrap.style.transform="translate3d("+(this.lastw-(this.datas.length+1)*515)+"px, 0px, 0px)";


      }
    }
  }
}
</script>

<style scoped>
.arrow{
  font-size: 40px !important;
  color:white;
  vertical-align: middle;
}
.item_wrap{
float:left;
display: inline-block;
width:515px;
height:290px;
}
.item_wrap>a{
  display: inline-block;
  width:100%;
  height:100%;
  position:relative;
}
.info_wrap{
  display: inline-block;
  width:100%;
  height:80px;
  left:0px;
  bottom:0px;
  background:linear-gradient(to top,rgba(0,0,0,0.9), transparent);
  position:absolute;
  text-align: center;
  z-index: 2;
}
.mtitle{
  font-size: 25px;
  color:white;
}
.stitle{
  font-size: 15px;
  color:white;
}

.mask{
  display: inline-block;
  width:100%;
  height:100%;
  position: absolute;
  z-index: 1;
  left:0px;
  top:0px;
  background-color: rgba(0,0,0,.5);
  opacity: 0;
  transition: opacity 400ms cubic-bezier(0.25,0.46,0.45,0.94);
}
.mask:hover{
  opacity: 1;
}
.img_wrap{
  position: relative;
  height:290px;
  transition: all 400ms cubic-bezier(0.25,0.46,0.45,0.94);
  width:3000%;
}
.wrap{
  overflow: hidden;
  width:100%;
  position: relative;
}
.btn_prev,.btn_next{
  display: inline-block;
  width: 50px;
  height: 290px;
  text-align: center;
  line-height: 290px;
  background-color: rgba(0,0,0,.5);
}
.btn_prev{
  position: absolute;
  left:0px;
  top:0px;
  z-index: 1;
}
.btn_prev:hover{
  background-color: rgba(0,0,0,.8);
}
.btn_next{
 position: absolute;
 right:0px;
 top:0px;
 z-index: 1;
}
.btn_next:hover{
  background-color: rgba(0,0,0,.8);
}
</style>
