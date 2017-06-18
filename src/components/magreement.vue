<template>
  <div class="top-wrap">
    <div class="head">
      <div class="close-btn" @click="close">X</div>
      <div class="title">相关协议</div>
    </div>
    <p>
      为了使屋主和租屋者的关系搞好，以免发生意见分歧，现提出以下几条协议，望双方共同遵守：(屋主下称甲方，租屋者下称乙方)</br></br>
      1.乙方未经甲方同意，不得擅自将房屋转让他人。</br></br>
      2.租金每月交一次(期满5天前支付下一个月)，过期者，每天加收5元，若迟交超过10天，甲方有权自锁房屋，即使使用期未满，且若租金超过押金数，则甲方有权自行处理屋内任何物件。</br></br>
      3.在租期内，租金不变，若中途退屋或擅自将房屋转让他人，押金不退，期满不再续租，在租期内，押金不作租金使用。</br></br>
      4.在租期内，乙方不得损坏房屋的任何东西，如墙壁、地砖、门、窗等，如有损坏，一律按价赔偿。</br></br>
      5.乙方不准用柴、煤等做饭、煲汤等，如发现烟痕，乙方必须马上重修。</br></br>
      6.乙方如在甲方的房屋另加有固定装置，退租后不得拆迁，以免损坏屋容。</br></br>
      7.乙方在租期内要保持清洁，果皮、垃圾等不可乱丢；特别是厕所卫生，若厕所有堵塞，乙方必须负责疏通，退租时，乙方要整理房屋清洁，否则扣款50元。
          </p>
  </div>
</template>

<script>
export default{
  name:"agreement",
  data:function(){
    return{

    }
  },
  methods:{
    close:function(){
      this.$emit("close");
    }
  }
}
</script>

<style scoped>
.top-wrap{
  position: absolute;
  left:0px;
  top:0px;
  width: 100%;
  height: 110%;
  background-color: white;
}
.head{
  border-bottom: 1px solid rgba(0,0,0,.12);
}
.close-btn,.title{
  display: inline-block;
  font-size: 20px;
  color: rgb(150,150,150);
}
.close-btn{
  padding: 3% 3%;
}
p{
  padding: 0px 15px;
}
</style>
