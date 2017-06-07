<template>
  <div>
    <div class="head_img">
      <img src="static/imgs.jpg"/>
    </div>
    <div class="info_row">
      <img src="static/img.jpg"/><div class="info_wrap">
        <span class="info_title">301房</span></br>
        <span class="info_address">朝阳巷5号</span>
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
      轻松培养pocketmon的游戏</br>
      《 separate》是日本著名漫画家 驾笼真太郎的最新作品，国内版权由易动漫独家代理。
      驾笼真太郎，日本男漫画家。他的主要创作方向是面向成人的漫画作品，于1988年在COMICBOX出道。
      从2002年开始积极地参加了众多活动，向世人展示了自己“不道德的排泄物”。
      想对中国读者说的一句话是：我希望全世界都能读到我的漫画。请尽情欣赏。
    </div>
     <div @click="handlemd">了解更多</div>
   </div>
    <div class="picture_row">
       <div class="picture_wrap">
         <img class="pictures" src="static/img.jpg"/>
         <img class="pictures" src="static/img.jpg"/>
         <img class="pictures" src="static/img.jpg"/>
         <img class="pictures" src="static/img.jpg"/>
         <img class="pictures" src="static/img.jpg"/>
       </div>
    </div>
  </div>
</template>

<script>
export default{
  name:"mdetail",
  data:function(){
    return {

    }
  },
  methods:{
    handlemd:function(){
      this.$refs.markdown.style.height="150px";
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
    height: 18px;
    overflow: hidden;
    transition: all 400ms;
  }
  .picture_row{
    overflow: hidden;
  }
  .picture_wrap{
    width:1000%;
  }
  .pictures{
    float:left;
    margin-left:0.2%;
  }
</style>
