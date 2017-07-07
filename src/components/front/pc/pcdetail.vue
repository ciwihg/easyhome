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

    <div class="pic-row">
      <div class="prev-btn">
      </div>
    <div class="pic-framework">
      <div class="pic-wrap" v-for="item in roomimgs">
        <img :src="item.src"/>
      </div>
    </div>
    <div class="next-btn">
      <i class="material-icons arrow">navigate_next</i>
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
export default{
  name:'pcdetail',
  data:function(){
    return {
     mainpic:'',
     roomdatas:{},
     roomimgs:[],
     agreementh:0,
     noshow:true
    }
  },
  created:function(){
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
      var respon=JSON.parse(xhr.responseText.substring(0,xhr.responseText.indexOf("<")));
      this.roomdatas=respon;
      this.roomimgs=JSON.parse(respon.imgs);
      this.mainpic=this.roomimgs.shift();
      this.roomimgs.shift();
    },
    showfull:function(){
      this.$refs.agreement.style.height=this.agreementh+"px";
      this.noshow=false;
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
  margin: 0 0.16%;
  float: left;

}
.pic-row{
    overflow: hidden;
    margin-top: 40px;
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
</style>
