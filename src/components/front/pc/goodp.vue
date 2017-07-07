<template>
  <div>
    <div class="rowtitle">

        <span class="rtitle">{{title}}</span>
        </br>
        <span class="rsubtitle">{{subtitle}}</span>
    </div>
    <div class="itemwrap">
    <div class="item" v-for="item in datas">
      <a href="#" >
      <img  style="width:100%":src="JSON.parse(item.imgs)[0].src"/>
      <div class="mask"></div>
      </a>
      <div class="detail_wrap">
      <span class="mtitle">{{item.number}}房</span></br>
      <span class="stitle">{{item.address}}</span>
      <div >
        <i class="material-icons iconsize" v-for="n in item.sunshine">star</i>
        <span>光线</span>
      </div>
      </div>
     </div>
   </div>
  </div>
</template>

<script>
export default{
  name:'goodp',
  props:['title','subtitle','datas']
}
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
  background-color: rgba(0,0,0,0.5);
  opacity: 1
}
.itemwrap{
  width: 100%;
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
.rtitle{
  font-size: 23px;
  color:rgb(130,130,130);
}
.rsubtitle{
  font-size: 13px;
  color:rgb(130,130,130);
}
</style>
