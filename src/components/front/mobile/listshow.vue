<template>
  <div>
    <ul class="ul-wrap">
      <li class="item-wrap" v-for="(item,index) in datas" ref="itemwrap">
        <a :href="'#/room/'+item.rid">
        <div class="number-wrap">
        <span class="item-number">{{index+1}}</span>
        </div>
        <div class="item-img-wrap">
        <img class="item-img" :src="JSON.parse(item.imgs)[0].src"/>
        </div>
        <div class="info_wrap">
          <span class="item-title">{{item.number}}房</span></br>
          <span class="item-stitle">{{item.address}}</span>
        </div>
        <span class="view">查看</span>
       </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default{
  name:"listshow",
  props:['datas'],
  data:function(){
    return {

    }
  },
  mounted:function(){
    if(this.$refs.itemwrap){
    this.$refs.itemwrap.forEach(function(e){
      e.style.height=(window.innerWidth-16)*0.2+16+'px';
    })
   }
  }

}
</script>

<style scoped>
.ul-wrap{
  list-style: none;
  padding: 0px;
  background-color: white;
  border-radius: 2px;
  box-shadow:  0px 0px 5px 1px rgba(0, 0, 0, 0.1);
}
a{
  display: block;
  width: 100%;
  height: 100%;
}
.item-wrap{
 border-bottom: 1px solid rgba(0,0,0,0.1);
 height: 80px;
 position: relative;
 padding: 8px 0px;
}
.item-wrap:last-child{
  border-bottom:none;
}
.item-img-wrap{
  width:20%;
  height: 100%;
  overflow: hidden;
  display: inline-block;
}
.item-img{
  width:100%;

}
.number-wrap{
  display: inline-block;
  height: 100%;
  vertical-align: top;
  margin: 0px 8px;
}
.item-number{
  color: rgb(150,150,150);
}
.number-wrap::before{
  content: "";
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}
.info_wrap{
  display: inline-block;
  vertical-align: top;
  height: 100%;
  margin-left: 8px;
}
.item-stitle{
  color: rgb(150,150,150);
  font-size: 12px;
  line-height: 1;
}
.item-title{
  color: black;
}
.item-number{
  display: inline-block;
  vertical-align: middle;
}
.view{
  display: inline-block;
 position: absolute;
 color:#7e57c2;
 right:8px;
 bottom: 8px;
 line-height: 1;
}
</style>
