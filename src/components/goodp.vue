<template>
  <div>
    <div>
      <span class="rowtitle">最近出租</span>
    </div>
    <div class="itemwrap">
    <div class="item" v-for="n in 10">
      <a href="#" >
      <img src="static/img.jpg"/>
      <div class="mask"></div>
      </a>
      <div class="detail_wrap">
      <span class="mtitle">301房</span></br>
      <span class="stitle">朝阳巷5号</span>
      <div >
        <i class="material-icons iconsize">star</i>
        <i class="material-icons iconsize">star</i>
        <i class="material-icons iconsize">star</i>
        <i class="material-icons iconsize">star</i>
        <i class="material-icons iconsize">star</i>
        <span>光线</span>
      </div>
      </div>
     </div>
   </div>
  </div>
</template>

<script>
</script>

<style scoped>
.iconsize{
  font-size: 10px;
  color:rgb(115,115,115);
}
.item{
  width:160px;
  margin-left:10px;
  margin-top: 18px;
  line-height:0;
  box-shadow:0px 2px 4px rgba(0,0,0,0.1);
  float:left;
}
.item>a{
  display:inline-block;
  position: relative;
}
.mask{
  position: absolute;
  left:0px;
  top:0px;
  width:100%;
  height:100%;
  opacity: 0;
  transition: opacity 400ms cubic-bezier(0.25,0.46,0.45,0.94);
}
.item:hover .mask{
  background-color: rgba(0,0,0,0.3);
  opacity: 1
}
.itemwrap{
  width: 100%;
  height: 360px;
  overflow: hidden;
}
.itemwrap::after{
  content: "";
  display:block;
  height: 100%;
  clear: both;
}
.rowtitle{
  padding-left: 10px;
  font-size: 23px;
}
.detail_wrap{
  padding:10px 12px;
  background-color:white;
}
.mtitle{
  line-height:1;
  font-size:18px;
  color:rgb(72,72,72);
}
.stitle{
  line-height:1;
   font-size:14px;
    color:rgb(133,133,133);
}
.detail_wrap>div{
  margin-top: 25px;
}
.detail_wrap>div>span{
  float:right;
  display:inline-block;
  line-height:1;
  color:#ff5722;
}
</style>
