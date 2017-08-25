<template>
  <div >
   <div class="paper-wrap">
     <div>
     <div class="room-cover">
       <img :src="mainpic.src"/>
     </div>
     <div class="info-wrap">
       <div class="title">{{roomdatas.number}}房</div>
       <div class="stitle">{{roomdatas.address}}</div>
     </div>
    </div>

    <div class="pic-row" ref="picrow">
      <div class="prev-btn" v-if="prevon">
        <div @click="prev"><i class="material-icons arrow">navigate_before</i></div>
      </div>
      <div ref="imgcover" style="margin:0 50px; overflow:hidden; transition:all 400ms;">
    <div class="pic-framework">
      <div @click="ttt" class="pic-wrap" v-for="(item,index) in roomimgs" >
        <img :src="item.src" :num="index"/>
      </div>
    </div>
  </div>
  <div class="imgitem"  v-for="item in roomimgs" ref="carouselimgs" style="padding:20px 80px; position:absolute; top:0px; transition:all 400ms; ">
    <img style="width:100%" :src="item.src"/>
  </div>
    <div class="next-btn">
      <div @click="tc"><i class="material-icons arrow">navigate_next</i></div>
    </div>
    <div class="zoomout-btn" v-show="prevon" @click="zoomout" >
      <i class="material-icons zoomout1">call_made</i>
      <i class="material-icons zoomout12">call_received</i>
    </div>
  </div>

    <div>
    <div class="agreement-wrap" ref="agreement">
      相关协议</br></br>
      为了使屋主和租屋者的关系搞好，以免发生意见分歧，现提出以下几条协议，望双方共同遵守：(屋主下称甲方，租屋者下称乙方)</br></br>
      1.乙方未经甲方同意，不得擅自将房屋转让他人。</br></br>
      2.租金每月交一次(期满5天前支付下一个月)，过期者，每天加收5元，若迟交超过10天，甲方有权自锁房屋，即使使用期未满，且若租金超过押金数，则甲方有权自行处理屋内任何物件。</br></br>
      3.在租期内，租金不变，若中途退屋或擅自将房屋转让他人，押金不退，期满不再续租，在租期内，押金不作租金使用。</br></br>
      4.在租期内，乙方不得损坏房屋的任何东西，如墙壁、地砖、门、窗等，如有损坏，一律按价赔偿。</br></br>
      5.乙方不准用柴、煤等做饭、煲汤等，如发现烟痕，乙方必须马上重修。</br></br>
      6.乙方如在甲方的房屋另加有固定装置，退租后不得拆迁，以免损坏屋容。</br></br>
      7.乙方在租期内要保持清洁，果皮、垃圾等不可乱丢；特别是厕所卫生，若厕所有堵塞，乙方必须负责疏通，退租时，乙方要整理房屋清洁，否则扣款50元。
      <div v-if="noshow"></div>
    </div>
    <div class="agreement-more" @click="showfull" v-if="noshow">了解更多</div>
  </div>

  <div class="separate_line" style="margin-top:40px;"></div>
  <div class="feature_wrap">
    <div class="f-item">
      户型</br>
      <span class="f-text">{{roomdatas.type}}</span>
    </div>
    <div class="f-item">
      楼层</br>
      <span class="f-text">{{String(roomdatas.number).substring(0,1)}}楼</span>
    </div>
    <div class="f-item">
      采光</br>
      <i class="material-icons iconsize" v-for="n in roomdatas.sunshine">star</i>
    </div>
  </div>

   </div>

 </div>
</template>

<script>
import { mapState } from 'vuex'
export default{
  name:'pcdetail',
  data:function(){
    return {
     mainpic:'',
     roomdatas:{},
     roomimgs:[{}],
     agreementh:0,
     noshow:true,
     index:-1,
     prevon:false

    }
  },
  computed:{
    ...mapState(
      {
        navindex:state => state.active,
        typemap:state => state.typemap
      }
  )
  },
  created:function(){
    this.$store.commit('loading');
    var m=new this.myrevice();
    m.setcontroller("Mroom").setmethod("index").setparam("rid").setparamvalue(this.$route.params.id);
    m.grequestfront(this.Cbgetroominfo);

  },
  mounted:function(){
    this.agreementh=this.$refs.agreement.offsetHeight;
    this.$refs.agreement.style.height="138px";
  },
  methods:{
    Cbgetroominfo:function(xhr){
      var that=this;
      var respon=JSON.parse(xhr.responseText.substring(0,xhr.responseText.indexOf("<")));
      this.roomdatas=respon;
      this.roomimgs=JSON.parse(respon.imgs);
      this.mainpic=this.roomimgs.shift();
      this.roomimgs.shift();
      this.$store.commit('setactive',this.typemap[this.roomdatas.type]);
      this.$nextTick(function(){setTimeout(function(){that.$store.commit('loaded');},500);});
    },
    showfull:function(){
      this.$refs.agreement.style.height=this.agreementh+"px";
      this.noshow=false;
    },
    tc:function(){
        if(this.index==this.$refs.carouselimgs.length-1){
          return;
        }
      (this.index!=-1)&&(this.$refs.carouselimgs[this.index].className="imgitem");
      (this.index==-1)&&(this.$refs.imgcover.className="imgitem");
      this.$refs.carouselimgs[++this.index].className="next";
      this.$refs.carouselimgs[this.index].offsetHeight
      this.$refs.carouselimgs[this.index].className="next slid";

        this.$refs.picrow.style.height="900px";
        this.prevon=true;
    },
    prev:function(){
      this.$refs.carouselimgs[this.index].className="imgitem";
      if(this.index==0){
        this.$refs.imgcover.className="prev";
        this.$refs.imgcover.offsetHeight
        this.$refs.imgcover.className="prev slid";
        this.$refs.picrow.style.height="286px";
        --this.index;
        this.prevon=false;
        return;
      }
      this.$refs.carouselimgs[--this.index].className="prev";
      this.$refs.carouselimgs[this.index].offsetHeight
      this.$refs.carouselimgs[this.index].className="prev slid";
    },
    ttt:function(e){
      this.index=parseInt(e.target.getAttribute('num'));
      this.$refs.imgcover.className="imgitem";
      this.$refs.carouselimgs[this.index].className="next";
      this.$refs.carouselimgs[this.index].offsetHeight
      this.$refs.carouselimgs[this.index].className="next slid";
      this.$refs.picrow.style.height="900px";
      this.prevon=true;
    },
    zoomout:function(){
      this.$refs.carouselimgs[this.index].className="imgitem";
      this.$refs.imgcover.className="prev";
      this.$refs.imgcover.offsetHeight
      this.$refs.imgcover.className="prev slid";
      this.$refs.picrow.style.height="286px";
      this.index=-1;
      this.prevon=false;
    }
  }
}
</script>

<style scoped>
.paper-wrap{
  box-shadow: 0px 0px 4px rgba(0,0,0,.2);
  background-color: white;
  width:800px;
  margin: 50px auto 0px auto;
}
.room-cover{
  width:225px;
  display:inline-block;
}
.room-cover img{
  width:100%;
  vertical-align: top;
}
.info-wrap{
  display: inline-block;
  vertical-align: top;
  margin-top: 28px;
  padding-left: 25px;
}
.title{
  font-size: 28px;
}
.stitle{
  font-size: 14px;
  color: rgb(130,130,130);
}
.agreement-wrap{
  font-size: 13px;
  margin-top: 40px;
  padding:0px 50px;
  font-size: 13px;
  color: rgb(130,130,130);
  overflow: hidden;
  transition: all 400ms;
 position: relative;
}
.agreement-wrap div{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top:0px;
    background:linear-gradient(to top,rgba(255,255,255,1), transparent);
}
.agreement-more{
  text-align: center;
  color: rgb(237,59,59);
  margin: 0 50px;
  padding: 8px 0px;
  border: 1px solid rgba(0,0,0,0);
  border-radius: 8px;
}
.agreement-more:hover{
  border: 1px solid rgba(0,0,0,.2);
}
.pic-wrap{
  width:3%;
  margin: 0 .16%;
  float: left;

}
.pic-row{
    overflow: hidden;
    margin-top: 40px;
    position: relative;
    transition: all 400ms;
    height: 286px;
}
.pic-framework{
  width:1000%;
}
.pic-framework::after{
  content: "";
  display: block;
  clear:both;
}
.pic-wrap img{
  width:100%;
}
.pic-wrap:first-child{
  margin-left: 0;
}
.separate_line{
  height:1px;
  background-color: rgba(0,0,0,.2);
  margin: 0 20px;
}
.feature_wrap{
  padding: 0 50px;
}
.feature_wrap::after{
  content: "";
  display: block;
  clear:both;
}
.f-item{
  width:50%;
  margin-top: 20px;
  float:left;
  line-height: 2;
  color: rgb(130,130,130);
}
.iconsize{
  font-size: 15px;
  color:#e1bee7;
}
.f-text{
  color:#e1bee7;
}
.next-btn{
  position: absolute;
  right:0px;
  height: 100%;
  top:0px;
  width: 50px;
  padding: 60px 5px;
  z-index: 1;
}
.next-btn div,.prev-btn div{
  height: 100%;
  text-align: center;
  border: 1px solid rgba(0,0,0,0);
  border-radius: 4px;
  background-color: white;
}
.next-btn div:hover,.prev-btn div:hover{
  border: 1px solid rgba(0,0,0,.2);
}
.next-btn div::before,.prev-btn div::before{
  content:'';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.prev-btn{
  position: absolute;
  left:0px;
  height: 100%;
  width:50px;
  top:0px;
  padding: 60px 5px;
  z-index: 1;
}
.arrow{
  vertical-align: middle;
  font-size: 30px;
}
.imgitem{
  background-color: white;
  display: none;
  transform: translateX(0%);
}

.next{
  display: block;
  z-index: 0;
  transform: translateX(100%);
}
.prev{
  z-index: 0;
  display: block;
  transform: translateX(-100%);
}
.next.slid,.prev.slid{
  background-color: white;
  transform: translateX(0%);
}
.zoomout-btn{
  position: absolute;
  right: 5px;
  height: 40px;
  width: 40px;
  top:0px;
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 4px;
  background-color: white;
  z-index: 2;
}
.zoomout-btn:hover{
  border: 1px solid rgba(0,0,0,0.4);
}
.zoomout-btn::before{
  content: "";
  display:inline-block;
  height: 100%;
  vertical-align: bottom;
}
.zoomout1{
  vertical-align: bottom;
  display: inline-block;
  font-size: 17px;
}
.zoomout12{
  vertical-align: top;
  font-size: 17px;
}
</style>
