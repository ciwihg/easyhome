<template>
  <div class="top-wrap">
    <div class="head">
      <div class="close-btn" @click="close">X</div>
      <div class="title">相关协议</div>
    </div>
    <p>
      轻松培养pocketmon的游戏</br>
      《 separate》是日本著名漫画家 驾笼真太郎的最新作品，国内版权由易动漫独家代理。
      驾笼真太郎，日本男漫画家。他的主要创作方向是面向成人的漫画作品，于1988年在COMICBOX出道。
      从2002年开始积极地参加了众多活动，向世人展示了自己“不道德的排泄物”。
      想对中国读者说的一句话是：我希望全世界都能读到我的漫画。请尽情欣赏。
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
</style>
