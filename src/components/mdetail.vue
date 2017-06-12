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
    <div class="picture_row" >
       <div class="picture_wrap" @touchstart="ts" @touchmove="tm" @touchend="te" ref="imgswrap">
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
      return window.innerWidth*0.4;
    }
  },
  methods:{
    handlemd:function(){
      this.$refs.markdown.style.height="150px";
    },
    ts:function(e){
      if(e.targetTouches.length==1){
        var touch=e.targetTouches[0];
        this.tspos=touch.pageX;
        this.tdistance=0;
        console.log(this.tdistance);
        console.log(this.tactive);
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
            if((5-this.tactive)*this.perwidth<(window.innerWidth-10))//到最后一项的临界点判断
            {
              this.lastdistance=(5*(this.perwidth+10))-window.innerWidth-10-Math.abs(this.offsets); //计算到最后一项的位移
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
          console.log(offset);
        }
        (Math.abs(this.tdistance)>=50)?(this.$refs.imgswrap.style.transform="translate3d("+(this.offsets-offset)+"px,0,0)",this.offsets=this.offsets-offset,this.tactive++):(this.$refs.imgswrap.style.transform="translate3d("+this.offsets+"px,0,0)")
      }
      else if(this.tdistance<0){
        var offset=this.perwidth+10;
        if(this.last)
        {offset=this.lastdistance;
        console.log(offset);
         }
        (Math.abs(this.tdistance)>=50)?(this.$refs.imgswrap.style.transform="translate3d("+(this.offsets+offset)+"px,0,0)",this.offsets=this.offsets+offset,this.tactive--,this.last=false):(this.$refs.imgswrap.style.transform="translate3d("+this.offsets+"px,0,0)")
      }
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
    transition: all 400ms;
  }

  .pictures{
    float:left;
    margin-right:10px;
        width:4%;
  }
</style>
