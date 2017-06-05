<template>
  <div class="top_wrap">
    <div class="head_wrap">
      <strong class="m_title">栏目标题</strong></br>
      <span class="s_title">栏目副标题</span>
    </div>
    <div class="item_wrap">
    <a class="item" href="#/room/1">
      <img src="static/img.jpg"/></br>
      <span class="item_mtitle">项目标题</span></br>
      <span class="item_stitle">项目副标题</span>
      <div><span class="bottom_detail">光线 4.5</span></div>
    </a>
    <a class="item" href="#/room/1">
      <img src="static/img.jpg"/></br>
      <span class="item_mtitle">项目标题</span></br>
      <span class="item_stitle">项目副标题</span>
      <div><span class="bottom_detail">光线 4.5</span></div>
    </a>
    <a class="item" href="#/room/1">
      <img src="static/img.jpg"/></br>
      <span class="item_mtitle">项目标题</span></br>
      <span class="item_stitle">项目副标题</span>
      <div><span class="bottom_detail">光线 4.5</span></div>
    </a>
    <a class="item" href="#/room/1">
      <img src="static/img.jpg"/></br>
      <span class="item_mtitle">项目标题</span></br>
      <span class="item_stitle">项目副标题</span>
      <div><span class="bottom_detail">光线 4.5</span></div>
    </a>
    <a class="item" href="#/room/1">
      <img src="static/img.jpg"/></br>
      <span class="item_mtitle">项目标题</span></br>
      <span class="item_stitle">项目副标题</span>
      <div><span class="bottom_detail">光线 4.5</span></div>
    </a>

  </div>
  </div>
</template>

<script>
export default{
  name:"mgoodp",
  data:function(){
    return {

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
