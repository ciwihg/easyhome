<template>
  <div>
    <div class="head_img">
      <img :src="toppic.src"/>
    </div>
    <div class="info_row">
      <img :src="mainpic.src"/><div class="info_wrap">
        <span class="info_title">{{roomdatas.number}}房</span></br>
        <span class="info_address">{{roomdatas.address}}</span>
      </div>
    </div>
    <div class="feature_row">
      <div class="separate_line"></div>
      <div>
        <div class="feature_wrap">
        <div class="feature_icon">
          <i class="material-icons icon-format">brightness_5</i>
        </div>
        <span>光线</span>
        </div>
        <div class="feature_wrap">
        <div class="feature_icon">
          <i class="material-icons icon-format">brightness_5</i>
        </div>
        <span>光线</span>
        </div>
        <div class="feature_wrap">
        <div class="feature_icon">
          <i class="material-icons icon-format">brightness_5</i>
        </div>
        <span>光线</span>
        </div>
        <div class="feature_wrap">
        <div class="feature_icon">
          <i class="material-icons icon-format">brightness_5</i>
        </div>
        <span>光线</span>
        </div>
      </div>
      <div class="separate_line"></div>
    </div>
    <div class="detail_row">
    <div class="detail_head" ref="markdown">
     相关协议
    </div>
     <div @click="handlemd" style="color:green;">了解更多</div>
   </div>
    <div class="picture_row" >
       <div class="picture_wrap" @touchstart="ts" @touchmove="tm" @touchend="te" ref="imgswrap">
         <img class="pictures" :src="item.src" v-for="item in roomimgs"/>

       </div>
    </div>
    <transition name="fade">
    <m-agreement v-if="agreement" @close="closeagreement"></m-agreement>
    </transition>
  </div>
</template>

<script>
import magreement from '@/components/front/mobile/magreement'
export default{
  name:"mdetail",
  data:function(){
    return {
      tspos:0,
      tdistance:0,
      tactive:1,
      offsets:0,
       last:false,
       lastdistance:0,
       alreadyleftmove:true,
       agreement:false,
       roomdatas:{},
       roomimgs:[],
       toppic:{},
       mainpic:{}
    }
  },
  components: {
    "m-agreement":magreement
  },
  computed:{
    perwidth:function(){
      return window.innerWidth*0.4;
    }
  },
  created: function created() {
    var m=new this.myrevice();
    m.setcontroller("Mroom").setmethod("index").setparam("rid").setparamvalue("15");
    m.grequestfront(this.get);
  },
  methods:{
    get:function(xhr){
      var respon=JSON.parse(xhr.responseText.substring(0,xhr.responseText.indexOf("<")));
      this.roomdatas=respon;
      this.roomimgs=JSON.parse(respon.imgs);
      this.mainpic=this.roomimgs.shift();
      this.toppic=this.roomimgs.shift();
    },
    handlemd:function(){
      this.agreement=true;
    },
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

        if(this.tactive==1&&this.tdistance<0){  //第一张右移禁止
          this.tdistance=0;
          return
        }
        if(this.last&&this.tdistance>0){   //到达最后一张左移禁止
         if(this.alreadyleftmove)
          {this.tdistance=0;}
          return
          }

          if(this.tdistance>0&&!this.last) //左移
          {
            if((this.roomimgs.length-this.tactive)*this.perwidth<(window.innerWidth+10))//到最后一项的临界点判断
            {
              this.lastdistance=(this.roomimgs.length*(this.perwidth+10))-window.innerWidth-10-Math.abs(this.offsets); //计算到最后一项的位移
              if(this.tdistance>=50){
                this.tdistance=this.lastdistance;
                this.alreadyleftmove=false;
                this.last=true;
              }
            }
          }
         this.$refs.imgswrap.style.transform="translate3d("+(this.offsets-this.tdistance)+"px,0,0)";
      }
    },
    te:function(e){
      if(this.tdistance>0){
        var offset=this.perwidth+10;
        if(this.last)
        { offset=this.lastdistance;
          this.alreadyleftmove=true;
        }
        (Math.abs(this.tdistance)>=50)?(this.$refs.imgswrap.style.transform="translate3d("+(this.offsets-offset)+"px,0,0)",this.offsets=this.offsets-offset,this.tactive++):(this.$refs.imgswrap.style.transform="translate3d("+this.offsets+"px,0,0)")
      }
      else if(this.tdistance<0){
        var offset=this.perwidth+10;
        if(this.last)
        {offset=this.lastdistance;
         }
        (Math.abs(this.tdistance)>=50)?(this.$refs.imgswrap.style.transform="translate3d("+(this.offsets+offset)+"px,0,0)",this.offsets=this.offsets+offset,this.tactive--,this.last=false):(this.$refs.imgswrap.style.transform="translate3d("+this.offsets+"px,0,0)")
      }
    },
    closeagreement:function(){
      this.agreement=false;
    }
  }
}
</script>

<style scoped>
.head_img{
  width:100%;
}
.head_img img{
  vertical-align: top;
  width: 100%;
}
.info_row img{
  width:20%;
  margin-left: 3%;
  position: relative;
  top:-15px;
}
.info_wrap{
  display: inline-block;
  vertical-align: top;
  margin-left: 15px;
  }
  .info_title{
    font-size: 18px;
    font-weight: bolder;
    display: inline-block;
    margin-top: 10px;
  }
  .info_address{
    font-size: 12px;
    font-weight: lighter;
  }

  .separate_line{
    height: 1px;
    background-color: rgba(0,0,0,0.1);
  }
  .feature_row{
    text-align: center;
      padding: 0px 10px;
  }
  .feature_icon{
    width:50px;
    height:50px;
    background-color: green;
    border-radius: 50%;
    vertical-align: top;
    margin: 3%;
  }
  .feature_icon::before{
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
  .icon-format{
    color:white;
    vertical-align: middle;
  }
  .feature_wrap{
    display:inline-block;
    margin: 10px 3%;
  }
  .feature_wrap span{
    font-size: 10px;
    font-weight: lighter;
  }
  .detail_row{
    text-align: center;
  }
  .detail_head{
    font-size: 16px;
  }
  .picture_row{
    overflow: hidden;
  }
  .picture_wrap{
    width:1000%;
    transition: all 400ms;
  }
  .picture_wrap::after{
    content: "";
    display: block;
    clear: both;
  }
  .pictures{
    float:left;
    margin-right:10px;
        width:4%;
  }
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to  {
  opacity: 0
}
</style>
